import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
  defineTextStyles,
} from "@chakra-ui/react"

// ---------------------------------------------------------------------------
// EduAI Design System Bible v1.0 — Chakra UI theme
//
// Chakra's built-in components already implement the interaction patterns
// (focus rings, disabled states, a11y attributes, RTL-aware logical
// properties) the Bible asks for — this file only supplies *values*: the
// brand color palettes, the type scale, the radius/shadow scale, and the
// handful of component-recipe overrides needed where a built-in default
// doesn't match the Bible (e.g. Buttons vs. Inputs use different radii).
// ---------------------------------------------------------------------------

// Colors (p.3) — each brand color becomes a full Chakra "colorPalette" so any
// component can be themed with e.g. `colorPalette="primary"` and pick up
// solid/subtle/muted/emphasized/fg/border/focusRing automatically.
//
// Every step is mode-aware: `fg` (text on tinted/plain backgrounds) swaps to
// a lighter shade in dark mode so it keeps contrast against dark surfaces,
// and the translucent tint steps get slightly higher alphas, since the same
// alpha reads much weaker over a dark background than over white.
function colorPalette(hex: string, rgb: string, darkHex: string) {
  return {
    solid: { value: hex },
    contrast: { value: "white" },
    fg: { value: { _light: hex, _dark: darkHex } },
    subtle: {
      value: { _light: `rgba(${rgb}, 0.1)`, _dark: `rgba(${rgb}, 0.16)` },
    },
    muted: {
      value: { _light: `rgba(${rgb}, 0.18)`, _dark: `rgba(${rgb}, 0.28)` },
    },
    emphasized: {
      value: { _light: `rgba(${rgb}, 0.32)`, _dark: `rgba(${rgb}, 0.42)` },
    },
    border: {
      value: { _light: `rgba(${rgb}, 0.4)`, _dark: `rgba(${rgb}, 0.5)` },
    },
    focusRing: { value: { _light: hex, _dark: darkHex } },
  }
}

