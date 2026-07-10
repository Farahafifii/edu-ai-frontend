import type { ReactNode } from "react"
import { Box, Flex } from "@chakra-ui/react"

import { SidebarProvider } from "@/components/layout/sidebar-context"
// Sidebar is only relevant to the authenticated app (post-login) — wire it
// back in when that shell is built.
// import { Sidebar } from "@/components/layout/sidebar"
import { Navbar } from "@/components/layout/navbar"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Flex minH="100svh" bg="page">
        {/* <Sidebar /> */}
        <Flex direction="column" flex="1" minW="0">
          <Navbar />
          <Box as="main" flex="1">
            {children}
          </Box>
        </Flex>
      </Flex>
    </SidebarProvider>
  )
}
