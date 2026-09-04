/**
 * Motion physics for the whole site, mirroring the curves defined in
 * index.css so CSS transitions and Framer Motion animations share one
 * vocabulary.
 *
 * The governing rule: nothing overshoots. Weight is communicated by a heavy
 * start and a long settle, never by a bounce — a spring that wobbles past
 * its target reads as playful, which is the opposite of the brief. Every
 * spring below is over-damped for that reason.
 */

/** Heavy start, decisive middle, long settle. The signature curve. */
export const EASE_MECHANICAL = [0.76, 0, 0.24, 1]
/** One-directional counterpart, for entrances that must not feel sluggish. */
export const EASE_AUTHORITY = [0.22, 1, 0.36, 1]
/** Small, fast state changes — tabs, chips, toggles. */
export const EASE_PRECISION = [0.33, 1, 0.68, 1]

/** Cursor-follow and magnetic pull. Mass above 1 is what gives the drag. */
export const SPRING_MAGNETIC = { stiffness: 150, damping: 26, mass: 1.1 }
export const SPRING_CURSOR = { stiffness: 220, damping: 30, mass: 0.8 }
/** Scroll-linked values: trails the scroll rather than tracking it exactly. */
export const SPRING_SCROLL = { stiffness: 90, damping: 30, mass: 1 }

/** Standard entrance: rise and resolve. */
export const rise = (delay = 0, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, delay, ease: EASE_AUTHORITY },
})

/**
 * Kinetic line reveal. The child rises out of a clipping box, so the text
 * appears to be pushed up from behind the layout rather than faded in.
 * Stagger is applied by the parent via `staggerChildren`.
 */
export const maskParent = (stagger = 0.07, delay = 0) => ({
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
})

/** Same reveal, triggered when the block scrolls into view. */
export const maskParentInView = (stagger = 0.05, amount = 0.4) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  },
})

export const maskChild = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 1.05, ease: EASE_MECHANICAL },
  },
}
