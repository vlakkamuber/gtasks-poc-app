// LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
  i18n: any;
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children,i18n }) => {
  const initialLanguage = localStorage.getItem('selectedLanguage') || 'en';
  const [language, setLanguage] = useState(initialLanguage)

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
  };
  useEffect(() => {
    // Update i18n language when the language changes
    i18n.changeLanguage(language);
    // Save the selected language to local storage
    localStorage.setItem('selectedLanguage', language);
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
