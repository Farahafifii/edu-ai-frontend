import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, ChevronDown, Menu as MenuIcon, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ColorModeButton } from "@/components/ui/color-mode";

// Public marketing-site header — Phase 1 "Landing Discovery Page" (CLAUDE.md).
// Distinct from the authenticated app's Navbar + Sidebar (components/layout/
// app-shell.tsx), which is wired up post-login.
const LINKS = [
  { key: "landingNav.home", href: "#" },
  { key: "landingNav.features", href: "#features" },
  { key: "landingNav.howItWorks", href: "#how-it-works" },
  { key: "landingNav.forParents", href: "#parents" },
  { key: "landingNav.forTeachers", href: "#teachers" },
] as const;

const CURRICULA_ITEMS = [
  "curricula.egyptianTitle",
  "curricula.americanTitle",
  "curricula.britishTitle",
  "curricula.ibTitle",
] as const;

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button asChild variant="ghost" size="sm" fontWeight="medium" color="fg">
      <a href={href}>{children}</a>
    </Button>
  );
}

export function LandingNavbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="40"
      borderBottomWidth="1px"
      borderColor="border"
      bg="page/95"
      backdropFilter="blur(8px)"
    >
      <Flex
        mx="auto"
        maxW="7xl"
        h="16"
        align="center"
        justify="space-between"
        gap="4"
        px={{ base: "4", md: "6", lg: "8" }}
      >
        <Logo />

        <HStack gap="1" display={{ base: "none", lg: "flex" }} asChild>
          <nav aria-label="Primary">
            {LINKS.slice(0, 3).map(({ key, href }) => (
              <NavLink key={key} href={href}>
                {t(key)}
              </NavLink>
            ))}

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="medium"
                  color="fg"
                >
                  {t("landingNav.curricula")}
                  <ChevronDown size={16} aria-hidden="true" />
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {CURRICULA_ITEMS.map((key) => (
                      <Menu.Item key={key} value={key} asChild>
                        <a href="#curricula">{t(key)}</a>
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            {LINKS.slice(3).map(({ key, href }) => (
              <NavLink key={key} href={href}>
                {t(key)}
              </NavLink>
            ))}
          </nav>
        </HStack>

        <HStack gap="2">
          <HStack gap="1" display={{ base: "none", sm: "flex" }}>
            <LanguageSwitcher />
            <ColorModeButton />
          </HStack>
          {/* <Button
            asChild
            variant="outline"
            colorPalette="primary"
            size="sm"
            display={{ base: "none", sm: "inline-flex" }}
          >
            <a href="#login">{t("landingNav.login")}</a>
          </Button> */}
          <Button asChild variant="solid" colorPalette="primary" size="sm">
            <a href="#signup">
              {t("actions.getStarted")}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            display={{ base: "inline-flex", lg: "none" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" />
            ) : (
              <MenuIcon aria-hidden="true" />
            )}
          </IconButton>
        </HStack>
      </Flex>

      {mobileOpen && (
        <Box
          borderTopWidth="1px"
          borderColor="border"
          px="4"
          py="3"
          display={{ lg: "none" }}
        >
          <VStack asChild align="stretch" gap="1">
            <nav aria-label="Primary mobile">
              {LINKS.map(({ key, href }) => (
                <Button
                  key={key}
                  asChild
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                >
                  <a href={href}>{t(key)}</a>
                </Button>
              ))}
              <Box
                px="3"
                pt="2"
                textStyle="caption"
                fontWeight="semibold"
                color="fg.muted"
              >
                {t("landingNav.curricula")}
              </Box>
              {CURRICULA_ITEMS.map((key) => (
                <Button
                  key={key}
                  asChild
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                  ps="6"
                  color="fg.muted"
                >
                  <a href="#curricula">{t(key)}</a>
                </Button>
              ))}
            </nav>
          </VStack>
          <Flex
            justify="space-between"
            align="center"
            borderTopWidth="1px"
            borderColor="border"
            mt="3"
            pt="3"
            display={{ sm: "none" }}
          >
            <LanguageSwitcher />
            <ColorModeButton />
          </Flex>
        </Box>
      )}
    </Box>
  );
}
