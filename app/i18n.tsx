import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// import translationSP from './locales/sp/translation.json';
import translationENG from './locals/en/translation.json'
import translationRO from './locals/ro/translation.json'
// import translationGr from './locales/gr/translation.json';
// import translationIT from './locales/it/translation.json';
import translationRU from './locals/ru/translation.json'

// import translationFR from './locales/fr/translation.json';

// The translations
const resources: any = {
  en: {
    translation: translationENG,
  },
  ro: {
    translation: translationRO,
  },
  // gr: {
  // 	translation: translationGr,
  // },
  // it: {
  // 	translation: translationIT,
  // },
  ru: {
    translation: translationRU,
  },
  // sp: {
  // 	translation: translationSP,
  // },
  // fr: {
  // 	translation: translationFR,
  // },
  // ro: {
  // 	translation: translationRO,
  // },
}

if (typeof window !== 'undefined') {
  const language: any = localStorage.getItem('I18N_LANGUAGE')
  if (!language) {
    localStorage.setItem('I18N_LANGUAGE', 'en')
  }
}

i18n
  .use(detector)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en', // Use en if detected lng is not available

    keySeparator: false, // We do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    saveMissing: true, // send not translated keys to endpoint
  })

export default i18n
