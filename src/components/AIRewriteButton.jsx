import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Bot, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const AIRewriteButton = () => {
  const { isOptimizing, optimizeResume, atsScore, missingKeywords } = useResume();

  const isDisabled = atsScore === 0 || missingKeywords.length === 0 || isOptimizing;

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={optimizeResume}
        disabled={isDisabled}
        className={clsx(
          "relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-lg",
          isDisabled 
            ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-blue-600 to-primary-500 hover:from-blue-500 hover:to-primary-400 text-white shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5"
        )}
      >
        {isOptimizing ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span className="flex items-center gap-1">
              AI is optimizing
              <span className="flex space-x-1">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
              </span>
            </span>
            {/* Animated background gradient line indicating processing */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/40 w-full overflow-hidden">
              <div className="w-1/2 h-full bg-white animate-[slide_1s_ease-in-out_infinite]" />
            </div>
          </>
        ) : (
          <>
            <Bot size={20} className={clsx(!isDisabled && "animate-pulse")} />
            <span>Optimize with AI</span>
          </>
        )}
      </button>
      
      {/* Required for the inline sliding animation */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default AIRewriteButton;
