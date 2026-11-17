import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SPRING_CURSOR } from '../../lib/motion.js'

/** Dot + trailing ring cursor. Desktop pointer devices only, skipped under reduced motion. */
export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !isCoarsePointer && !prefersReduced
  })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, SPRING_CURSOR)
  const ringY = useSpring(y, SPRING_CURSOR)

  useEffect(() => {
    if (!enabled) return undefined

    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-accent/40 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
