import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const SavedResumes = () => {
  const { resumes, createNewResume, loadResume, deleteResume } = useResume();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    createNewResume();
    navigate('/editor');
  };

  const handleEdit = (id) => {
    loadResume(id);
    navigate('/editor');
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} DAY${days > 1 ? 'S' : ''} AGO`;
    if (hours > 0) return `${hours} HOUR${hours > 1 ? 'S' : ''} AGO`;
    const minutes = Math.floor(diff / (1000 * 60));
    return `${Math.max(1, minutes)} MIN AGO`;
  };

  return (
    <main className="pt-32 pb-24 px-8 md:px-12 max-w-[1440px] mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-gutter">
        <div>
          <h1 className="font-display-xl text-slate-900 dark:text-slate-100 mb-2">Saved Resumes</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-lg">Manage your high-performance career assets.</p>
        </div>
        <button onClick={handleCreateNew} className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-wider">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
          CREATE NEW RESUME
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-stack-lg">
        
        {resumes.map((resume, idx) => (
          <div key={resume.id} className="glass-panel hover:border-primary/50 p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-stack-md">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 px-3 py-1 rounded-full flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${resume.atsScore > 80 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span className={`font-semibold uppercase tracking-widest text-[10px] ${resume.atsScore > 80 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  ATS SCORE: {resume.atsScore}
                </span>
              </div>
              <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(resume.id)} className="material-symbols-outlined text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors" title="Edit">edit_note</button>
                <button onClick={() => deleteResume(resume.id)} className="material-symbols-outlined text-rose-400 hover:text-rose-600 hover:scale-110 transition-transform" title="Delete">delete</button>
              </div>
            </div>
            <div className="mb-stack-md">
              <h3 className="font-headline-md text-slate-900 dark:text-slate-100 mb-1 truncate">{resume.personal?.title || 'Untitled Role'}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest text-[10px]">LAST EDITED: {formatTimeAgo(resume.lastEdited)}</p>
            </div>
            <div className="mt-auto h-32 w-full rounded bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative border border-slate-100 dark:border-slate-800 cursor-pointer shadow-inner" onClick={() => handleEdit(resume.id)}>
              <div className="absolute inset-0 p-4 bg-white/90 dark:bg-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col text-[10px] text-slate-500 dark:text-slate-400 overflow-hidden leading-tight backdrop-blur-[2px]">
                <div className="font-bold text-[12px] text-slate-900 dark:text-slate-100 mb-1">{resume.personal?.name || 'Jane Doe'}</div>
                <div>{resume.personal?.email || 'email@example.com'}</div>
                <div className="mt-2 text-primary dark:text-sky-400">{resume.summary?.substring(0, 80)}...</div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add New */}
        <button onClick={handleCreateNew} className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 hover:bg-sky-50 dark:hover:bg-slate-800/80 hover:border-primary/50 transition-all cursor-pointer group min-h-[250px]">
          <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-primary transition-colors mb-stack-sm">add_circle</span>
          <p className="font-semibold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">CREATE NEW RESUME</p>
        </button>
        
      </div>

      {/* Quantum Modification Log */}
      <section className="mt-stack-lg">
        <div className="flex items-center gap-4 mb-stack-md">
          <span className="material-symbols-outlined text-primary">timeline</span>
          <h2 className="font-headline-lg text-slate-900 dark:text-slate-100">Quantum Modification Log</h2>
        </div>
        
        <div className="glass-panel overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Log Item 1 */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-gutter">
                <span className="font-label-sm text-emerald-600 dark:text-emerald-400 w-20 tracking-wider">14:22:01</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-slate-900 dark:text-slate-200">Neural Optimization: Keywords Injection</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest mt-1">Target: Senior Product Designer</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary dark:text-sky-400">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="font-label-sm uppercase tracking-widest font-bold">+12% Match</span>
              </div>
            </div>
            
            {/* Log Item 2 */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-gutter">
                <span className="font-label-sm text-emerald-600 dark:text-emerald-400 w-20 tracking-wider">11:05:45</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-slate-900 dark:text-slate-200">Syntax Refinement: Action Verb Replacement</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest mt-1">Target: Technical Lead</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary dark:text-sky-400">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="font-label-sm uppercase tracking-widest font-bold">AI Enhanced</span>
              </div>
            </div>
            
            {/* Log Item 3 */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-gutter">
                <span className="font-label-sm text-emerald-600 dark:text-emerald-400 w-20 tracking-wider">09:12:12</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-slate-900 dark:text-slate-200">Structural Alignment: Experience Reordering</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest mt-1">Target: Senior Product Designer</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary dark:text-sky-400">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="font-label-sm uppercase tracking-widest font-bold">Optimized</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-3 text-center border-t border-slate-100 dark:border-slate-800">
            <button className="font-label-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors uppercase tracking-widest font-bold text-xs py-2 w-full">
              View Full Audit Trail
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SavedResumes;
