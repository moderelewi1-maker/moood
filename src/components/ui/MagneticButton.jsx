import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/** Button whose contents drift toward the cursor within a small radius — desktop only. */
export default function MagneticButton({
  as: Tag = 'button',
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  function handleMouseMove(e) {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4'
  const variants = {
    primary:
      'bg-gradient-to-r from-emerald-400 to-blue-500 text-obsidian hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.6)]',
    secondary:
      'glass text-ink hover:border-emerald-400/40 hover:text-emerald-300',
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Tag className={cn(base, variants[variant], className)} {...props}>
        {children}
      </Tag>
    </motion.div>
  )
}
