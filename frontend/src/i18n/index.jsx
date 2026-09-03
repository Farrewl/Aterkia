import React, { createContext, useContext, useState, useCallback } from 'react';
import en from './en';
import id from './id';

const translations = { en, id };
const STORAGE_KEY = 'aterkia-lang';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) return stored;
    } catch { /* noop */ }
    return 'en';
  });

  const setLang = useCallback((newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      try { localStorage.setItem(STORAGE_KEY, newLang); } catch { /* noop */ }
    }
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}

export default I18nProvider;
