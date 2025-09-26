"use client"

import { useTheme } from "next-themes"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type ThemeMode = "light" | "dark"
type ThemeOrigin = { x: number; y: number }

interface ThemeTransitionContextType {
  isTransitioning: boolean
  overlayTheme: ThemeMode
  toggleTheme: (origin?: ThemeOrigin) => void
  setThemeWithTransition: (target: ThemeMode, origin?: ThemeOrigin) => void
  overlayOrigin: ThemeOrigin | null
}

const DEFAULT_THEME: ThemeMode = "light"

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(
  undefined
)

const sanitizeTheme = (value?: string): ThemeMode => (value === "dark" ? "dark" : "light")

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [overlayTheme, setOverlayTheme] = useState<ThemeMode>(DEFAULT_THEME)
  const timeoutsRef = useRef<number[]>([])
  const [origin, setOrigin] = useState<ThemeOrigin | null>(null)

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  const scheduleTimeout = useCallback(
    (handler: () => void, delay: number) => {
      const id = window.setTimeout(handler, delay)
      timeoutsRef.current.push(id)
      return id
    },
    []
  )

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [clearTimers])

  useEffect(() => {
    if (!isTransitioning && resolvedTheme) {
      setOverlayTheme(sanitizeTheme(resolvedTheme))
    }
  }, [isTransitioning, resolvedTheme])

  const startTransition = useCallback(
    (targetTheme: ThemeMode, at?: ThemeOrigin) => {
      clearTimers()
      setOrigin(at ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 })
      setOverlayTheme(targetTheme)
      setIsTransitioning(true)

      // Give the overlay 1 frame to mount before flipping theme
      scheduleTimeout(() => setTheme(targetTheme), 80)

      // Stop overlay after animation
      scheduleTimeout(() => {
        setIsTransitioning(false)
        setOverlayTheme(targetTheme)
        setOrigin(null)
        clearTimers()
      }, 520)
    },
    [clearTimers, scheduleTimeout, setTheme]
  )

  const toggleTheme = useCallback(
    (at?: ThemeOrigin) => {
      if (isTransitioning) return
      const currentTheme = sanitizeTheme(resolvedTheme)
      const targetTheme: ThemeMode = currentTheme === "light" ? "dark" : "light"
      startTransition(targetTheme, at)
    },
    [isTransitioning, resolvedTheme, startTransition]
  )

  const setThemeWithTransition = useCallback(
    (target: ThemeMode, at?: ThemeOrigin) => {
      if (isTransitioning) return
      const targetTheme = sanitizeTheme(target)
      startTransition(targetTheme, at)
    },
    [isTransitioning, startTransition]
  )

  const value = useMemo(
    () => ({ isTransitioning, overlayTheme, toggleTheme, setThemeWithTransition, overlayOrigin: origin }),
    [isTransitioning, overlayTheme, toggleTheme, setThemeWithTransition, origin]
  )

  return <ThemeTransitionContext.Provider value={value}>{children}</ThemeTransitionContext.Provider>
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext)
  if (context === undefined) {
    throw new Error("useThemeTransition must be used within a ThemeTransitionProvider")
  }
  return context
}
