import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './config.js'

/**
 * Headline reveal: each word rises out of its own clipping mask in sequence.
 * Splitting is by word, never by letter, so Arabic letter-joining is intact.
 * Screen readers get the sentence once through aria-label.
 *
 * `immediate` plays on mount (hero); otherwise it plays on first view. The
 * in-view check is made on the heading itself — the words start outside
 * their masks, so they could never report themselves as visible.
 */
export default function RevealText({
  as = 'h2',
  text,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {text}
      </Tag>
    )
  }

  const words = String(text).split(' ')
  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, amount: 0.4 } }

  return (
    <Tag className={className} aria-label={text} initial="hidden" {...trigger} {...rest}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {/* The padding/negative-margin pair gives descenders and Arabic
              marks room inside the mask without changing the line box. */}
          <span className="-my-[0.22em] inline-block overflow-hidden py-[0.22em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '118%' },
                shown: { y: '0%', transition: { duration: 1.05, ease: EASE, delay: delay + i * stagger } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
