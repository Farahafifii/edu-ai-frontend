export const SUPPORTED_LANGUAGES = ["en", "ar"] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const RTL_LANGUAGES: readonly SupportedLanguage[] = ["ar"]

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  ar: "العربية",
}

export function isRtl(language: string): boolean {
  return RTL_LANGUAGES.includes(language as SupportedLanguage)
}

export function getDirection(language: string): "rtl" | "ltr" {
  return isRtl(language) ? "rtl" : "ltr"
}
