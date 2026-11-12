import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../../motion/Reveal.jsx'
import { stages, standards } from '../../data/process.js'
import { useLocale } from '../../i18n/useLocale.js'
import { SCROLL_SPRING } from '../../motion/config.js'

const pad = (value) => String(value).padStart(2, '0')

/**
 * One lifecycle stage. It stays set back and dim until the progress line
 * reaches it, then comes forward — so reading order and scroll order agree.
 */
function Stage({ stage, index, count, progress, reduce }) {
  const { t, tr } = useLocale()
  const start = index / count
  const reached = useTransform(progress, [start - 0.04, start + 0.1], [0, 1], { clamp: true })
  const opacity = useTransform(reached, [0, 1], [0.32, 1])
  const z = useTransform(reached, [0, 1], [-140, 0])
  const y = useTransform(reached, [0, 1], [26, 0])
  const marker = useTransform(reached, [0, 1], [0, 1])

  return (
    <li className="relative ps-9 lg:ps-0 lg:pt-10" style={{ perspective: 900 }}>
      {/* marker on the line */}
      <span
        aria-hidden="true"
        className="absolute start-0 top-1.5 flex h-[9px] w-[9px] -translate-x-1/2 items-center justify-center rounded-full border border-line-strong bg-ground lg:-top-1 lg:translate-x-0 rtl:translate-x-1/2 lg:rtl:translate-x-0"
      >
        <motion.span className="h-full w-full rounded-full bg-accent" style={reduce ? undefined : { opacity: marker, scale: marker }} />
      </span>

      <motion.div style={reduce ? undefined : { opacity, z, y }} className="lg:pe-8">
        <p className="label text-ink-faint tabular-nums">
          <span>{t.approach.stage}</span> <span dir="ltr">{pad(index + 1)}</span>
        </p>
        <h3 className="display display-4 mt-4 text-ink">{tr(stage.title)}</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{tr(stage.text)}</p>
      </motion.div>
    </li>
  )
}

/**
 * Approach — the project lifecycle as a single governed line. The brass rule
 * is drawn by the reader's scroll and each stage activates as it is reached.
 */
export default function Approach() {
  const { t, tr } = useLocale()
  const copy = t.approach
  const trackRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.82', 'end 0.5'] })
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)

  return (
    <section id="approach" data-scene="approach" aria-labelledby="approach-title" className="relative py-24 lg:py-36">
      <div className="shell">
        <SectionHeader
          number="05"
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="approach-title"
        />

        <div ref={trackRef} className="relative mt-20 lg:mt-28">
          {/* the line: vertical on small screens, horizontal from lg */}
          <span aria-hidden="true" className="absolute inset-y-0 start-0 w-px bg-line lg:inset-x-0 lg:inset-y-auto lg:top-0 lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-px origin-top bg-accent lg:hidden"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px origin-left bg-accent lg:block rtl:origin-right"
            style={{ scaleX: reduce ? 1 : progress }}
          />

          <ol className="grid grid-cols-1 gap-y-12 lg:grid-cols-5 lg:gap-y-0">
            {stages.map((stage, i) => (
              <Stage key={stage.id} stage={stage} index={i} count={stages.length} progress={progress} reduce={reduce} />
            ))}
          </ol>
        </div>

        {/* ── Delivery standards ── */}
        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-36 lg:grid-cols-12">
          <Reveal depth={false} className="lg:col-span-3">
            <h3 className="label text-accent">{copy.standardsLabel}</h3>
          </Reveal>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3 lg:col-span-9">
            {standards.map((standard, i) => (
              <Reveal key={standard.id} delay={i * 0.1} className="flex flex-col-reverse justify-end gap-4 border-t border-line pt-6">
                <dt className="max-w-[16rem] text-[0.9375rem] leading-relaxed text-ink-muted">{tr(standard.label)}</dt>
                <dd className="display display-2 text-ink tabular-nums">
                  {/* Isolated left-to-right so "100%" and "5/5" keep their order in Arabic. */}
                  <span dir="ltr" className="inline-block">
                    {standard.value}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
