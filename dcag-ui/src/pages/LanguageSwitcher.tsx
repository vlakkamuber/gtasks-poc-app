// LanguageSwitcher.tsx
import React, { useEffect } from 'react';
// import { IonToggle } from '@ionic/react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const handleChange = (event: CustomEvent) => {
    const selectedLanguage = event.detail.value;
    console.log(`Selected Language: ${selectedLanguage}`);
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
  };
  // Set the default language to English if not found in local storage
  const defaultLanguage = localStorage.getItem('selectedLanguage') || 'en';
  useEffect(() => {
    setLanguage(defaultLanguage);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <IonSelect
      placeholder="Select Language"
      value={language}
      onIonChange={handleChange}
      disabled={false}>
      <IonSelectOption value="en">English</IonSelectOption>
      {/* <IonSelectOption value="ts">తెలుగు</IonSelectOption> */}
      <IonSelectOption value="hn">हिंदी</IonSelectOption>
    </IonSelect>
  );
};

export default LanguageSwitcher;
