import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react'
import AssetImage from '../ui/AssetImage.jsx'
import CategoryMotif from './CategoryMotif.jsx'
import { contact } from '../../data/site.js'
import { getCategory, getFormat, getMedia, getMotif, getNumber, worksById } from '../../data/works/index.js'
import { useLocale } from '../../i18n/useLocale.js'
import { EASE, SETTLE_SPRING } from '../../motion/config.js'
import { cn, isRenderableImage, lockScroll, toEmbedUrl } from '../../lib/utils.js'

const FIELD_ORDER = ['objective', 'approach', 'concept', 'pacing', 'platform', 'outcome']
const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])'

const pad = (value) => String(value).padStart(2, '0')

function IconButton({ label, icon: Icon, onClick, disabled, className, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent hover:text-accent-soft disabled:pointer-events-none disabled:opacity-30',
        className,
      )}
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 rtl:-scale-x-100" />
    </button>
  )
}

/** Shown in place of media that is missing, unpublished or failed to load. */
function Unavailable({ work, note }) {
  return (
    <div className="flex h-full min-h-[16rem] w-full flex-col items-center justify-center gap-6 rounded-[2px] border border-line bg-surface p-8 text-center">
      <CategoryMotif {...getMotif(work)} className="h-40 w-52 sm:h-48 sm:w-64" />
      <p className="max-w-xs text-sm text-ink-muted">{note}</p>
    </div>
  )
}

/** One media item on the stage: image, self-hosted video, or click-to-load embed. */
function MediaStage({ item, work }) {
  const { t, tr } = useLocale()
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const title = tr(work.title)
  const vertical = item.orientation === 'vertical'
  const placeholder = <Unavailable work={work} note={t.viewer.unavailable} />
  const frame = cn(
    'max-h-full overflow-hidden rounded-[2px] border border-line bg-surface',
    vertical ? 'aspect-[9/16] h-full' : 'aspect-video w-full',
  )

  if (item.type === 'image') {
    if (!isRenderableImage(item.src) || failed) return placeholder
    return (
      <img
        src={item.src}
        alt={tr(item.alt) || title}
        onError={() => setFailed(true)}
        draggable={false}
        className="max-h-full max-w-full rounded-[2px] object-contain"
      />
    )
  }

  if (item.type === 'video') {
    if (!item.src || failed) return placeholder
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        aria-label={title}
        className={cn(frame, 'object-contain')}
      />
    )
  }

  if (item.type === 'embed') {
    if (!item.url) return placeholder
    if (playing) {
      return (
        <iframe
          src={toEmbedUrl(item.url)}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className={frame}
        />
      )
    }
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`${t.viewer.play}: ${title}`}
        className={cn(frame, 'group relative')}
      >
        <AssetImage src={item.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-ground/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-ground/60 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ground">
            <Play aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 translate-x-0.5" />
          </span>
        </span>
      </button>
    )
  }

  return placeholder
}

