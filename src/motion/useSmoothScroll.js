import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Inertial scrolling. Lenis eases the native scroll position, so everything
 * that reads it — framer-motion's useScroll and the WebGL scene — inherits
 * the same momentum without extra wiring. Lenis honours
 * prefers-reduced-motion on its own and falls back to 1:1 scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      autoRaf: true,
    })
    window.__lenis = lenis

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
