// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './translations/en.json';
import tsTranslation from './translations/ts.json';
import hnTranslation from './translations/hn.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ts: {
    translation: tsTranslation
  },
  hn: {
    translation: hnTranslation
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
