import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'ad-slot-default',
  format = 'horizontal',
  className = '',
}) => {
  return (
    <div
      id={slotId}
      className={`my-6 w-full overflow-hidden rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/40 p-4 transition-all ${className}`}
      aria-label="Advertisement area"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 dark:text-slate-400 mb-1">
          Advertisement
        </span>

        {format === 'horizontal' && (
          <div className="w-full max-w-3xl min-h-[90px] flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 p-2">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Ad Space (Responsive Leaderboard 728x90 / Banner)
            </p>
          </div>
        )}

        {format === 'rectangle' && (
          <div className="w-full max-w-sm min-h-[250px] flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 p-2">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Ad Space (Medium Rectangle 300x250)
            </p>
          </div>
        )}

        {format === 'in-feed' && (
          <div className="w-full min-h-[100px] flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 p-2">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Sponsored Content / Display Partner
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
