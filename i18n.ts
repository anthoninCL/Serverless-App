import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next, TFunction } from 'react-i18next';
import * as Localization from 'expo-localization';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';

import translationEN from './translations/en.json';

dayjs.extend(utc);

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback =>
    Localization.getLocalizationAsync().then(({ locale }) => {
      dayjs.locale(locale.split('-')[0]);
      callback(locale);
    }),
  init: () => {},
  cacheUserLanguage: () => {},
};

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: translationEN,
  },
} as const;

i18n
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ['translation'],
    defaultNS,
    resources,
  });

export default i18n;

export type I18nKey = Parameters<TFunction>[0];