const config = defineConfig({
  cssVarsPrefix: "eduai",
  theme: {
    breakpoints: {
      // Responsive Strategy (p.14)
      sm: "480px",
      md: "768px", // Tablet
      lg: "1025px", // Small Desktop
      xl: "1281px", // Desktop
      "2xl": "1441px", // Wide Desktop
    },
    tokens: {
      colors: {
        // Neutral scale (p.3) — replaces Chakra's default gray, so every
        // built-in semantic token (bg, fg, border, bg.muted, ...) that
        // references {colors.gray.*} automatically becomes on-brand.
        gray: {
          50: { value: "#FAFAFA" },
          100: { value: "#F5F5F7" },
          200: { value: "#E4E7EC" },
          300: { value: "#CBD2DC" },
          400: { value: "#94A3BB" },
          500: { value: "#64748B" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1E293B" },
          900: { value: "#0F172A" },
          950: { value: "#0B1120" },
        },
      },
      radii: {
        // Border Radius (p.9), component-mapped below via recipe overrides.
        xs: { value: "4px" },
        sm: { value: "8px" },
        md: { value: "12px" },
        lg: { value: "16px" },
        xl: { value: "24px" },
        "2xl": { value: "32px" },
        full: { value: "9999px" },
      },
      fonts: {
        // Typography (p.4) — actual family swaps between Inter/Tajawal via
        // the --eduai-font-sans CSS var, set in globalCss below based on
        // [dir="rtl"] (see src/i18n for the language -> dir sync).
        heading: { value: "var(--eduai-font-sans)" },
        body: { value: "var(--eduai-font-sans)" },
      },
    },
    semanticTokens: {
      colors: {
        primary: colorPalette("#6C4CFF", "108, 76, 255", "#A78BFF"),
        secondary: colorPalette("#2563EB", "37, 99, 235", "#60A5FA"),
        success: colorPalette("#22C55E", "34, 197, 94", "#4ADE80"),
        warning: colorPalette("#F59E0B", "245, 158, 11", "#FBBF24"),
        error: colorPalette("#EF4444", "239, 68, 68", "#F87171"),
        info: colorPalette("#0EA5E9", "14, 165, 233", "#38BDF8"),
        // Explicit named surfaces (p.3, "Background Colors") for precise use
        // alongside Chakra's generic bg.* / border.* (which now resolve
        // against our neutral scale above).
        page: { value: { _light: "#FFFFFF", _dark: "{colors.gray.900}" } },
        surface: { value: { _light: "#F8FAFC", _dark: "{colors.gray.800}" } },
        surfaceHover: { value: { _light: "#F1F5F9", _dark: "{colors.gray.700}" } },
        divider: { value: { _light: "#E2E8F0", _dark: "{colors.gray.700}" } },
        // Purple-tinted card wash — the dark value leans purple rather than
        // plain gray so tinted cards keep their brand feel in dark mode.
        card: { value: { _light: "#ebe4fd", _dark: "#251E4D" } },
      },
      shadows: {
        // Shadows & Elevation (p.10) — semantic (mode-aware): light-mode
        // shadows are too faint to register on dark surfaces, so dark mode
        // gets deeper, higher-alpha versions.
        elevation1: {
          value: {
            _light: "0px 2px 8px 0px rgba(0, 0, 0, 0.08)",
            _dark: "0px 2px 8px 0px rgba(0, 0, 0, 0.4)",
          },
        },
        elevation2: {
          value: {
            _light: "0px 4px 16px 0px rgba(0, 0, 0, 0.1)",
            _dark: "0px 4px 16px 0px rgba(0, 0, 0, 0.45)",
          },
        },
        elevation3: {
          value: {
            _light: "0px 8px 24px 0px rgba(0, 0, 0, 0.12)",
            _dark: "0px 8px 24px 0px rgba(0, 0, 0, 0.5)",
          },
        },
        elevation4: {
          value: {
            _light: "0px 16px 48px 0px rgba(0, 0, 0, 0.16)",
            _dark: "0px 16px 48px 0px rgba(0, 0, 0, 0.55)",
          },
        },
      },
    },
    textStyles: defineTextStyles({
      // Typography (p.4) — desktop sizes match the Bible exactly; h1–h3 use
      // clamp() so headings scale down smoothly on mobile/tablet instead of
      // overflowing, per the "Fluid & Scalable" principle (p.14).
      h1: {
        value: {
          fontSize: "clamp(32px, 4vw + 20px, 48px)",
          lineHeight: "1.15",
          fontWeight: "700",
        },
      },
      h2: {
        value: {
          fontSize: "clamp(26px, 3vw + 16px, 36px)",
          lineHeight: "1.2",
          fontWeight: "600",
        },
      },
      h3: {
        value: {
          fontSize: "clamp(22px, 2vw + 14px, 28px)",
          lineHeight: "1.3",
          fontWeight: "600",
        },
      },
      h4: { value: { fontSize: "22px", lineHeight: "30px", fontWeight: "600" } },
      bodyLg: { value: { fontSize: "18px", lineHeight: "28px", fontWeight: "400" } },
      body: { value: { fontSize: "16px", lineHeight: "26px", fontWeight: "400" } },
      caption: { value: { fontSize: "14px", lineHeight: "22px", fontWeight: "400" } },
      label: { value: { fontSize: "13px", lineHeight: "20px", fontWeight: "500" } },
      button: { value: { fontSize: "16px", lineHeight: "24px", fontWeight: "600" } },
    }),
    recipes: {
      // Buttons (p.12): 12px radius. Input/Textarea/Tooltip already land on
      // 8px via the shared "sm" radius token above, so they need no override.
      button: defineRecipe({
        base: { borderRadius: "md", fontWeight: "semibold" },
      }),
      // Badges / Tags (p.9): fully rounded.
      badge: defineRecipe({
        base: { borderRadius: "full", fontWeight: "medium" },
      }),
    },
    slotRecipes: {
      // Cards / Panels (p.9): 16px radius.
      card: defineSlotRecipe({
        slots: ["root"],
        base: { root: { borderRadius: "lg" } },
      }),
      // Modals / Dialogs (p.9): 24px radius.
      dialog: defineSlotRecipe({
        slots: ["content"],
        base: { content: { borderRadius: "xl" } },
      }),
      // Dropdowns (p.9): 12px radius.
      menu: defineSlotRecipe({
        slots: ["content"],
        base: { content: { borderRadius: "md" } },
      }),
    },
  },
  globalCss: {
    ":root": {
      "--eduai-font-sans": '"Inter Variable", "Inter", system-ui, sans-serif',
    },
    '[dir="rtl"]': {
      "--eduai-font-sans": '"Tajawal", "Inter Variable", system-ui, sans-serif',
    },
    "html, body": {
      bg: "page",
      color: "fg",
    },
  },
})

export const system = createSystem(defaultConfig, config)
