import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import enCommon from "./locales/en/common.json"
import arCommon from "./locales/ar/common.json"
import { SUPPORTED_LANGUAGES, getDirection } from "./config"

const resources = {
  en: { common: enCommon },
  ar: { common: arCommon },
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "eduai-language",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  })

// Keep <html lang / dir> in sync with the active language, including on
// first load — react-i18next only re-renders components, it never touches
// the document itself, so this is done as a plain side effect here.
function syncDocumentDirection(language: string) {
  document.documentElement.lang = language
  document.documentElement.dir = getDirection(language)
}

syncDocumentDirection(i18n.resolvedLanguage ?? i18n.language)
i18n.on("languageChanged", syncDocumentDirection)

export default i18n
