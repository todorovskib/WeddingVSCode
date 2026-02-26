import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppLanguage, translateText } from '../i18n/translations';
import { withLocalePath } from '../i18n/localePath';

interface I18nContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (input: string) => string;
  pathFor: (pathname: string) => string;
}

const STORAGE_KEY = 'wedmkd-language';

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'mk') return stored;
    return 'mk';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'mk' ? 'mk' : 'en';
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      toggleLanguage: () => setLanguageState((current) => (current === 'en' ? 'mk' : 'en')),
      t: (input: string) => translateText(language, input),
      pathFor: (pathname: string) => withLocalePath(pathname, language),
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return value;
}
