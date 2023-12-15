import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "locales/en";
import de from "locales/de";
import fa from "locales/fa";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",

    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
      fa: {
        translation: fa,
      },
    },
  });

export default i18n;
