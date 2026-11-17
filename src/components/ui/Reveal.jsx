import { motion } from 'framer-motion'
import { EASE_AUTHORITY } from '../../lib/motion.js'

/** Fade + rise on scroll-into-view. Wrap any block-level content. */
export default function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', once = true, amount = 0.2 }) {
  const Component = motion[as] || motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: EASE_AUTHORITY }}
    >
      {children}
    </Component>
  )
}
