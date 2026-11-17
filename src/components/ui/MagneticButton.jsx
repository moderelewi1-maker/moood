import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import { SPRING_MAGNETIC } from '../../lib/motion.js'

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
  const springX = useSpring(x, SPRING_MAGNETIC)
  const springY = useSpring(y, SPRING_MAGNETIC)

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
      'bg-accent text-ground hover:bg-accent-bright hover:shadow-[0_20px_56px_-24px_rgba(224,154,62,0.55)]',
    secondary:
      'surface text-ink hover:border-accent/40 hover:text-accent-bright',
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
