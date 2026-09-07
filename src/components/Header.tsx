import React from 'react';
import { QrCode, Scan, Layers, History, Sparkles, Moon, Sun, Info } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeTab: 'generator' | 'scanner' | 'batch' | 'history';
  setActiveTab: (tab: 'generator' | 'scanner' | 'batch' | 'history') => void;
  savedCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenDynamicModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  darkMode,
  setDarkMode,
  onOpenDynamicModal,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-sky-200/80 dark:border-slate-800 bg-sky-50/90 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setActiveTab('generator')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer min-w-0"
              id="brand-logo-btn"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 truncate">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] truncate">
                    The <span className="text-sky-600 dark:text-sky-400">QR Code</span> Generate
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    {t.freeAndFast}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:block truncate">
                  {t.brandTagline}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2">
            <Link to="/" className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800 transition-all">Home</Link>
            <Link to="/about" className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800 transition-all">About</Link>
            <Link to="/contact" className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800 transition-all">Contact</Link>
            <button
              id="nav-tab-generator"
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-sky-200/90 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{t.tabGenerate}</span>
            </button>

            <button
              id="nav-tab-scanner"
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-sky-200/90 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span>{t.tabScan}</span>
            </button>

            <button
              id="nav-tab-batch"
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-sky-200/90 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.tabBatch}</span>
            </button>

            <button
              id="nav-tab-history"
              onClick={() => setActiveTab('history')}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-sky-200/90 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 dark:hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{t.tabHistory}</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-sky-600 text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Selector Dropdown with 25+ Languages */}
            <LanguageSelector />

            <button
              id="btn-dynamic-qr-info"
              onClick={onOpenDynamicModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-900 dark:text-sky-200 bg-sky-100/80 dark:bg-slate-800 hover:bg-sky-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-sky-200 dark:border-slate-700 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.staticVsDynamic}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:bg-sky-100/80 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-sky-200"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-sky-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Dedicated Navigation Bar (visible below 768px) */}
        <div className="md:hidden pb-2.5 pt-0.5">
          <nav className="grid grid-cols-4 gap-1 p-1 bg-sky-100/70 dark:bg-slate-800/80 rounded-xl border border-sky-200/80 dark:border-slate-700">
            <button
              id="mobile-nav-tab-generator"
              onClick={() => setActiveTab('generator')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-bold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4 mb-0.5" />
              <span className="leading-tight truncate w-full text-center">{t.tabGenerate}</span>
            </button>

            <button
              id="mobile-nav-tab-scanner"
              onClick={() => setActiveTab('scanner')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-bold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Scan className="w-4 h-4 mb-0.5" />
              <span className="leading-tight truncate w-full text-center">{t.tabScan}</span>
            </button>

            <button
              id="mobile-nav-tab-batch"
              onClick={() => setActiveTab('batch')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-bold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 mb-0.5" />
              <span className="leading-tight truncate w-full text-center">{t.tabBatch}</span>
            </button>

            <button
              id="mobile-nav-tab-history"
              onClick={() => setActiveTab('history')}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-bold transition-all min-h-[44px] cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs ring-1 ring-sky-300 dark:ring-sky-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <History className="w-4 h-4 mb-0.5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-sky-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="leading-tight truncate w-full text-center">{t.tabHistory}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
