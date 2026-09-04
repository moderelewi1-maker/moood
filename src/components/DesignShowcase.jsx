import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import AssetImage from './ui/AssetImage.jsx'
import Modal from './ui/Modal.jsx'
import { designItems, designCategoryKeys } from '../data/media.js'
import { useLocale } from '../i18n/useLocale.js'
import { EASE_AUTHORITY } from '../lib/motion.js'

const GALLERY_ASSETS = designItems
// Keep the first paint light: 71 assets would otherwise decode at once.
const INITIAL_COUNT = 12

export default function DesignShowcase() {
  const [active, setActive] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { t, locale } = useLocale()
  const copy = t.design

  const filtered = useMemo(
    () => (active === 'all' ? GALLERY_ASSETS : GALLERY_ASSETS.filter((a) => a.category === active)),
    [active]
  )
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
  const isOpen = lightboxIndex !== null

  const close = useCallback(() => setLightboxIndex(null), [])
  const step = useCallback(
    (delta) => {
      setLightboxIndex((current) => {
        if (current === null) return current
        const next = (current + delta + visible.length) % visible.length
        return next
      })
    },
    [visible.length]
  )

  // Escape, the scroll lock and focus handling belong to Modal now; only the
  // gallery-specific arrow navigation stays here.
  useEffect(() => {
    if (!isOpen) return undefined
    function onKey(e) {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, step])

  const activeAsset = isOpen ? visible[lightboxIndex] : null

  return (
    <section id="design" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="02" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {designCategoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActive(key)
                  setExpanded(false)
                }}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                  active === key ? 'bg-accent text-ink' : 'surface text-ink-muted hover:text-ink'
                }`}
              >
                {copy.categories[key]}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          {visible.map((asset, i) => (
            <motion.button
              key={asset.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE_AUTHORITY }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`${copy.openLightbox} — ${asset.title[locale]}`}
              className={`group relative overflow-hidden rounded-xl hairline border ${
                asset.orientation === 'portrait' ? 'row-span-2' : ''
              }`}
            >
              <AssetImage
                src={asset.src}
                alt={asset.title[locale]}
                category={asset.category}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                iconClassName="h-8 w-8"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-2 bottom-2 truncate rounded-full surface px-2.5 py-1 text-start text-[10px] font-medium text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {asset.title[locale]}
              </span>
              <span className="pointer-events-none absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full surface text-accent-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </motion.div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="surface inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:text-accent-bright sm:text-sm"
            >
              {expanded ? copy.showLess : `${copy.viewAll} (${filtered.length})`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={close}
            label={activeAsset?.title?.[locale] ?? copy.title}
            backdropClassName="bg-ground/95 backdrop-blur-xl"
            className="flex items-center justify-center"
          >
            <button
              onClick={close}
              aria-label={copy.closeLightbox}
              className="surface absolute end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent-bright"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              onClick={() => step(-1)}
              aria-label={copy.prev}
              className="surface absolute start-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent-bright sm:start-8"
            >
              <ChevronLeft className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </button>

            <button
              onClick={() => step(1)}
              aria-label={copy.next}
              className="surface absolute end-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent-bright sm:end-8"
            >
              <ChevronRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </button>

            {/* The figure is a sibling of the backdrop rather than a child of
                it, so a press landing here is simply not a press on the
                backdrop — no stopPropagation needed to keep it open. */}
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_AUTHORITY }}
              className="pointer-events-none mx-6 flex max-h-[82vh] w-full max-w-4xl flex-col items-center gap-4"
            >
              <div className="hairline pointer-events-auto w-full flex-1 overflow-hidden rounded-2xl border">
                <AssetImage
                  src={activeAsset?.src}
                  alt={activeAsset?.title?.[locale] ?? ''}
                  category={activeAsset?.category}
                  className="max-h-[70vh] w-full object-contain"
                  iconClassName="h-14 w-14"
                />
              </div>
              <figcaption className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 text-xs text-ink-muted">
                <span className="font-medium text-ink">{activeAsset?.title?.[locale]}</span>
                <span className="surface rounded-full px-3 py-1 font-semibold uppercase tracking-wide">
                  {copy.categories[activeAsset?.category]}
                </span>
                <span dir="ltr">
                  {lightboxIndex + 1} {copy.counter} {visible.length}
                </span>
              </figcaption>
            </motion.figure>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}
