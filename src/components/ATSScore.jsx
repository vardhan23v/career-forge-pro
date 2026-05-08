import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';

const ATSScore = () => {
  const { atsScore, missingKeywords } = useResume();

  if (atsScore === 0) return null;

  // Determine color based on score
  const getScoreColor = () => {
    if (atsScore >= 80) return 'text-emerald-500 dark:text-emerald-400';
    if (atsScore >= 60) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreRing = () => {
    if (atsScore >= 80) return 'stroke-emerald-500 dark:stroke-emerald-400';
    if (atsScore >= 60) return 'stroke-amber-500 dark:stroke-amber-400';
    return 'stroke-red-500 dark:stroke-red-400';
  };

  return (
    <section className="glass-card p-6 mt-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/80 dark:to-slate-900/80">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-primary-500" size={24} />
        <h2 className="text-xl font-semibold">ATS Match Analysis</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Circular Progress Indicator */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle 
              className="stroke-gray-200 dark:stroke-slate-700 fill-none" 
              strokeWidth="8" 
              cx="50" cy="50" r="40" 
            />
            {/* Progress ring */}
            <circle 
              className={`${getScoreRing()} fill-none transition-all duration-1000 ease-out`} 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="251.2" 
              strokeDashoffset={251.2 - (251.2 * atsScore) / 100}
              cx="50" cy="50" r="40" 
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor()}`}>{atsScore}%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Match</span>
          </div>
        </div>

        {/* Missing Keywords Analysis */}
        <div className="flex-1 w-full">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
            <AlertCircle size={16} className="text-amber-500" />
            Missing Keywords Detected
          </h3>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full text-sm flex items-center gap-1"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Your resume looks well-optimized for this role!</span>
            </div>
          )}
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            * Adding missing keywords naturally to your experience or skills section can significantly improve your ATS ranking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ATSScore;
