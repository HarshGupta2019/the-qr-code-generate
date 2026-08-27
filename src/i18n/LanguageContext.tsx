import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SUPPORTED_LANGUAGES, Language } from './languages';
import { TRANSLATIONS, TranslationDictionary } from './translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  t: TranslationDictionary;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'qr_generator_selected_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langCode, setLangCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      // Auto-detect browser language
      const browserLang = navigator.language;
      if (browserLang) {
        // Direct match (e.g. zh-CN)
        const exact = SUPPORTED_LANGUAGES.find(
          (l) => l.code.toLowerCase() === browserLang.toLowerCase()
        );
        if (exact) return exact.code;

        // Prefix match (e.g. es-MX -> es, fr-CA -> fr)
        const base = browserLang.split('-')[0].toLowerCase();
        const baseMatch = SUPPORTED_LANGUAGES.find(
          (l) => l.code.toLowerCase() === base
        );
        if (baseMatch) return baseMatch.code;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const currentLanguage = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((l) => l.code === langCode) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [langCode]);

  const t = useMemo(() => {
    return TRANSLATIONS[langCode] || TRANSLATIONS.en;
  }, [langCode]);

  const dir = currentLanguage.dir;
  const isRTL = dir === 'rtl';

  const setLanguage = (code: string) => {
    if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
      setLangCode(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch (e) {
        console.error('Failed to save language', e);
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        dir,
        isRTL,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
