import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { storageService } from '../services/storageService';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to English if no setting found
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const settings = storageService.getSettings();
    if (settings && settings.language) {
      setLanguage(settings.language);
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
      storageService.saveSettings({ language: langCode });
    }
  };

  // Translation helper function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if key missing
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key; 
      }
    }
    return value;
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
