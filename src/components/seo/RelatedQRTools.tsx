import React from 'react';
import { QR_TYPE_CONFIGS, ALL_QR_TYPES } from '../../data/qrTypeConfigs';
import { QrDataType } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, QrCode, Sparkles } from 'lucide-react';

interface RelatedQRToolsProps {
  currentType?: QrDataType;
}

export const RelatedQRTools: React.FC<RelatedQRToolsProps> = ({ currentType }) => {
  return (
    <section className="w-full mt-12 bg-white/95 dark:bg-slate-900/95 rounded-2xl p-6 sm:p-8 border border-sky-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Explore Our Tools
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans']">
            More QR Code Generators
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Choose from our complete suite of 14+ specialized QR format creators.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <QrCode className="w-4 h-4" />
          <span>All-in-One Generator</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {ALL_QR_TYPES.map((typeKey) => {
          const config = QR_TYPE_CONFIGS[typeKey];
          const Icon = config.icon;
          const isCurrent = currentType === typeKey;

          return (
            <Link
              key={typeKey}
              to={config.route}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 ring-1 ring-sky-500/40 shadow-xs pointer-events-none'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 group-hover:bg-sky-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {config.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {config.metaDescription}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span>{isCurrent ? 'Viewing Generator' : 'Open Generator'}</span>
                {!isCurrent && (
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
