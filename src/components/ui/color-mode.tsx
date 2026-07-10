import { IconButton, Skeleton, type IconButtonProps } from "@chakra-ui/react"
import { ThemeProvider, useTheme, type ThemeProviderProps } from "next-themes"
import { forwardRef, useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export type ColorMode = "light" | "dark"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = (forcedTheme || resolvedTheme) as ColorMode
  const toggleColorMode = () => {
    setTheme(colorMode === "dark" ? "light" : "dark")
  }
  return { colorMode, setColorMode: setTheme, toggleColorMode }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <Moon /> : <Sun />
}

export const ColorModeButton = forwardRef<HTMLButtonElement, Omit<IconButtonProps, "aria-label">>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    const [mounted, setMounted] = useState(false)

    // Avoid a hydration/FOUC mismatch — the resolved theme isn't known
    // until next-themes reads localStorage on the client.
    useEffect(() => setMounted(true), [])

    if (!mounted) {
      return <Skeleton boxSize="8" borderRadius="full" />
    }

    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    )
  },
)
