import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { EASE_AUTHORITY } from '../../lib/motion.js'

/**
 * Overlay primitive. Every modal on the site renders through this.
 *
 * It exists because of a stacking-context trap that made the previous
 * lightboxes completely unclickable. `<main>` is `relative z-10`, which makes
 * it a stacking context, and the overlays were rendered inside it. A child
 * can never paint above its parent's stacking context, so the lightbox at
 * z-80 sat *below* the sibling `<header>` at z-50 — the navbar's full-width
 * fixed bar covered the close button and swallowed every click.
 *
 * The important part: raising the overlay's z-index does nothing. Measured
 * directly in the browser, z-9999 was still blocked by the same header,
 * because the value is only ever compared against siblings inside `main`.
 * Escaping the context is the only fix, which is what the portal does.
 *
 * Everything else here is the behaviour a modal is expected to have and
 * previously had scattered or missing: Escape to close, backdrop click to
 * dismiss, the page behind locked (Lenis included, since smooth scroll
 * ignores `overflow: hidden`), focus moved in on open and restored on close,
 * and Tab kept inside while open.
 */
export default function Modal({ open, onClose, children, label, className = '', backdropClassName = '' }) {
  const panelRef = useRef(null)
  const restoreTo = useRef(null)

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Focus trap: keep Tab cycling inside the dialog.
      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return undefined

    restoreTo.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Lenis drives scroll itself and ignores overflow:hidden, so it has to be
    // told separately or the page glides behind the overlay.
    window.__lenis?.stop()

    window.addEventListener('keydown', handleKey, true)

    // Move focus in, so Escape and Tab have somewhere to act from.
    const id = requestAnimationFrame(() => {
      const target = panelRef.current?.querySelector('button, [href], [tabindex]:not([tabindex="-1"])')
      target?.focus()
    })

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('keydown', handleKey, true)
      document.body.style.overflow = prevOverflow
      window.__lenis?.start()
      restoreTo.current?.focus?.()
    }
  }, [open, handleKey])

  if (!open) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE_AUTHORITY }}
      // z-[9999] is only meaningful because this is a direct child of <body>.
      className={`fixed inset-0 z-[9999] ${backdropClassName}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => {
        // Dismiss when the press starts on empty overlay space. That means the
        // backdrop OR the layout panel itself — the panel stretches over the
        // whole backdrop, so a press on blank area targets the panel and never
        // the backdrop, and checking only currentTarget made backdrop
        // dismissal dead. Presses on any child (image, controls, drag stage)
        // target that child and are left alone, so no stopPropagation is
        // needed anywhere.
        if (e.target === e.currentTarget || e.target === panelRef.current) onClose()
      }}
    >
      <div ref={panelRef} className={`relative h-full w-full ${className}`}>
        {children}
      </div>
    </motion.div>,
    document.body
  )
}
