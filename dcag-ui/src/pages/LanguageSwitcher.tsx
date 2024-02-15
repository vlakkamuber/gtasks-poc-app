// LanguageSwitcher.tsx
import React, { useEffect } from 'react';
// import { IonToggle } from '@ionic/react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, LANGUAGE_CODE_MAPPER } from '../constants/constant';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.account });
  const handleChange = (event: CustomEvent) => {
    const selectedLanguage = event.detail.value;
    console.log(`Selected Language: ${selectedLanguage}`);
    logEvent({ actions: 'language_change', properties: LANGUAGE_CODE_MAPPER[selectedLanguage] });
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
      <IonSelectOption value="ts">తెలుగు</IonSelectOption>
      <IonSelectOption value="hn">हिंदी</IonSelectOption>
      <IonSelectOption value="ta">தமிழ்</IonSelectOption>
    </IonSelect>
  );
};

export default LanguageSwitcher;
