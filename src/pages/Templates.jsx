import React from 'react';

const BASE = import.meta.env.BASE_URL;

const Templates = () => {
  return (
    <main className="pt-24 pb-16 px-8 md:px-12 max-w-[1440px] mx-auto">
      {/* Hero Header */}
      <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md mt-8">
        <div>
          <h1 className="font-display-xl text-slate-900 dark:text-slate-100 mb-stack-sm tracking-tight">Curated Blueprints</h1>
          <p className="font-body-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Precision-engineered templates for the modern visionary. Each blueprint is designed with clean, minimalist aesthetics to elevate your professional narrative and maximize readability.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 font-semibold rounded-xl shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 group uppercase tracking-wider">
            <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
            CREATE NEW BLUEPRINT
          </button>
        </div>
      </header>

      {/* Template Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Featured Template: The Vanguard */}
        <div className="md:col-span-8 group relative overflow-hidden glass-panel rounded-xl">
          <div className="aspect-[16/9] relative bg-slate-100 dark:bg-slate-800">
            <img alt="Template Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" src={`${BASE}images/template_vanguard_1778175172670.png`}/>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent"></div>
          </div>
          <div className="p-8 relative -mt-20 z-10">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex gap-2 mb-stack-sm">
                  <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-3 py-1 font-bold text-[10px] rounded-full tracking-widest uppercase">EXECUTIVE</span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 font-bold text-[10px] rounded-full tracking-widest uppercase">STRATEGY</span>
                </div>
                <h3 className="font-headline-lg text-slate-900 dark:text-slate-100 drop-shadow-sm">The Vanguard</h3>
              </div>
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 font-semibold rounded-lg transition-all active:scale-95 uppercase tracking-widest text-xs shadow-sm">
                Select Template
              </button>
            </div>
          </div>
        </div>

        {/* Side Template: Neural Grid */}
        <div className="md:col-span-4 group glass-panel rounded-xl flex flex-col hover:border-primary/50 transition-colors">
          <div className="aspect-square relative overflow-hidden rounded-t-xl border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <img alt="Template Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 mix-blend-multiply dark:mix-blend-normal" src={`${BASE}images/template_neural_grid_1778175189698.png`}/>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex gap-2 mb-stack-sm">
              <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-1 font-bold text-[10px] rounded-full tracking-widest uppercase">TECHNICAL</span>
            </div>
            <h3 className="font-headline-md text-slate-900 dark:text-slate-100 mb-stack-sm">Neural Grid</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-stack-md flex-grow">Optimized for high-density information architecture and technical mastery.</p>
            <button className="border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-300 px-4 py-2 font-semibold rounded-lg transition-all hover:bg-sky-50 dark:hover:bg-slate-800 uppercase tracking-widest text-xs">
              Select Template
            </button>
          </div>
        </div>

        {/* Third Template: Prism Flux */}
        <div className="md:col-span-4 group glass-panel rounded-xl flex flex-col hover:border-primary/50 transition-colors">
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <img alt="Template Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 mix-blend-multiply dark:mix-blend-normal" src={`${BASE}images/template_prism_flux_1778175207371.png`}/>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex gap-2 mb-stack-sm">
              <span className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-1 font-bold text-[10px] rounded-full tracking-widest uppercase">CREATIVE</span>
            </div>
            <h3 className="font-headline-md text-slate-900 dark:text-slate-100 mb-stack-sm">Prism Flux</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-stack-md flex-grow">A high-chroma layout for visionaries and creative disruptors.</p>
            <button className="border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-300 px-4 py-2 font-semibold rounded-lg transition-all hover:bg-sky-50 dark:hover:bg-slate-800 uppercase tracking-widest text-xs">
              Select Template
            </button>
          </div>
        </div>

        {/* Fourth Template: Orbit One */}
        <div className="md:col-span-8 group relative overflow-hidden glass-panel rounded-xl">
          <div className="aspect-[21/9] relative bg-slate-100 dark:bg-slate-800">
            <img alt="Template Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-multiply dark:mix-blend-normal" src={`${BASE}images/template_orbit_one_1778175223427.png`}/>
            <div className="absolute inset-0 bg-gradient-to-l from-white/90 dark:from-slate-900/90 via-transparent to-transparent"></div>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 flex items-center p-8 z-10">
            <div className="text-right w-full">
              <div className="flex gap-2 mb-stack-sm justify-end">
                <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-3 py-1 font-bold text-[10px] rounded-full tracking-widest uppercase">MINIMALIST</span>
              </div>
              <h3 className="font-headline-lg text-slate-900 dark:text-slate-100 mb-stack-sm">Orbit One</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-stack-md ml-auto max-w-xs font-medium">Clean, surgical precision for the minimalist leader who demands focus.</p>
              <button className="bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-primary dark:text-sky-400 px-6 py-2 font-semibold rounded-lg transition-all active:scale-95 uppercase tracking-widest text-xs shadow-sm">
                Select Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Section */}
      <section className="mt-stack-lg p-6 glass-panel flex flex-wrap gap-stack-md items-center justify-between">
        <div className="flex gap-stack-md">
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3 w-64 focus-within:border-primary dark:focus-within:border-primary transition-colors focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-slate-400">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full outline-none" placeholder="Search templates..." type="text"/>
          </div>
          <div className="relative group">
            <button className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all outline-none font-medium">
              Category: All
              <span className="material-symbols-outlined text-slate-400">expand_more</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-stack-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
          <select className="bg-transparent border-none text-sm text-primary dark:text-sky-400 font-semibold focus:ring-0 cursor-pointer outline-none">
            <option>Most Popular</option>
            <option>Recently Added</option>
            <option>Trending</option>
          </select>
        </div>
      </section>

      {/* Feature Spotlight: AI Enhancer */}
      <section className="mt-stack-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="p-stack-lg glass-panel border-l-4 border-l-primary dark:border-l-primary flex gap-gutter">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary dark:text-sky-400" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
          <div>
            <h4 className="font-headline-md text-slate-900 dark:text-slate-100 mb-stack-sm">AI Content Forge</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Every template comes with built-in AI writing assistance. Select a blueprint and our neural engine will generate contextual bullet points tailored to your industry.</p>
          </div>
        </div>
        <div className="p-stack-lg glass-panel border-l-4 border-l-emerald-500 dark:border-l-emerald-500 flex gap-gutter">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-500 dark:text-emerald-400" style={{fontVariationSettings: "'FILL' 1"}}>analytics</span>
          </div>
          <div>
            <h4 className="font-headline-md text-slate-900 dark:text-slate-100 mb-stack-sm">ATS Precision Check</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Validate your resume against 500+ global Applicant Tracking Systems. High-visibility blueprints ensure your data is parsed with 99.9% accuracy.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Templates;
