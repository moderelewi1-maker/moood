import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Host for the WebGL instrument. Three.js is loaded on demand so it never
 * delays first paint; the canvas fades in once the scene has rendered.
 *
 * Normally the canvas is fixed behind the whole page and choreographed by
 * scroll. With reduced motion it becomes a single still image that belongs
 * to the hero and scrolls away with it.
 */
export default function SceneCanvas() {
  const containerRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let scene = null
    let cancelled = false

    import('./createScene.js').then(({ createScene }) => {
      if (cancelled) return
      scene = createScene({ container, reducedMotion: Boolean(reduce) })
    })

    return () => {
      cancelled = true
      scene?.dispose()
    }
  }, [reduce])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={
        reduce
          ? 'pointer-events-none absolute inset-x-0 top-0 z-0 h-svh'
          : 'pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh'
      }
    />
  )
}
