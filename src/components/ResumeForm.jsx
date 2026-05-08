import React from 'react';
import { useResume } from '../context/ResumeContext';

const ResumeForm = ({ activeTab }) => {
  const { 
    resumeData, updatePersonal, updateSummary, 
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    updateSkills,
    jobDescription, setJobDescription, analyzeJobDescription,
    atsScore, missingKeywords, isOptimizing, optimizeResume,
    isGenerating, generateResumeFromText,
    jobMatches, isFetchingJobs, findJobMatches
  } = useResume();

  const [rawText, setRawText] = React.useState('');

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    updateSkills(skillsArray);
  };

  const renderPersonal = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-slate-900 dark:text-slate-100">Personal Information</h1>
        <p className="text-slate-500 dark:text-slate-400 font-body-md">Tell us about yourself to tailor your resume.</p>
      </header>
      <div className="glass-panel p-8 space-y-stack-md relative group">
        <div className="grid grid-cols-2 gap-gutter">
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Full Name</label>
            <input 
              className="input-field" 
              type="text" 
              value={resumeData.personal.name} 
              onChange={(e) => updatePersonal('name', e.target.value)} 
            />
          </div>
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Job Title</label>
            <input 
              className="input-field" 
              type="text" 
              value={resumeData.personal.title} 
              onChange={(e) => updatePersonal('title', e.target.value)} 
            />
          </div>
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Email Address</label>
            <input 
              className="input-field" 
              type="email" 
              value={resumeData.personal.email} 
              onChange={(e) => updatePersonal('email', e.target.value)} 
            />
          </div>
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Phone Number</label>
            <input 
              className="input-field" 
              type="text" 
              value={resumeData.personal.phone} 
              onChange={(e) => updatePersonal('phone', e.target.value)} 
            />
          </div>
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Location</label>
            <input 
              className="input-field" 
              type="text" 
              value={resumeData.personal.location} 
              onChange={(e) => updatePersonal('location', e.target.value)} 
            />
          </div>
          <div className="space-y-stack-sm">
            <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">LinkedIn / GitHub</label>
            <div className="flex gap-2">
              <input 
                className="input-field w-1/2" placeholder="LinkedIn"
                value={resumeData.personal.linkedin} 
                onChange={(e) => updatePersonal('linkedin', e.target.value)} 
              />
              <input 
                className="input-field w-1/2" placeholder="GitHub"
                value={resumeData.personal.github} 
                onChange={(e) => updatePersonal('github', e.target.value)} 
              />
            </div>
          </div>
        </div>
        <div className="space-y-stack-sm pt-4">
          <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Professional Summary</label>
          <div className="relative">
            <textarea 
              className="input-field min-h-[160px] pb-14 resize-none" 
              rows="6"
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <button 
                onClick={optimizeResume}
                disabled={isOptimizing}
                className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/30 rounded-full text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">{isOptimizing ? 'hourglass_empty' : 'bolt'}</span>
                {isOptimizing ? 'Optimizing...' : 'AI Enhance'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg text-slate-900 dark:text-slate-100">Experience</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">Detail your professional journey.</p>
        </div>
        <button onClick={addExperience} className="btn-secondary">
          <span className="material-symbols-outlined text-sm">add</span> Add Position
        </button>
      </header>
      <div className="space-y-6">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="glass-panel p-6 relative group">
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-300 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
            <div className="grid grid-cols-2 gap-gutter mb-4">
              <div className="space-y-stack-sm">
                <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Company Name</label>
                <input className="input-field" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
              </div>
              <div className="space-y-stack-sm">
                <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Role</label>
                <input className="input-field" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} />
              </div>
              <div className="space-y-stack-sm col-span-2">
                <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Duration</label>
                <input className="input-field" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} />
              </div>
            </div>
            <div className="space-y-stack-sm">
              <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Description & Achievements</label>
              <textarea className="input-field min-h-[100px]" value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg text-slate-900 dark:text-slate-100">Education</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">Your academic background.</p>
        </div>
        <button onClick={addEducation} className="btn-secondary">
          <span className="material-symbols-outlined text-sm">add</span> Add Degree
        </button>
      </header>
      <div className="space-y-6">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="glass-panel p-6 relative group">
            <button 
              onClick={() => removeEducation(edu.id)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-300 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
            <div className="grid grid-cols-1 gap-gutter">
              <div className="space-y-stack-sm">
                <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Institution</label>
                <input className="input-field" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-gutter">
                <div className="space-y-stack-sm">
                  <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Degree</label>
                  <input className="input-field" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                </div>
                <div className="space-y-stack-sm">
                  <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Year</label>
                  <input className="input-field" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-slate-900 dark:text-slate-100">Skills</h1>
        <p className="text-slate-500 dark:text-slate-400 font-body-md">Comma-separated list of your technical and soft skills.</p>
      </header>
      <div className="glass-panel p-8">
        <div className="space-y-stack-sm">
          <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Core Expertise</label>
          <textarea 
            className="input-field min-h-[150px]" 
            value={resumeData.skills.join(', ')} 
            onChange={handleSkillsChange}
          />
        </div>
      </div>
    </div>
  );

  const renderATS = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-slate-900 dark:text-slate-100">ATS Optimizer</h1>
        <p className="text-slate-500 dark:text-slate-400 font-body-md">Analyze a Job Description to boost your ATS match score.</p>
      </header>
      <div className="glass-panel p-8">
        <div className="space-y-stack-sm mb-6">
          <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Job Description</label>
          <textarea 
            className="input-field min-h-[150px]" 
            placeholder="Paste the job posting here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button 
            onClick={analyzeJobDescription}
            disabled={!jobDescription.trim()}
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">analytics</span> Analyze Match
          </button>
        </div>
        
        {atsScore > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4 text-emerald-600 dark:text-emerald-400">Analysis Results</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 dark:border-emerald-500 flex items-center justify-center text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {atsScore}%
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Match Score</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Based on keyword presence.</p>
                </div>
              </div>
              
              {missingKeywords.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-900/30">
                  <h4 className="font-bold text-amber-700 dark:text-amber-500 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 rounded text-xs font-semibold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAIGenerator = () => (
    <div className="space-y-stack-lg">
      <header className="mb-stack-lg mt-8">
        <h1 className="font-headline-lg text-slate-900 dark:text-slate-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-sky-500">auto_awesome</span> 
          AI Resume Generator
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-body-md">Paste your LinkedIn export, bio, or raw notes here, and AI will structure it into a perfect resume.</p>
      </header>
      <div className="glass-panel p-8">
        <div className="space-y-stack-sm mb-6 relative">
          <label className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Raw Details / Bio</label>
          <textarea 
            className="input-field min-h-[300px]" 
            placeholder="E.g., I am a software engineer with 5 years of experience at Google and Microsoft. I know React, Node.js, and Python. I went to MIT and graduated in 2018..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          <button 
            onClick={() => generateResumeFromText(rawText)}
            disabled={!rawText.trim() || isGenerating}
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <><span className="material-symbols-outlined animate-spin">refresh</span> Generating Resume...</>
            ) : (
              <><span className="material-symbols-outlined">magic_button</span> Generate Magic Resume</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderJobMatches = () => (
    <div className="space-y-stack-lg pb-10">
      <header className="mb-stack-lg mt-8 flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-500">work_history</span> 
            Job Matches
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md mt-1">AI-curated opportunities near {resumeData.personal.location || 'you'}.</p>
        </div>
        <button 
          onClick={findJobMatches}
          disabled={isFetchingJobs}
          className="btn-primary flex items-center gap-2"
        >
          {isFetchingJobs ? (
            <><span className="material-symbols-outlined animate-spin text-sm">refresh</span> Finding...</>
          ) : (
            <><span className="material-symbols-outlined text-sm">travel_explore</span> Find Jobs</>
          )}
        </button>
      </header>

      {jobMatches.length === 0 && !isFetchingJobs && (
        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-slate-400 text-3xl">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No Jobs Found Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">Click the button above to let AI find tailored jobs based on your current resume skills and location.</p>
        </div>
      )}

      <div className="space-y-4">
        {jobMatches.map((job, idx) => (
          <div key={idx} className="glass-panel p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-bl-lg font-bold text-xs border-b border-l border-emerald-100 dark:border-emerald-500/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              {job.matchScore}% Match
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 pr-24">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">apartment</span> {job.company}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {job.location}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">payments</span> {job.salary}</span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {job.description}
            </p>
            
            <button className="w-full py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded font-bold text-xs uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2">
              Apply Now <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      {activeTab === 'ai_gen' && renderAIGenerator()}
      {activeTab === 'jobs' && renderJobMatches()}
      {activeTab === 'personal' && renderPersonal()}
      {activeTab === 'experience' && renderExperience()}
      {activeTab === 'education' && renderEducation()}
      {activeTab === 'skills' && renderSkills()}
      {activeTab === 'ats' && renderATS()}
    </section>
  );
};

export default ResumeForm;
