import { useTranslation } from "react-i18next"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { BookOpen, ClipboardList, FolderOpen, Home, Sparkles } from "lucide-react"

import { useSidebar } from "@/components/layout/sidebar-context"

// Sidebar Navigation — Design Bible p.18 ("02. Sidebar Navigation"). The
// dark navy surface + purple active-state match the mockup regardless of
// the app's light/dark theme (a persistent branded rail, common in
// dashboard products). Positioned on the logical "start" side, so it's on
// the left in English (LTR) and the right in Arabic (RTL) automatically —
// no left/right literals, per the RTL rules in CLAUDE.md.
const NAV_ITEMS = [
  { key: "nav.home", icon: Home, href: "#", active: true },
  { key: "nav.courses", icon: BookOpen, href: "#", active: false },
  { key: "nav.aiTutor", icon: Sparkles, href: "#", active: false },
  { key: "nav.homework", icon: ClipboardList, href: "#", active: false },
  { key: "nav.resources", icon: FolderOpen, href: "#", active: false },
] as const

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation()
  const { closeMobileSidebar } = useSidebar()

  return (
    <Flex direction="column" gap="1" h="full" overflowX="hidden" py="4">
      <Flex
        asChild
        align="center"
        gap="2"
        mb="4"
        px="4"
        textStyle="h4"
        fontWeight="bold"
        color="white"
      >
        <a href="#">
          <Flex
            align="center"
            justify="center"
            boxSize="8"
            shrink="0"
            borderRadius="md"
            bg="primary.solid"
            textStyle="body"
            fontWeight="bold"
          >
            AI
          </Flex>
          {!collapsed && (
            <Text as="span">
              Edu<Text as="span" color="primary.solid">AI</Text>
            </Text>
          )}
        </a>
      </Flex>

      <Flex asChild direction="column" gap="1" px="3">
        <nav aria-label="Primary">
          {NAV_ITEMS.map(({ key, href, icon, active }) => (
            <Flex
              key={key}
              asChild
              align="center"
              gap="3"
              borderRadius="sm"
              px={collapsed ? "0" : "3"}
              py="2.5"
              justify={collapsed ? "center" : "flex-start"}
              textStyle="body"
              fontWeight="medium"
              color={active ? "white" : "gray.300"}
              bg={active ? "primary.solid" : "transparent"}
              _hover={{ bg: active ? "primary.solid" : "whiteAlpha.200", color: "white" }}
            >
              <a href={href} title={collapsed ? t(key) : undefined} aria-current={active ? "page" : undefined} onClick={closeMobileSidebar}>
                <Icon as={icon} boxSize="5" aria-hidden="true" />
                {!collapsed && <Text truncate>{t(key)}</Text>}
              </a>
            </Flex>
          ))}
        </nav>
      </Flex>
    </Flex>
  )
}

export function Sidebar() {
  const { isMobileOpen, isCollapsed, closeMobileSidebar } = useSidebar()

  return (
    <>
      {/* Desktop / tablet-landscape inline rail */}
      <Box
        asChild
        position="sticky"
        top="0"
        display={{ base: "none", lg: "block" }}
        h="100svh"
        flexShrink="0"
        borderInlineEndWidth="1px"
        borderColor="blackAlpha.300"
        bg="gray.900"
        w={isCollapsed ? "20" : "64"}
        transition="width 0.2s"
      >
        <aside>
          <SidebarContent collapsed={isCollapsed} />
        </aside>
      </Box>

      {/* Mobile / tablet off-canvas drawer */}
      {isMobileOpen && (
        <Box
          asChild
          position="fixed"
          inset="0"
          zIndex="40"
          bg="blackAlpha.500"
          display={{ lg: "none" }}
        >
          <button type="button" aria-label="Close menu overlay" onClick={closeMobileSidebar} />
        </Box>
      )}
      <Box
        asChild
        position="fixed"
        insetBlock="0"
        insetInlineStart="0"
        zIndex="50"
        w="72"
        maxW="80vw"
        bg="gray.900"
        display={{ lg: "none" }}
        transition="transform 0.2s"
        transform={isMobileOpen ? "translateX(0)" : "translateX(-100%)"}
        css={{ '[dir="rtl"] &': { transform: isMobileOpen ? "translateX(0)" : "translateX(100%)" } }}
      >
        <aside aria-label="Sidebar navigation">
          <SidebarContent collapsed={false} />
        </aside>
      </Box>
    </>
  )
}
