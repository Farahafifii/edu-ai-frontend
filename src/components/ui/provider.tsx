import { ChakraProvider, LocaleProvider } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"

import { system } from "@/theme/system"
import { ColorModeProvider } from "@/components/ui/color-mode"

// Root provider: Chakra's styling engine (our design-system `system`), color
// mode persistence (next-themes under the hood), and Ark UI's LocaleProvider
// so interactive components (listbox/combobox collation, date formatting)
// follow the active i18n language. Visual RTL mirroring itself is driven by
// the native `dir` attribute on <html>, synced in src/i18n/index.ts.
export function Provider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme="light">
        <LocaleProvider locale={i18n.language}>{children}</LocaleProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
