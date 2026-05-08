import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FileText, Sparkles } from 'lucide-react';

const JobDescriptionInput = () => {
  const { jobDescription, setJobDescription, analyzeJobDescription } = useResume();

  return (
    <section className="glass-card p-6 mt-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary-500/10 blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-primary-500" size={24} />
        <h2 className="text-xl font-semibold">Job Description Target</h2>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Paste the job description here to optimize your resume keywords and get an ATS match score.
      </p>
      
      <textarea 
        className="input-field min-h-[120px] mb-4" 
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      
      <button 
        onClick={analyzeJobDescription}
        className="w-full btn-primary flex items-center justify-center gap-2"
        disabled={!jobDescription.trim()}
      >
        <Sparkles size={18} />
        Analyze Job Description
      </button>
    </section>
  );
};

export default JobDescriptionInput;
