import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Maximize2, Scan } from 'lucide-react'
import { EASE_AUTHORITY } from '../../lib/motion.js'
import { useLocale } from '../../i18n/useLocale.js'

const MIN_SCALE = 0.2
const MAX_SCALE = 8
const PAD = 48

/**
 * Full-screen inspector for a workflow schematic.
 *
 * A fitted lightbox is enough for a photograph but not for a node graph —
 * the point of these images is the small print on each node, which is
 * unreadable at fit scale. So this zooms and pans properly: wheel or pinch to
 * zoom about the pointer, drag to pan, with fit and 1:1 presets.
 *
 * Zoom is anchored to the cursor rather than the centre. The image point
 * under the pointer is computed before the scale change and the offset is
 * solved so that same point lands back under the pointer afterwards, which is
 * what makes zooming feel like moving a loupe over a sheet instead of the
 * sheet jumping away from you.
 */
export default function SchematicViewer({ item, onClose }) {
  const { t, isRTL } = useLocale()
  const copy = t.systems
  const boxRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [fit, setFit] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef(null)
  const scaleRef = useRef(1)
  const pointers = useRef(new Map())
  const pinch = useRef(null)

  const computeFit = useCallback(() => {
    const box = boxRef.current
    if (!box || !item) return 1
    const { width, height } = box.getBoundingClientRect()
    return Math.min((width - PAD) / item.width, (height - PAD) / item.height)
  }, [item])

  // Fit on open and on resize. Recomputed rather than assumed so a rotated
  // phone or a resized window never leaves the schematic cropped.
  useEffect(() => {
    if (!item) return undefined
    const apply = () => {
      const f = computeFit()
      setFit(f)
      setScale(f)
      setOffset({ x: 0, y: 0 })
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [item, computeFit])

  // Escape to close, and lock the page behind the overlay.
  useEffect(() => {
    if (!item) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setScale((s) => Math.min(s * 1.3, MAX_SCALE))
      if (e.key === '-') setScale((s) => Math.max(s / 1.3, MIN_SCALE))
      if (e.key === '0') { setScale(computeFit()); setOffset({ x: 0, y: 0 }) }
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [item, onClose, computeFit])

  /** Zoom about a point in container coordinates. */
  const zoomAt = useCallback((nextScale, px, py) => {
    const box = boxRef.current
    if (!box) return
    const r = box.getBoundingClientRect()
    const cx = r.width / 2
    const cy = r.height / 2
    setScale((current) => {
      const clamped = Math.min(Math.max(nextScale, MIN_SCALE), MAX_SCALE)
      setOffset((o) => ({
        x: px - cx - ((px - cx - o.x) * clamped) / current,
        y: py - cy - ((py - cy - o.y) * clamped) / current,
      }))
      return clamped
    })
  }, [])

  // React registers onWheel as a passive listener, so preventDefault inside a
  // synthetic wheel handler is ignored and the browser scrolls anyway. Binding
  // it natively with passive:false is the only way to own the gesture. scale is
  // read through a ref so the listener does not need rebinding on every step.
  useEffect(() => { scaleRef.current = scale }, [scale])

  useEffect(() => {
    const box = boxRef.current
    if (!item || !box) return undefined
    const onWheel = (e) => {
      e.preventDefault()
      const r = box.getBoundingClientRect()
      zoomAt(scaleRef.current * Math.exp(-e.deltaY * 0.0016), e.clientX - r.left, e.clientY - r.top)
    }
    box.addEventListener('wheel', onWheel, { passive: false })
    return () => box.removeEventListener('wheel', onWheel)
  }, [item, zoomAt])

  function handlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale }
      drag.current = null
    } else {
      drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
    }
  }

  function handlePointerMove(e) {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const r = boxRef.current.getBoundingClientRect()
      zoomAt(
        (pinch.current.scale * dist) / pinch.current.dist,
        (a.x + b.x) / 2 - r.left,
        (a.y + b.y) / 2 - r.top
      )
      return
    }
    if (drag.current) {
      setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y })
    }
  }

  function handlePointerUp(e) {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) drag.current = null
  }

  const atFit = Math.abs(scale - fit) < 0.001

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_AUTHORITY }}
          className="fixed inset-0 z-[90] flex flex-col bg-void/97"
          role="dialog"
          aria-modal="true"
          aria-label={item.title[isRTL ? 'ar' : 'en']}
        >
          {/* Console bar */}
          <div className="flex flex-none items-center gap-3 border-b border-hairline px-4 py-3 sm:px-6">
            <span className="mono-meta text-accent" dir="ltr">{item.ref}</span>
            <span className="mono-meta hidden sm:inline">{item.nodeCount} NODES</span>
            <span className="mono-meta hidden md:inline" dir="ltr">
              {Math.round(scale * 100)}%
            </span>

            <div className="ms-auto flex items-center gap-1.5">
              <button
                onClick={() => zoomAt(scale / 1.35, boxRef.current.clientWidth / 2, boxRef.current.clientHeight / 2)}
                className="surface rounded-sm p-2 text-ink-muted transition-colors duration-300 hover:text-accent"
                aria-label={copy.viewer.zoomOut}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => zoomAt(scale * 1.35, boxRef.current.clientWidth / 2, boxRef.current.clientHeight / 2)}
                className="surface rounded-sm p-2 text-ink-muted transition-colors duration-300 hover:text-accent"
                aria-label={copy.viewer.zoomIn}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => { setScale(computeFit()); setOffset({ x: 0, y: 0 }) }}
                className={`surface rounded-sm p-2 transition-colors duration-300 hover:text-accent ${
                  atFit ? 'text-accent' : 'text-ink-muted'
                }`}
                aria-label={copy.viewer.reset}
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }) }}
                className="surface rounded-sm p-2 text-ink-muted transition-colors duration-300 hover:text-accent"
                aria-label={copy.viewer.actual}
              >
                <Scan className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={onClose}
                className="surface ms-1 rounded-sm p-2 text-ink transition-colors duration-300 hover:text-accent"
                aria-label={copy.viewer.close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            ref={boxRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            /* Cursor state comes from :active rather than the drag ref —
               a ref read during render never re-renders, so the cursor would
               have been stuck on grab, and tracking it in state would cost a
               re-render on every pointer move. */
            className="relative flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
          >
            <img
              src={item.src}
              alt={item.title[isRTL ? 'ar' : 'en']}
              draggable="false"
              className="absolute left-1/2 top-1/2 max-w-none select-none"
              style={{
                width: item.width,
                height: item.height,
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                imageRendering: scale > 1.5 ? 'crisp-edges' : 'auto',
              }}
            />
          </div>

          <div className="flex-none border-t border-hairline px-4 py-2.5 text-center sm:px-6">
            <span className="mono-meta">{copy.labels.zoomHint}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
