import { useState } from "react"
import { Box, Flex, HStack, IconButton } from "@chakra-ui/react"
import { Bell, Menu, Search } from "lucide-react"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { ColorModeButton } from "@/components/ui/color-mode"
import { useSidebar } from "@/components/layout/sidebar-context"

// Top Navigation (Navbar) — Design Bible p.18. Primary links live in the
// Sidebar; this bar hosts the sidebar toggle, search, notifications and
// user actions, and stays fixed across every breakpoint.
export function Navbar() {
  const { toggleSidebar } = useSidebar()
  const [notificationCount] = useState(3)

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="30"
      borderBottomWidth="1px"
      borderColor="border"
      bg="page/95"
      backdropFilter="blur(8px)"
    >
      <Flex h="16" align="center" justify="space-between" gap="4" px={{ base: "4", sm: "6" }}>
        <IconButton
          type="button"
          variant="ghost"
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
        >
          <Menu aria-hidden="true" />
        </IconButton>

        <HStack gap="1">
          <IconButton type="button" variant="ghost" display={{ base: "none", sm: "inline-flex" }} aria-label="Search">
            <Search aria-hidden="true" />
          </IconButton>

          <Box position="relative">
            <IconButton type="button" variant="ghost" aria-label="Notifications">
              <Bell aria-hidden="true" />
            </IconButton>
            {notificationCount > 0 && (
              <Flex
                position="absolute"
                insetInlineEnd="1.5"
                top="1.5"
                boxSize="4"
                align="center"
                justify="center"
                borderRadius="full"
                bg="error.solid"
                color="error.contrast"
                fontSize="10px"
                fontWeight="semibold"
                lineHeight="none"
              >
                {notificationCount}
              </Flex>
            )}
          </Box>

          <HStack gap="1" display={{ base: "none", sm: "flex" }}>
            <LanguageSwitcher />
            <ColorModeButton />
          </HStack>

          <Flex
            aria-hidden="true"
            boxSize="9"
            flexShrink="0"
            align="center"
            justify="center"
            borderRadius="full"
            bg="primary.subtle"
            color="primary.fg"
            textStyle="label"
            fontWeight="semibold"
          >
            EA
          </Flex>
        </HStack>
      </Flex>
    </Box>
  )
}
