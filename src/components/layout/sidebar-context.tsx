import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import { useMediaQuery } from "@/lib/use-media-query"

// "Small Desktop" cutover from the Design Bible's Responsive Strategy (p.14) —
// below this, the sidebar becomes an off-canvas drawer instead of an inline rail.
const DESKTOP_QUERY = "(min-width: 1025px)"

interface SidebarContextValue {
  /** Off-canvas drawer visibility, used below the desktop breakpoint. */
  isMobileOpen: boolean
  /** Icon-only rail collapse, used at/above the desktop breakpoint. */
  isCollapsed: boolean
  isDesktop: boolean
  /** Toggles the drawer on mobile/tablet, or the rail collapse on desktop. */
  toggleSidebar: () => void
  closeMobileSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = useCallback(() => {
    if (isDesktop) {
      setIsCollapsed((collapsed) => !collapsed)
    } else {
      setIsMobileOpen((open) => !open)
    }
  }, [isDesktop])

  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), [])

  const value = useMemo(
    () => ({ isMobileOpen, isCollapsed, isDesktop, toggleSidebar, closeMobileSidebar }),
    [isMobileOpen, isCollapsed, isDesktop, toggleSidebar, closeMobileSidebar],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
