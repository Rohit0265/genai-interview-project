import React from 'react';

const Loading = ({
  variant = 'full-screen', // 'full-screen' | 'container' | 'inline'
  message = 'Loading...',
  description = '',
}) => {
  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
        {message && <span className="text-xs font-semibold">{message}</span>}
      </div>
    );
  }

  const wrapperClasses =
    variant === 'full-screen'
      ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-100/70 dark:bg-[#0b0f19]/80 backdrop-blur-md transition-all duration-300'
      : 'w-full py-12 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm';

  return (
    <div className={wrapperClasses}>
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Loading Rings & Core */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer glow aura */}
          <div className="absolute w-20 h-20 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
          
          {/* Outer spinning ring with dual gradient colors */}
          <div className="w-16 h-16 rounded-full border-[3px] border-transparent border-t-[#0652dd] border-b-indigo-500 dark:border-t-blue-500 dark:border-b-indigo-400 animate-spin"></div>
          
          {/* Inner counter-spinning ring */}
          <div className="absolute w-10 h-10 rounded-full border-[3px] border-transparent border-l-emerald-500 border-r-teal-500 dark:border-l-emerald-450 dark:border-r-teal-400 animate-spin-reverse"></div>
          
          {/* Center core pulse dot */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0652dd] dark:bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.7)]"></div>
        </div>

        {/* Text Area */}
        {message && (
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-all duration-300">
            {message}
          </h3>
        )}

        {description && (
          <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 max-w-xs transition-all duration-300 animate-pulse leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
