import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { POINTER_SPRING } from './config.js'

/**
 * Tilts its content toward the pointer in real perspective and sweeps a soft
 * specular highlight across it, the way a rigid plate catches light when it
 * is turned in the hand. Mouse only; touch and reduced-motion get a still card.
 */
export default function TiltCard({ children, className = '', max = 5, disabled = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, POINTER_SPRING)
  const rotateY = useSpring(0, POINTER_SPRING)
  const glare = useSpring(0, POINTER_SPRING)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const background = useMotionTemplate`radial-gradient(34rem circle at ${glareX}% ${glareY}%, rgb(236 232 224 / 0.1), transparent 62%)`

  const inactive = reduce || disabled

  function handleMove(event) {
    if (inactive || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 2 * max)
    rotateX.set((0.5 - py) * 2 * max)
    glareX.set(px * 100)
    glareY.set(py * 100)
    glare.set(1)
  }

  function handleLeave() {
    rotateX.set(0)
    rotateY.set(0)
    glare.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative ${className}`}
      style={inactive ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
    >
      {children}
      {!inactive && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background, opacity: glare }}
        />
      )}
    </motion.div>
  )
}
