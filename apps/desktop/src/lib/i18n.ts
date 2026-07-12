import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import trCommon from "../locales/tr/common.json";

void i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: enCommon },
    tr: { translation: trCommon },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

