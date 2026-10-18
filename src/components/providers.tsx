"use client"

import { Suspense, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { MotionConfig } from "motion/react"
import { ThemeProvider } from "next-themes"

// A new page always opens at the top, also when the link was clicked far down the previous page.
// Back/forward keeps the browser's restored position, and links to an anchor still jump to it.
function ScrollToTop() {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const firstRender = useRef(true)
  const fromHistory = useRef(false)

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (fromHistory.current) {
      fromHistory.current = false
      return
    }
    if (window.location.hash) return
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, search])

  return null
}

// Light is the default even when the device is in dark mode; dark only comes from the header toggle.
// Every animation honours the visitor's reduced-motion setting.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </ThemeProvider>
  )
}
