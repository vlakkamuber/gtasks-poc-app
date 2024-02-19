// LanguageSwitcher.tsx
import React, { useEffect } from 'react';
// import { IonToggle } from '@ionic/react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, LANGUAGE_CODE_MAPPER } from '../constants/constant';
import { Select } from 'baseui/select';
import { SHAPE, SIZE } from 'baseui/button';
const languageObj = {
  en: 'English',
  ts: 'తెలుగు',
  hn: 'हिंदी',
  ta: 'தமிழ்'
};

const LanguageSwitcher: React.FC<{ page: string }> = ({ page }) => {
  const { i18n } = useTranslation();
  const [value, setValue] = React.useState([{ label: 'English', id: 'en' }]);
  const { language, setLanguage } = useLanguage();
  const logEvent = useAnalytics({ page: page || ANALYTICS_PAGE.account });
  const handleChange = (params) => {
    const selectedLanguage = params[0].id;
    logEvent({ actions: 'language_change', properties: LANGUAGE_CODE_MAPPER[selectedLanguage] });
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setValue([{ label: languageObj[selectedLanguage], id: selectedLanguage }]);
  };
  // Set the default language to English if not found in local storage
  const defaultLanguage = localStorage.getItem('selectedLanguage') || 'en';
  useEffect(() => {
    setLanguage(defaultLanguage);
    setValue([{ label: languageObj[defaultLanguage], id: defaultLanguage }]);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Select
      options={[
        {
          label: 'English',
          id: 'en'
        },
        {
          label: 'తెలుగు',
          id: 'ts'
        },
        {
          label: 'हिंदी',
          id: 'hn'
        },
        {
          label: 'தமிழ்',
          id: 'ta'
        }
      ]}
      size={SIZE.compact}
      shape={SHAPE.pill}
      value={value}
      clearable={false}
      placeholder="Select Language"
      onChange={(params) => handleChange(params.value)}
    />
  );
};

export default LanguageSwitcher;
