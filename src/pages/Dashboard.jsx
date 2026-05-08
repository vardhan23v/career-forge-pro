import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const Dashboard = () => {
  const { createNewResume, resumeData } = useResume();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    createNewResume();
    navigate('/editor');
  };

  return (
    <main className="pt-24 pb-12 px-8 max-w-[1440px] mx-auto grid grid-cols-12 gap-gutter">
      <header className="col-span-12 mb-stack-lg mt-8">
        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Welcome Back, {resumeData.personal?.name.split(' ')[0] || 'User'}</p>
        <h1 className="font-display-xl text-slate-900 dark:text-slate-100">System Overview</h1>
      </header>
      
      <div className="col-span-12 mb-stack-lg">
        <button onClick={handleCreateNew} className="block w-full glass-panel p-8 flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-all duration-300 border-dashed border-2 hover:border-solid border-slate-300 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-800/50 text-left">
          <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">add</span>
          </div>
          <div className="text-center">
            <h3 className="font-headline-lg text-slate-900 dark:text-slate-100 mb-1">Create New Resume</h3>
            <p className="font-body-md text-slate-500 dark:text-slate-400">Start building your next career-defining document with AI-powered optimization.</p>
          </div>
        </button>
      </div>
      
      <section className="col-span-12 md:col-span-4 glass-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Glow behind ATS dial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sky-100 dark:bg-sky-900/20 blur-[50px] rounded-full pointer-events-none"></div>
        
        <h2 className="font-headline-md text-slate-900 dark:text-slate-100 mb-stack-md z-10 relative">ATS Strength Score</h2>
        <div className="relative w-48 h-48 mb-stack-md z-10">
          <div className="absolute inset-0 rounded-full border-8 border-slate-100 dark:border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-8 border-emerald-400 border-t-transparent rotate-45 shadow-sm"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display-xl text-emerald-500 leading-none">{resumeData.atsScore || 0}</span>
            <span className="font-label-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">OPTIMIZED</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-body-md max-w-xs z-10 relative">Your resume is currently outperforming 92% of applicants in your technical niche.</p>
        <button className="mt-stack-lg bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-full text-white font-semibold shadow-md shadow-emerald-500/20 active:scale-95 transition-all z-10 relative uppercase tracking-wider">
          Run Deep Scan
        </button>
      </section>
      
      <section className="col-span-12 md:col-span-8 glass-panel p-8">
        <div className="flex justify-between items-center mb-stack-lg">
          <h2 className="font-headline-md text-slate-900 dark:text-slate-100">System Activity</h2>
          <span className="material-symbols-outlined text-slate-400">query_stats</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-slate-200">Keyword Injection Complete</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Added 'Full-stack Architecture' to Experience section.</p>
            </div>
            <span className="text-slate-400 text-xs font-semibold">2m ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-slate-200">Schema Validation Passed</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Resume format successfully verified for standard ATS.</p>
            </div>
            <span className="text-slate-400 text-xs font-semibold">45m ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <span className="material-symbols-outlined">edit_document</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-slate-200">Template Migrated</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Moved content to 'Stellar Minimalist' premium layout.</p>
            </div>
            <span className="text-slate-400 text-xs font-semibold">3h ago</span>
          </div>
        </div>
      </section>
      
      <section className="col-span-12 mt-stack-lg">
        <h2 className="font-headline-lg text-slate-900 dark:text-slate-100 mb-stack-lg">Recommended Layouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="glass-panel group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
            <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800 rounded-t-xl">
              <img alt="Layout Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHcQyIJvuWeDeg_TFoJVqTZN0tgm3g9RNNRE6vb_LNXyUntz6xj5uLLfTfZQdcftSKK0m1E6nMB57i4oPbmYLQ972XziiEagk6zdRokpwqclSRRYqe8VqlyU_tx4KiFVgWBSOmOxGqEhuP73kT8WXDbgVoojhDBx1v1TZ4Ugv9UrICKMbKmk-i96EWI9neu0E8qZZrv8flTK6PzhmQjhJ-5g8nziIiSYQSC-hx2OL_PkSORhxFUBydfzfZAIVXtEFDNNXGvHYBZ-s"/>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Quantum Obsidian</p>
                <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-[10px] px-2 py-1 rounded tracking-widest uppercase font-bold">Popular</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Best for Senior Engineering roles at Tier 1 firms.</p>
            </div>
          </div>
          
          <div className="glass-panel group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
            <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800 rounded-t-xl">
              <img alt="Layout Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsD9KYgsAR7RbrftfcFnMdhBcDNTPzOmnLA7SE_z1cV873E0zREpH_J5Dxd6TzMABElO0f6eC2IeMnUNmu55k5U0oDTj6jqIt8QidXOhYl_bP6T6pyRLFbG05QfIBAMxX5d7A37qu-WkjWIlvt56tZNKWdT4FDyfXy6JHBXu0YRXdnokXNlJNLCSG0_p0WdcPiRjECe7Vl7O3rMxEtxlmTXppG2z-OtnUOIEvDX5JfjzFvNclZW1-UYUdNmZfEj1j3rwN4H32sZxA"/>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Stellar Minimalist</p>
                <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] px-2 py-1 rounded tracking-widest uppercase font-bold">New</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">A clean, focused layout prioritizing white space and typography.</p>
            </div>
          </div>
          
          <div className="glass-panel group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
            <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800 rounded-t-xl">
              <img alt="Layout Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZceaB6DOu5UWO0dVBYBrYF799U51PGMVJrtUAvhvFRgWflSXhu1xOhnjjWK-BGVh5OZ0LAm75_gICBu2ELBMEZtusDeC-wo9Dh-mFxxjoYO4SMuLE7ivgtZ2duld3bPfOKIqmkUNJKFfTwlECc34qTVTpTZ5Rkpw4-hY7Kyi7LOjl6RyKE7-JUgKW3gA_J1Cz809RsvrB47nr7tX7xTm-5MD84blkB-NYqOPURKJhNDXIdscdwB22P15HJuRXsZ6ScLb5TvXoo18"/>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Neural Architect</p>
                <span className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-[10px] px-2 py-1 rounded tracking-widest uppercase font-bold">AI-Optimized</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Specifically designed for maximum readability across all major ATS.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
