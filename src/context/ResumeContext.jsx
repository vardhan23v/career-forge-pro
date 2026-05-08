import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Default Template
  const defaultResume = {
    id: 'default-1',
    lastEdited: Date.now(),
    atsScore: 85,
    personal: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
    },
    summary: 'A passionate and results-driven software engineer with 5+ years of experience in building scalable web applications. Proven ability in React, Node.js, and cloud architecture.',
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        role: 'Senior Frontend Developer',
        duration: 'Jan 2021 - Present',
        description: 'Led a team of 5 developers to rebuild the core dashboard in React, reducing load times by 40%. Implemented an AI-driven analytics feature.',
      },
      {
        id: '2',
        company: 'WebDev Agency',
        role: 'Web Developer',
        duration: 'Jun 2018 - Dec 2020',
        description: 'Developed and maintained various client websites. Integrated third-party APIs and payment gateways.',
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'B.S. in Computer Science',
        year: '2014 - 2018',
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AWS', 'GraphQL']
  };

  // Multiple Resumes State
  const [resumes, setResumes] = useState(() => {
    const saved = localStorage.getItem('careerforge_resumes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse resumes'); }
    }
    return [defaultResume];
  });

  const [activeResumeId, setActiveResumeId] = useState(() => {
    const savedId = localStorage.getItem('careerforge_active_id');
    return savedId || defaultResume.id;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('careerforge_resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    if (activeResumeId) {
      localStorage.setItem('careerforge_active_id', activeResumeId);
    }
  }, [activeResumeId]);

  // Derived Active Resume Data
  const resumeData = resumes.find(r => r.id === activeResumeId) || defaultResume;

  // Custom setter that mimics original setResumeData but updates the correct resume in the array
  const setResumeData = (updater) => {
    setResumes(prevResumes => {
      const active = prevResumes.find(r => r.id === activeResumeId);
      if (!active) return prevResumes;
      
      const newActive = typeof updater === 'function' ? updater(active) : updater;
      newActive.lastEdited = Date.now(); // update timestamp on edit
      
      return prevResumes.map(r => r.id === activeResumeId ? newActive : r);
    });
  };

  // Resume Management Functions
  const createNewResume = () => {
    const newResume = {
      ...defaultResume,
      id: Date.now().toString(),
      lastEdited: Date.now(),
      atsScore: 0,
      personal: { name: 'New Resume', title: '', email: '', phone: '', location: '', linkedin: '', github: '' },
      summary: '',
      experience: [],
      education: [],
      skills: []
    };
    setResumes(prev => [...prev, newResume]);
    setActiveResumeId(newResume.id);
    return newResume.id;
  };

  const deleteResume = (id) => {
    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (filtered.length === 0) return [defaultResume]; // never let it be completely empty
      return filtered;
    });
    
    if (activeResumeId === id) {
      const remaining = resumes.filter(r => r.id !== id);
      if (remaining.length > 0) setActiveResumeId(remaining[0].id);
      else setActiveResumeId(defaultResume.id);
    }
  };

  const loadResume = (id) => {
    setActiveResumeId(id);
  };

  // Job Description & ATS State
  const [jobDescription, setJobDescription] = useState('');
  const [atsScore, setAtsScore] = useState(0);
  const [missingKeywords, setMissingKeywords] = useState([]);
  
  // AI State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobMatches, setJobMatches] = useState([]);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem('careerforge_apikeys');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse API keys'); }
    }
    return { groq: '', gemini: '' };
  });

  const saveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem('careerforge_apikeys', JSON.stringify(keys));
  };

  const findJobMatches = async () => {
    setIsFetchingJobs(true);
    try {
      const groqApiKey = apiKeys.groq;
      const geminiApiKey = apiKeys.gemini;

      if (!groqApiKey && !geminiApiKey) {
        throw new Error("Missing API Key! Please configure it in Settings.");
      }

      const prompt = `You are an expert tech recruiter and job matching algorithm. Based on the following user details, generate 5 highly realistic, fictional job or internship postings located near the user's location or remote. Return the response strictly as a JSON array of objects matching this exact structure:
      [
        {
          "title": "Frontend Developer Intern",
          "company": "TechNova Local",
          "location": "San Francisco, CA (Hybrid)",
          "salary": "$40/hr",
          "matchScore": 94,
          "description": "Short description of the role and requirements."
        }
      ]
      
      DO NOT wrap the response in markdown blocks like \`\`\`json. Return ONLY the raw JSON array.

      User Details:
      Title: ${resumeData.personal.title}
      Location: ${resumeData.personal.location}
      Skills: ${resumeData.skills.join(', ')}
      Summary: ${resumeData.summary}`;

      let text = "";

      if (groqApiKey) {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
          })
        });

        if (!response.ok) throw new Error("Failed to fetch from Groq API");
        const data = await response.json();
        text = data.choices[0].message.content;
      } else {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
      }
      
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedJobs = JSON.parse(text);
      setJobMatches(parsedJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      alert("Error: " + (error.message || "Failed to find job matches. Please check your API keys in Settings."));
    } finally {
      setIsFetchingJobs(false);
    }
  };

  const generateResumeFromText = async (rawText) => {
    if (!rawText.trim()) return;
    setIsGenerating(true);
    try {
      const groqApiKey = apiKeys.groq;
      const geminiApiKey = apiKeys.gemini;

      if (!groqApiKey && !geminiApiKey) {
        throw new Error("Missing API Key! Please configure it in Settings.");
      }

      const prompt = `You are an expert resume writer. Given the following raw text, bio, or notes, extract the information and format it strictly as a JSON object matching this exact structure:
      {
        "personal": { "name": "", "title": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "" },
        "summary": "Write a strong professional summary based on the text.",
        "experience": [ { "company": "", "role": "", "duration": "", "description": "Write strong bullet points or a paragraph" } ],
        "education": [ { "institution": "", "degree": "", "year": "" } ],
        "skills": ["Skill 1", "Skill 2"]
      }
      
      If any specific information is missing from the raw text, leave it as an empty string. If there are no experiences or education, leave them as empty arrays.
      DO NOT wrap the response in markdown blocks like \`\`\`json. Return ONLY the raw JSON string.

      Raw Text:
      ${rawText}`;

      let text = "";

      if (groqApiKey) {
        // Use Groq API (Llama 3)
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
          })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch from Groq API");
        }

        const data = await response.json();
        text = data.choices[0].message.content;
      } else {
        // Use Gemini API
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
      }
      
      // Clean up potential markdown formatting if the model still includes it
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      const parsedData = JSON.parse(text);
      
      // Ensure unique IDs for arrays
      if (parsedData.experience && Array.isArray(parsedData.experience)) {
         parsedData.experience = parsedData.experience.map(e => ({...e, id: Date.now().toString() + Math.random().toString(36).substring(2)}));
      }
      if (parsedData.education && Array.isArray(parsedData.education)) {
         parsedData.education = parsedData.education.map(e => ({...e, id: Date.now().toString() + Math.random().toString(36).substring(2)}));
      }

      setResumeData(prev => ({
        ...prev,
        personal: { ...prev.personal, ...(parsedData.personal || {}) },
        summary: parsedData.summary || prev.summary,
        experience: (parsedData.experience && parsedData.experience.length > 0) ? parsedData.experience : prev.experience,
        education: (parsedData.education && parsedData.education.length > 0) ? parsedData.education : prev.education,
        skills: (parsedData.skills && parsedData.skills.length > 0) ? parsedData.skills : prev.skills,
      }));
    } catch (error) {
      console.error("Failed to generate resume:", error);
      alert("Error: " + (error.message || "Failed to generate resume. Please check your API keys in Settings."));
    } finally {
      setIsGenerating(false);
    }
  };

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: '', degree: '', year: '' }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateSkills = (skillsArray) => {
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const analyzeJobDescription = () => {
    // Simulated ATS Analysis
    if (!jobDescription.trim()) {
      setAtsScore(0);
      setMissingKeywords([]);
      return;
    }
    
    // Fake logic for ATS score based on JD length
    const score = Math.min(Math.floor(Math.random() * 40) + 45, 98); // Random score between 45 and 98
    setAtsScore(score);
    
    // Fake missing keywords
    const keywords = ['Agile', 'CI/CD', 'Docker', 'Kubernetes', 'Redux', 'System Design'];
    const randomMissing = keywords.sort(() => 0.5 - Math.random()).slice(0, 3);
    setMissingKeywords(randomMissing);
  };

  const optimizeResume = () => {
    setIsOptimizing(true);
    
    // Simulated API Call
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: prev.summary + ' Consistently recognized for performance and innovation in demanding environments.',
        skills: [...prev.skills, ...missingKeywords]
      }));
      setIsOptimizing(false);
      setAtsScore(prev => Math.min(prev + 15, 98)); // Increase score after optimization
      setMissingKeywords([]);
    }, 2000);
  };

  return (
    <ResumeContext.Provider value={{
      theme,
      toggleTheme,
      resumeData,
      updatePersonal,
      updateSummary,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      updateSkills,
      jobDescription,
      setJobDescription,
      atsScore,
      missingKeywords,
      analyzeJobDescription,
      isOptimizing,
      optimizeResume,
      isGenerating,
      generateResumeFromText,
      jobMatches,
      isFetchingJobs,
      findJobMatches,
      apiKeys,
      saveApiKeys,
      resumes,
      activeResumeId,
      createNewResume,
      deleteResume,
      loadResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
