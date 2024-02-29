// LanguageSwitcher.tsx
import React, { useEffect, useRef } from 'react';
// import { IonToggle } from '@ionic/react';
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, LANGUAGE_CODE_MAPPER } from '../constants/constant';
const languageObj = {
  en: 'English',
  ts: 'తెలుగు',
  hn: 'हिंदी',
  ta: 'தமிழ்'
};

const options = [
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
];

const LanguageSwitcher: React.FC<{ page?: string; isOpen?: boolean }> = ({ page, isOpen }) => {
  const { t, i18n } = useTranslation();
  const languageSwitcherRef = useRef<HTMLIonSelectElement | null>();
  const [value, setValue] = React.useState([{ label: 'English', id: 'en' }]);
  const { language, setLanguage } = useLanguage();
  const logEvent = useAnalytics({ page: page || ANALYTICS_PAGE.account });
  const handleChange = (params) => {
    const selectedLanguage = params.detail?.value?.id;
    if (!selectedLanguage) {
      return;
    }
    logEvent({ actions: 'language_change', properties: LANGUAGE_CODE_MAPPER[selectedLanguage] });
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    localStorage.setItem('hasOpenedLanguageSwitcher', 'YES');
    setValue([{ label: languageObj[selectedLanguage], id: selectedLanguage }]);
  };
  // Set the default language to English if not found in local storage
  const defaultLanguage = localStorage.getItem('selectedLanguage') || 'en';
  useEffect(() => {
    setLanguage(defaultLanguage);
    setValue([{ label: languageObj[defaultLanguage], id: defaultLanguage }]);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    if (isOpen) {
      const hasOpenedLanguageSwitcher = localStorage.getItem('hasOpenedLanguageSwitcher');
      if (!hasOpenedLanguageSwitcher) {
        languageSwitcherRef?.current?.open();
      }
    }
  }, [isOpen]);

  const compareWith = (o1, o2) => {
    return o1.id === o2.id;
  };

  const customAlertOptions = {
    header: t('dcag.settings.app_language.label'),
    backdropDismiss: false
  };

  return (
    <IonSelect
      ref={(ref) => {
        languageSwitcherRef.current = ref;
      }}
      style={{
        background: 'rgb(246, 246, 246)',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25
      }}
      value={value}
      interface='alert'
      placeholder="Select Language"
      compareWith={compareWith}
      cancelText=''
      onIonChange={handleChange}
      onIonDismiss={() => {
        localStorage.setItem('hasOpenedLanguageSwitcher', 'YES');
      }}
      interfaceOptions={customAlertOptions}>
      {options.map((option) => (
        <IonSelectOption key={option.id} value={option}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default LanguageSwitcher;
