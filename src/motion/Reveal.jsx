import { motion, useReducedMotion } from 'framer-motion'
import { EASE, SETTLE_SPRING } from './config.js'

/**
 * Brings a block in from depth the first time it enters the viewport: it
 * starts tilted back and below its resting place, then settles flat on a
 * damped spring. `depth={false}` gives a plain rise for small inline items.
 */
export default function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  depth = true,
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: depth ? 64 : 24, rotateX: depth ? 16 : 0, transformPerspective: 1100 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        ...SETTLE_SPRING,
        delay,
        opacity: { duration: 0.9, ease: EASE, delay },
      }}
      style={{ transformOrigin: '50% 100%' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
