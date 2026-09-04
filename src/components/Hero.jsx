import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, PlayCircle, Send, BadgeCheck, TrendingUp, Layers, User } from 'lucide-react'
import Pill from './ui/Pill.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import AssetImage from './ui/AssetImage.jsx'
import KineticText from './ui/KineticText.jsx'
import { heroBadges } from '../data/socials.js'
import { profileImage } from '../data/media.js'
import { scrollToHash } from '../lib/utils.js'
import { EASE_AUTHORITY, EASE_MECHANICAL, maskParent } from '../lib/motion.js'
import { useLocale } from '../i18n/useLocale.js'

const Canvas3D = lazy(() => import('./Canvas3D.jsx'))

const BADGE_ICONS = { BadgeCheck, TrendingUp, Layers }
// Real portrait first; the legacy placeholder names stay as fallbacks.
const heroSources = [profileImage, '/assets/modar-hero.jpg', '/assets/profile.jpg']

export default function Hero() {
  const { t } = useLocale()
  const hero = t.hero

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-ember/40 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:px-10">
        <div className="order-2 flex flex-col items-start gap-6 md:order-1">
          {/* Slate line: who and where, set as production metadata. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_AUTHORITY }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            <span className="mono-meta text-accent">{hero.name}</span>
          </motion.div>

          <motion.h1
            {...maskParent(0.045, 0.15)}
            className="hero-headline font-display text-ink"
          >
            <KineticText
              as="span"
              segments={[
                { text: hero.headline.lead },
                { text: hero.headline.highlightOne, accent: true },
                { text: hero.headline.mid },
                { text: hero.headline.highlightTwo, accent: true },
              ]}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: EASE_AUTHORITY }}
            className="flex flex-col items-start gap-6"
          >
            <p className="max-w-xl border-s border-accent/40 ps-4 text-sm font-medium leading-relaxed text-ink sm:text-base">
              {hero.title}
            </p>

            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              {heroBadges.map((badge) => (
                <Pill key={badge.id} icon={BADGE_ICONS[badge.icon]}>
                  {hero.badges[badge.id]}
                </Pill>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton variant="primary" onClick={() => scrollToHash('#design')}>
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                {hero.ctaReel}
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={() => scrollToHash('#contact')}>
                <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                {hero.ctaContact}
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* ── Portrait, framed as a plate ──────────────────────────────────
            Not a rounded avatar. A square-cornered frame with a hairline
            mount, register marks at the corners, and a mono caption rule
            beneath — the way a print is presented on a contact sheet. The
            restraint is the point: at this scale, a hard 2px corner reads as
            deliberate where a soft radius reads as default. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_MECHANICAL, delay: 0.2 }}
          className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none"
        >
          <div className="absolute -inset-12 z-0">
            <Suspense
              fallback={
                <div className="animate-pulse-soft h-full w-full rounded-full bg-ember/40 blur-2xl" aria-hidden="true" />
              }
            >
              <Canvas3D />
            </Suspense>
          </div>

          <div className="surface-raised edge-accent relative z-10 rounded-sm p-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]">
              <AssetImage
                sources={heroSources}
                alt={hero.portraitAlt}
                category="hero"
                fallbackIcon={User}
                className="h-full w-full object-cover"
                iconClassName="h-16 w-16"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground/80 via-transparent to-transparent" />

              {/* Availability, set over the scrim rather than outside the
                  frame — pinned outside it collided with the caption rule. */}
              <div className="absolute bottom-3 start-3 end-3 hidden sm:block">
                <div className="surface-raised inline-flex items-center gap-2.5 rounded-sm px-3 py-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
                  </span>
                  <span className="text-[11px] font-medium text-ink-muted">{hero.availability}</span>
                </div>
              </div>

              {/* Register marks — corner brackets, as on a framing chart. */}
              <div className="pointer-events-none absolute inset-3" aria-hidden="true">
                {[
                  'top-0 start-0 border-t border-s',
                  'top-0 end-0 border-t border-e',
                  'bottom-0 start-0 border-b border-s',
                  'bottom-0 end-0 border-b border-e',
                ].map((pos) => (
                  <span key={pos} className={`absolute h-5 w-5 border-accent/50 ${pos}`} />
                ))}
              </div>
            </div>

            {/* Caption rule, as on a slate. */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
              <span className="mono-meta" dir="ltr">MAE · 01</span>
              <span className="mono-meta" dir="ltr">4:5 · BAGHDAD, IQ</span>
            </div>
          </div>

        </motion.div>
      </div>

      <button
        onClick={() => scrollToHash('#about')}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors duration-500 hover:text-accent sm:flex"
        aria-label={hero.scrollAria}
      >
        <span className="mono-meta">{hero.scroll}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
