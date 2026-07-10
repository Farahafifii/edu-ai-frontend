import { Button, Icon } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Languages } from "lucide-react"

import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config"

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage as SupportedLanguage

  function handleToggle() {
    const next = SUPPORTED_LANGUAGES.find((lang) => lang !== current) ?? current
    void i18n.changeLanguage(next)
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleToggle} aria-label={t("language.label")}>
      <Icon as={Languages} aria-hidden="true" />
      {LANGUAGE_LABELS[current]}
    </Button>
  )
}
