import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import RevealText from '../../motion/RevealText.jsx'
import { disciplines } from '../../data/capabilities.js'
import { useLocale } from '../../i18n/useLocale.js'
import { EASE, SCROLL_SPRING } from '../../motion/config.js'
import { scrollToHash } from '../../lib/utils.js'

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
})

export default function Hero() {
  const { t, tr } = useLocale()
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

  // As the page scrolls on, the whole statement recedes: it sinks back in
  // perspective and tips away while the next section rises over it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)
  const z = useTransform(progress, [0, 1], [0, -420])
  const y = useTransform(progress, [0, 1], [0, 140])
  const rotateX = useTransform(progress, [0, 1], [0, 12])
  const opacity = useTransform(progress, [0, 0.7], [1, 0])
  const recede = reduce ? undefined : { z, y, rotateX, opacity, transformPerspective: 1200, transformOrigin: '50% 100%' }

  return (
    <section
      ref={sectionRef}
      id="top"
      data-scene="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-x-clip"
    >
      <motion.div style={recede} className="shell flex flex-1 flex-col justify-end pt-[36svh] pb-10 lg:justify-center lg:pt-32 lg:pb-16">
        <div className="max-w-[52rem]">
          <motion.p {...rise(0.1)} className="label flex items-center gap-4 text-ink-muted">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
            <span>{t.hero.eyebrow}</span>
          </motion.p>

          <RevealText
            as="h1"
            id="hero-title"
            text={t.hero.headline}
            immediate
            delay={0.25}
            stagger={0.07}
            className="display display-1 mt-7 max-w-[7.9em] text-ink lg:mt-9"
          />

          <motion.p {...rise(0.85)} className="prose-lead mt-7 max-w-[37rem] lg:mt-9">
            {t.hero.body}
          </motion.p>

          <motion.div {...rise(1)} className="mt-9 flex flex-wrap items-center gap-3 lg:mt-11">
            <Button icon={ArrowRight} onClick={() => scrollToHash('#work')}>
              {t.hero.ctaWork}
            </Button>
            <Button variant="outline" onClick={() => scrollToHash('#contact')}>
              {t.hero.ctaContact}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div {...rise(1.25)} className="shell pb-7">
        <div className="flex items-start gap-x-12 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => scrollToHash('#work')}
            className="label group inline-flex min-h-11 shrink-0 items-center gap-3 text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent">
              <ArrowDown aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
            </span>
            {t.hero.scroll}
          </button>

          {/* The six disciplines, as a quiet index along the fold. */}
          <ul
            aria-label={t.hero.disciplinesAria}
            className="hidden flex-1 grid-cols-3 gap-x-8 gap-y-3 pt-3.5 md:grid xl:grid-cols-6"
          >
            {disciplines.map((discipline) => (
              <li key={discipline.id} className="label text-ink-faint">
                {tr(discipline.title)}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
