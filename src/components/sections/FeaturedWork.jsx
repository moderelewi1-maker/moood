import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import WorkCover from '../work/WorkCover.jsx'
import { useWorkViewer } from '../work/WorkViewerContext.js'
import TiltCard from '../../motion/TiltCard.jsx'
import Reveal from '../../motion/Reveal.jsx'
import { featuredWorks, getCategory } from '../../data/works/index.js'
import { useLocale } from '../../i18n/useLocale.js'
import { PERSPECTIVE, SCROLL_SPRING } from '../../motion/config.js'
import { clamp } from '../../lib/utils.js'

const pad = (value) => String(value).padStart(2, '0')

// Share of each project's scroll distance spent holding still before the
// camera moves on. Keeps every project readable at rest.
const DWELL = 0.24

/** Maps linear scroll to a position that lingers on each whole project. */
function linger(position) {
  const whole = Math.floor(position)
  const part = clamp((position - whole - DWELL) / (1 - 2 * DWELL))
  return whole + part * part * (3 - 2 * part)
}

/**
 * One project plate in the depth stack. `position` is the camera's place in
 * the sequence (0 = first project); `offset` is how far this plate is from it.
 *   offset > 0  still ahead: set back in space, raised toward the horizon, dimmed
 *   offset = 0  in focus: at the picture plane, full size
 *   offset < 0  passed: travels toward and beyond the viewer, fading out
 */
function Plate({ work, index, count, position, active, onOpen, label }) {
  const offset = useTransform(position, (value) => index - value)
  const z = useTransform(offset, (d) => (d >= 0 ? -d * 560 : -d * 820))
  const y = useTransform(offset, (d) => `${d >= 0 ? -d * 30 : -d * 16}%`)
  const rotateX = useTransform(offset, (d) => (d >= 0 ? 0 : d * 9))
  const opacity = useTransform(offset, (d) => (d >= 0 ? clamp(2.7 - d) : clamp(1 + d * 2.1)))
  const veil = useTransform(offset, (d) => clamp(d * 0.52, 0, 0.86))

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ z, y, rotateX, opacity, zIndex: count - index, pointerEvents: active ? 'auto' : 'none' }}
    >
      <TiltCard className="h-full w-full" max={3.5} disabled={!active}>
        <button
          type="button"
          onClick={onOpen}
          tabIndex={active ? 0 : -1}
          aria-label={label}
          className="group block h-full w-full text-start"
        >
          <WorkCover work={work} size="feature" />
        </button>
      </TiltCard>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ground" style={{ opacity: veil }} />
    </motion.div>
  )
}

