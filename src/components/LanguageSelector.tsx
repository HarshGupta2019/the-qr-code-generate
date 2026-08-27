import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="btn-language-dropdown"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery('');
        }}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-sky-950 dark:text-sky-100 bg-sky-100/90 dark:bg-sky-950/80 hover:bg-sky-200 dark:hover:bg-sky-900/90 border border-sky-300/80 dark:border-sky-700/60 rounded-xl transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language (20+ Languages Supported)"
      >
        <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage.nativeName}</span>
        <span className="sm:hidden font-medium">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown
          className={`w-3 h-3 text-sky-700 dark:text-sky-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto right-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-[calc(100vw-24px)] sm:w-80 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-sky-200 dark:border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header & Search */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-sky-50/70 dark:bg-sky-950/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Select Language ({languages.length} Available)
              </span>
              <span className="text-[10px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-200/70 dark:bg-sky-900/80 px-2 py-0.5 rounded-full">
                Global
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="language-search-input"
                placeholder="Search language / idioma / 语言..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-sky-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Language Options List */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No language found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-950 dark:text-sky-200 font-bold'
                        : 'hover:bg-sky-50/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {lang.nativeName}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {lang.dir === 'rtl' && (
                        <span className="text-[10px] uppercase font-mono px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          RTL
                        </span>
                      )}
                      {isSelected ? (
                        <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 stroke-[2.5]" />
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">
                          {lang.code}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Footer */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-3">
            <span>25 International Languages</span>
            <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Auto-detect ready
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
