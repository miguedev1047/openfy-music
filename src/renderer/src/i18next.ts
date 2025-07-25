import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { EN } from '../../../languages/en'
import { ES } from '../../../languages/es'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'es',
    debug: true,
    resources: { en: EN, es: ES }
  })
