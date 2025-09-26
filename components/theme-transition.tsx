"use client"

import { useEffect, useMemo, useState } from "react"
import { useThemeTransition } from "@/hooks/use-theme-transition.tsx"

export function ThemeTransition() {
  const { isTransitioning, overlayTheme, overlayOrigin } = useThemeTransition()
  const [mounted, setMounted] = useState(false)
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [maxR, setMaxR] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use origin from provider when available; otherwise default to center or last click
  useEffect(() => {
    if (overlayOrigin) {
      setOrigin(overlayOrigin)
      return
    }
    const onClick = (e: MouseEvent) => setOrigin({ x: e.clientX, y: e.clientY })
    window.addEventListener("click", onClick, { capture: true })
    return () => window.removeEventListener("click", onClick, { capture: true } as any)
  }, [overlayOrigin])

  useEffect(() => {
    const computeMaxRadius = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const corners = [
        Math.hypot(origin.x, origin.y),
        Math.hypot(vw - origin.x, origin.y),
        Math.hypot(origin.x, vh - origin.y),
        Math.hypot(vw - origin.x, vh - origin.y),
      ]
      setMaxR(Math.max(...corners))
    }
    computeMaxRadius()
    window.addEventListener("resize", computeMaxRadius)
    return () => window.removeEventListener("resize", computeMaxRadius)
  }, [origin])

  const background = useMemo(() => {
    const at = `${Math.max(0, origin.x)}px ${Math.max(0, origin.y)}px`
    if (overlayTheme === "dark") {
      return `radial-gradient(circle at ${at}, rgba(15,23,42,0.95) 0%, rgba(3,7,18,0.98) 55%, rgba(2,8,23,1) 100%)`
    }
    return `radial-gradient(circle at ${at}, rgba(248,250,252,0.96) 0%, rgba(255,255,255,1) 55%, rgba(241,245,249,0.95) 100%)`
  }, [overlayTheme, origin])

  if (!mounted && !isTransitioning) return null

  const clipPath = `circle(${isTransitioning ? Math.ceil(maxR) + 8 : 0}px at ${origin.x}px ${origin.y}px)`

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        WebkitClipPath: clipPath as any,
        clipPath,
        opacity: isTransitioning ? 1 : 0,
        transition: "clip-path 520ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease",
        willChange: "clip-path, opacity",
        background,
      }}
    />
  )
}
