// Shared motion constants, so every animation on the site moves with the
// same character: long expo ease-outs for reveals, critically damped springs
// for anything linked to scroll or the pointer (no bounce, no overshoot).

export const EASE = [0.16, 1, 0.3, 1]

/** Follows scroll progress with a little mass, so 3D layers settle rather than stop dead. */
export const SCROLL_SPRING = { stiffness: 130, damping: 28, mass: 0.45, restDelta: 0.0004 }

/** Elements arriving from depth. */
export const SETTLE_SPRING = { type: 'spring', stiffness: 68, damping: 19, mass: 1 }

/** Pointer-driven tilt. */
export const POINTER_SPRING = { stiffness: 160, damping: 20, mass: 0.6 }

/** CSS perspective distance (px) used for scroll-linked 3D. */
export const PERSPECTIVE = 1400
