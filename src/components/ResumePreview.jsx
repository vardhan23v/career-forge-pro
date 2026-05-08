import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
  const { resumeData, atsScore } = useResume();
  const resumeRef = useRef(null);

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;
    
    // Temporarily force light theme for the PDF generation
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  };

  return (
    <section className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-xl relative overflow-hidden flex items-start justify-center pt-12 pb-12 border border-slate-200 dark:border-slate-800 shadow-inner">
      {/* Background Decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/50 dark:bg-sky-900/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/50 dark:bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* ATS Badge overlay on the preview area */}
      {atsScore > 0 && (
        <div className="absolute top-8 right-8 z-20 glass-panel border-emerald-500/30 bg-white dark:bg-slate-900 p-4 rounded-xl flex items-center gap-4 animate-pulse">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle className="text-slate-100 dark:text-slate-800" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
              <circle 
                className="text-emerald-500 transition-all duration-1000 ease-out" 
                cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" 
                strokeDasharray="125.6" 
                strokeDashoffset={125.6 - (125.6 * atsScore) / 100} 
                strokeWidth="4"
              ></circle>
            </svg>
            <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 relative z-10">{atsScore}%</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tighter">ATS Optimization</h4>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              {atsScore > 80 ? 'Strong Relevance Score' : atsScore > 60 ? 'Fair Match' : 'Needs Keywords'}
            </p>
          </div>
        </div>
      )}

      {/* Paper Resume Container with custom scrollbar */}
      <div className="w-full h-full overflow-y-auto flex justify-center custom-scrollbar px-4 relative z-10">
        <div 
          ref={resumeRef}
          className="w-[500px] bg-white paper-shadow transform hover:scale-[1.02] transition-transform duration-500 flex-shrink-0"
          style={{ minHeight: '700px' }}
        >
          <div className="p-12 text-slate-900 relative">
            {/* Removed paper texture for cleaner look */}
            <div className="absolute inset-0 opacity-0 pointer-events-none"></div>

            {/* Actual Resume Content */}
            <header className="border-b-2 border-slate-100 pb-6 mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 font-sans">{resumeData.personal.name}</h2>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm mt-1">{resumeData.personal.title}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-slate-500 font-medium">
                {resumeData.personal.email && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">mail</span> {resumeData.personal.email}</span>}
                {resumeData.personal.phone && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">phone</span> {resumeData.personal.phone}</span>}
                {resumeData.personal.location && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">location_on</span> {resumeData.personal.location}</span>}
              </div>
            </header>

            {resumeData.summary && (
              <section className="mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Professional Summary</h3>
                <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{resumeData.summary}</p>
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Experience</h3>
                <div className="space-y-4">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">{exp.role}</h4>
                        <span className="text-[10px] font-medium text-slate-500">{exp.duration}</span>
                      </div>
                      <p className="text-primary font-medium text-xs mb-2">{exp.company}</p>
                      <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.education.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Education</h3>
                <div className="space-y-3">
                  {resumeData.education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800 text-sm">{edu.degree}</h4>
                        <span className="text-[10px] font-medium text-slate-500">{edu.year}</span>
                      </div>
                      <p className="text-xs text-slate-600">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeData.skills.length > 0 && (
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 rounded text-[9px] font-bold text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <button className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 transition-colors shadow-sm" title="Zoom In (Demo)">
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 transition-colors shadow-sm" title="Fullscreen (Demo)">
          <span className="material-symbols-outlined">fullscreen</span>
        </button>
        <button onClick={downloadPDF} className="bg-primary/90 dark:bg-sky-600/90 backdrop-blur-md border border-primary/20 p-3 rounded-full text-white hover:bg-primary transition-colors shadow-sm shadow-primary/30" title="Export PDF">
          <span className="material-symbols-outlined">download</span>
        </button>
      </div>
    </section>
  );
};

export default ResumePreview;