/** The text for one project; cross-fades as the camera arrives and leaves. */
function Caption({ work, index, position, active, onOpen }) {
  const { t, tr } = useLocale()
  const offset = useTransform(position, (value) => index - value)
  const opacity = useTransform(offset, (d) => clamp(1 - Math.abs(d) * 2.6))
  const y = useTransform(offset, (d) => d * 48)

  return (
    <motion.article
      className="col-start-1 row-start-1 flex flex-col items-start"
      style={{ opacity, y, pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
      inert={!active}
    >
      <p className="label text-ink-muted">{tr(getCategory(work).label)}</p>
      <h3 className="display display-3 mt-4 max-w-[20ch] text-ink">{tr(work.title)}</h3>
      {work.summary && (
        <p className="mt-4 line-clamp-3 max-w-md leading-relaxed text-ink-muted sm:line-clamp-none lg:mt-5">
          {tr(work.summary)}
        </p>
      )}
      {work.scope?.length > 0 && (
        <ul className="mt-6 hidden flex-wrap gap-2 lg:flex">
          {work.scope.map((entry, i) => (
            <li key={i} className="rounded-[2px] border border-line px-3 py-1.5 text-[0.8125rem] text-ink-muted">
              {tr(entry)}
            </li>
          ))}
        </ul>
      )}
      <Button variant="outline" icon={ArrowRight} onClick={onOpen} className="mt-6 lg:mt-9">
        {t.featured.view}
      </Button>
    </motion.article>
  )
}

/**
 * Selected Work — the site's central 3D sequence.
 *
 * The section is as tall as one viewport per project and pins a stage to the
 * screen (CSS sticky, so there is no scroll-jacking). Scrolling moves a
 * virtual camera forward through a stack of project plates set in real
 * perspective: the one in focus passes the viewer, the next arrives from
 * depth. Projects come from the works registry, so the sequence grows on its
 * own as more are marked `featured`.
 */
function DepthSequence() {
  const { t, tr } = useLocale()
  const { open } = useWorkViewer()
  const trackRef = useRef(null)
  const count = featuredWorks.length
  const last = Math.max(count - 1, 1)
  const ids = featuredWorks.map((work) => work.id)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const lingering = useTransform(scrollYProgress, (value) => linger(value * (count - 1)))
  const position = useSpring(lingering, SCROLL_SPRING)
  const railScale = useTransform(position, [0, last], [1 / count, 1])

  const [active, setActive] = useState(0)
  useMotionValueEvent(position, 'change', (value) => {
    const next = clamp(Math.round(value), 0, count - 1)
    setActive((current) => (current === next ? current : next))
  })

  return (
    <div ref={trackRef} data-scene="featured" className="relative" style={{ height: `${count * 100}svh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="shell grid w-full grid-cols-1 items-center gap-x-14 gap-y-8 pt-16 lg:grid-cols-12 lg:pt-20">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="label mb-5 flex items-center gap-3 tabular-nums text-ink-muted lg:mb-8">
              <span className="sr-only">{t.featured.progressAria}</span>
              <span className="text-accent" dir="ltr">
                {pad(active + 1)}
              </span>
              <span aria-hidden="true" className="relative h-px w-16 overflow-hidden bg-line-strong">
                <motion.span
                  className="absolute inset-0 origin-left bg-accent rtl:origin-right"
                  style={{ scaleX: railScale }}
                />
              </span>
              <span dir="ltr">{pad(count)}</span>
            </p>
            <div className="grid">
              {featuredWorks.map((work, i) => (
                <Caption
                  key={work.id}
                  work={work}
                  index={i}
                  position={position}
                  active={i === active}
                  onOpen={() => open(work.id, ids)}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div
              className="relative mx-auto mt-10 h-[34svh] w-full max-w-xl sm:h-[40svh] lg:mt-12 lg:h-[58svh] lg:max-w-none"
              style={{ perspective: PERSPECTIVE }}
            >
              {featuredWorks.map((work, i) => (
                <Plate
                  key={work.id}
                  work={work}
                  index={i}
                  count={count}
                  position={position}
                  active={i === active}
                  onOpen={() => open(work.id, ids)}
                  label={`${t.featured.view}: ${tr(work.title)}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Reduced-motion version: the same projects as a plain, fully readable list. */
function StaticList() {
  const { t, tr } = useLocale()
  const { open } = useWorkViewer()
  const ids = featuredWorks.map((work) => work.id)

  return (
    <div className="shell grid grid-cols-1 gap-x-10 gap-y-14 pt-14 pb-10 md:grid-cols-2">
      {featuredWorks.map((work) => (
        <article key={work.id} className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => open(work.id, ids)}
            aria-label={`${t.featured.view}: ${tr(work.title)}`}
            className="group block aspect-[4/3] w-full text-start"
          >
            <WorkCover work={work} size="feature" />
          </button>
          <h3 className="display display-3 mt-6 text-ink">{tr(work.title)}</h3>
          {work.summary && <p className="mt-3 max-w-md leading-relaxed text-ink-muted">{tr(work.summary)}</p>}
        </article>
      ))}
    </div>
  )
}

export default function FeaturedWork() {
  const { t } = useLocale()
  const reduce = useReducedMotion()

  if (featuredWorks.length === 0) return null

  return (
    <section id="work" aria-labelledby="featured-title" className="relative">
      <div data-scene="intro" className="shell pt-24 lg:pt-36">
        <SectionHeader
          number="01"
          label={t.featured.label}
          title={t.featured.title}
          description={t.featured.description}
          id="featured-title"
        />
      </div>
      {reduce ? (
        <Reveal>
          <StaticList />
        </Reveal>
      ) : (
        <DepthSequence />
      )}
    </section>
  )
}
