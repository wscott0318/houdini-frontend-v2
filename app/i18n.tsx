import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationENG from '@/lib/locales/en/translation.json'
import translationRO from '@/lib/locales/ro/translation.json'
import translationRU from '@/lib/locales/ru/translation.json'

const resources: any = {
  en: {
    translation: translationENG,
  },
  ro: {
    translation: translationRO,
  },
  ru: {
    translation: translationRU,
  },
}

if (typeof window !== 'undefined') {
  const language: any = localStorage.getItem('I18N_LANGUAGE')
  if (!language) {
    localStorage.setItem('I18N_LANGUAGE', 'en')
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
  })

export default i18n