function Metrics({ metrics, large = false }) {
  const { t, tr } = useLocale()
  return (
    <dl className={cn('grid gap-x-6 gap-y-6', large ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2')}>
      {metrics.map((metric, i) => (
        <div key={i} className="flex flex-col-reverse justify-end gap-2 border-t border-line pt-4">
          <dt className="text-[0.8125rem] leading-snug text-ink-muted">
            {typeof metric.label === 'string' ? (t.work.metrics[metric.label] ?? metric.label) : tr(metric.label)}
          </dt>
          <dd className={cn('display tabular-nums text-ink', large ? 'display-2' : 'display-3')}>
            {/* Isolated left-to-right so "-38%" keeps its sign in front in Arabic. */}
            <span dir="ltr" className="inline-block">
              {metric.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Everything about one project. Keyed by project, so its state resets on navigation. */
function WorkRecord({ work }) {
  const { t, tr, isRTL } = useLocale()
  const media = getMedia(work)
  const [mediaIndex, setMediaIndex] = useState(0)
  const activeThumb = useRef(null)
  const category = getCategory(work)
  const title = tr(work.title)
  const hasMedia = media.length > 0
  const many = media.length > 1
  const metrics = work.metrics ?? []
  const details = FIELD_ORDER.filter((key) => work.details?.[key])

  useEffect(() => {
    if (!many) return undefined
    function onKey(event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      if (event.target instanceof HTMLVideoElement) return // leave seeking to the player
      const forward = (event.key === 'ArrowRight') !== isRTL
      setMediaIndex((current) => (current + (forward ? 1 : -1) + media.length) % media.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [many, media.length, isRTL])

  useEffect(() => {
    activeThumb.current?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [mediaIndex])

  const step = (delta) => setMediaIndex((current) => (current + delta + media.length) % media.length)

  return (
    <div
      data-lenis-prevent
      className="h-full overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_27rem] lg:overflow-hidden xl:grid-cols-[minmax(0,1fr)_30rem]"
    >
      {/* ── Stage ── */}
      <div className="flex min-h-[56svh] flex-col gap-4 p-4 sm:p-6 lg:h-full lg:min-h-0 lg:p-8">
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {hasMedia ? (
            <MediaStage key={mediaIndex} item={media[mediaIndex]} work={work} />
          ) : (
            <div className="flex h-full w-full flex-col justify-between gap-10 rounded-[2px] border border-line bg-surface p-6 sm:p-10">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <CategoryMotif {...getMotif(work)} className="h-full max-h-72 w-full max-w-md" />
              </div>
              {metrics.length > 0 && <Metrics metrics={metrics} large />}
            </div>
          )}
        </div>

        {many && (
          <div className="flex shrink-0 items-center gap-3">
            <IconButton label={t.viewer.previousAsset} icon={ArrowLeft} onClick={() => step(-1)} />
            <div data-lenis-prevent className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
              {media.map((item, i) => {
                const active = i === mediaIndex
                return (
                  <button
                    key={i}
                    ref={active ? activeThumb : undefined}
                    type="button"
                    onClick={() => setMediaIndex(i)}
                    aria-label={`${t.viewer.assetAria} ${i + 1} ${t.viewer.of} ${media.length}`}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-[2px] border transition-all duration-300',
                      active ? 'border-accent' : 'border-line opacity-55 hover:opacity-100',
                    )}
                  >
                    <AssetImage
                      src={item.type === 'image' ? item.src : item.poster}
                      alt=""
                      className="h-full w-full object-cover"
                      fallback={
                        <span
                          className={cn(
                            'label flex h-full w-full items-center justify-center bg-surface tabular-nums',
                            active ? 'text-accent' : 'text-ink-faint',
                          )}
                          dir="ltr"
                        >
                          {pad(i + 1)}
                        </span>
                      }
                    />
                  </button>
                )
              })}
            </div>
            <IconButton label={t.viewer.nextAsset} icon={ArrowRight} onClick={() => step(1)} />
          </div>
        )}
      </div>

      {/* ── Record ── */}
      <aside
        data-lenis-prevent
        className="border-t border-line p-6 pb-12 sm:p-8 lg:overflow-y-auto lg:border-s lg:border-t-0 lg:p-10"
      >
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted">
          <span className="text-accent tabular-nums" dir="ltr">
            {getNumber(work)}
          </span>
          <span>{tr(category.label)}</span>
          <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
          <span>{t.work.formats[getFormat(work)]}</span>
        </p>

        <h2 id="work-viewer-title" className="display display-3 mt-5 text-ink">
          {title}
        </h2>

        {work.summary && <p className="mt-5 leading-relaxed text-ink-muted">{tr(work.summary)}</p>}

        {work.scope?.length > 0 && (
          <div className="mt-9">
            <h3 className="label text-ink-faint">{t.work.scope}</h3>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {work.scope.map((entry, i) => (
                <li key={i} className="rounded-[2px] border border-line px-3 py-1.5 text-[0.8125rem] text-ink">
                  {tr(entry)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {details.length > 0 && (
          <dl className="mt-9 flex flex-col gap-6">
            {details.map((key) => (
              <div key={key} className="border-t border-line pt-4">
                <dt className="label text-ink-faint">{t.work.fields[key]}</dt>
                <dd className="mt-2.5 leading-relaxed text-ink">{tr(work.details[key])}</dd>
              </div>
            ))}
          </dl>
        )}

        {hasMedia && metrics.length > 0 && (
          <div className="mt-9">
            <h3 className="label mb-4 text-ink-faint">{t.work.results}</h3>
            <Metrics metrics={metrics} />
          </div>
        )}

        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(`${t.viewer.requestSubject}: ${title}`)}`}
          className="group/link mt-10 inline-flex min-h-11 items-center gap-2.5 text-sm font-medium text-ink"
        >
          <span className="link-draw pb-0.5">{t.viewer.request}</span>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="h-4 w-4 text-accent transition-transform duration-500 ease-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 rtl:-scale-x-100"
          />
        </a>
      </aside>
    </div>
  )
}

/**
 * Full-screen project viewer. A modal dialog: it locks page scroll, traps
 * focus, closes on Escape, and returns focus to whatever opened it.
 * `ids` is the list being browsed, so previous/next follow the current filter.
 */
export default function WorkViewer({ ids, index, onNavigate, onClose }) {
  const { t } = useLocale()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const work = worksById[ids[index]]

  useEffect(() => {
    const opener = document.activeElement
    const release = lockScroll()
    closeRef.current?.focus()
    return () => {
      release()
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!work) return null

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-viewer-title"
      className="fixed inset-0 z-[80] flex flex-col bg-ground/[0.97] backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="shrink-0 border-b border-line">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p className="label tabular-nums text-ink-muted" dir="ltr" aria-live="polite">
            <span className="text-ink">{pad(index + 1)}</span>
            <span className="mx-2 text-ink-faint">/</span>
            <span>{pad(ids.length)}</span>
          </p>
          <div className="flex items-center gap-2">
            <IconButton
              label={t.viewer.previousProject}
              icon={ArrowLeft}
              disabled={ids.length < 2}
              onClick={() => onNavigate((index - 1 + ids.length) % ids.length)}
            />
            <IconButton
              label={t.viewer.nextProject}
              icon={ArrowRight}
              disabled={ids.length < 2}
              onClick={() => onNavigate((index + 1) % ids.length)}
            />
            <span aria-hidden="true" className="mx-1.5 h-6 w-px bg-line" />
            <IconButton label={t.viewer.close} icon={X} onClick={onClose} buttonRef={closeRef} />
          </div>
        </div>
      </div>

      <motion.div
        key={work.id}
        className="min-h-0 flex-1"
        initial={{ opacity: 0, y: 36, rotateX: 7, transformPerspective: 1400 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ ...SETTLE_SPRING, stiffness: 90, opacity: { duration: 0.6, ease: EASE } }}
        style={{ transformOrigin: '50% 100%' }}
      >
        <WorkRecord key={work.id} work={work} />
      </motion.div>
    </motion.div>
  )
}
