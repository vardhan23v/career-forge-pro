import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'ai_gen', icon: 'auto_awesome', label: 'AI Generator' },
    { id: 'personal', icon: 'person', label: 'Personal Info' },
    { id: 'experience', icon: 'work', label: 'Experience' },
    { id: 'education', icon: 'school', label: 'Education' },
    { id: 'skills', icon: 'code', label: 'Skills' },
    { id: 'ats', icon: 'target', label: 'ATS Target' },
    { id: 'jobs', icon: 'work_history', label: 'Job Matches' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 flex flex-col pt-6 w-64 border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md divide-y divide-slate-100 dark:divide-slate-800 shadow-sm dark:shadow-none z-40">
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center border border-sky-100 dark:border-sky-800">
            <span className="material-symbols-outlined text-sky-600 dark:text-sky-400">psychology</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">Editor Mode</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">CareerForge Pro</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 flex items-center gap-3 text-sm uppercase tracking-widest cursor-pointer transition-all duration-200 font-semibold ${
                isActive
                  ? 'bg-sky-50 dark:bg-slate-800 border-l-4 border-primary text-primary dark:text-sky-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="p-6 space-y-4">
        {/* Placeholder for future action buttons */}
        <div className="space-y-1">
          <div className="text-slate-500 dark:text-slate-400 font-semibold p-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors text-xs uppercase tracking-widest cursor-pointer">
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Support</span>
          </div>
          <div 
            onClick={() => setActiveTab('settings')}
            className={`font-semibold p-2 flex items-center gap-3 rounded transition-colors text-xs uppercase tracking-widest cursor-pointer ${
              activeTab === 'settings' 
                ? 'bg-sky-50 dark:bg-slate-800 text-primary dark:text-sky-400 font-bold' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
