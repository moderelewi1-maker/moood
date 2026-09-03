import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, PlayCircle, Send, BadgeCheck, TrendingUp, Layers, User } from 'lucide-react'
import Pill from './ui/Pill.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import AssetImage from './ui/AssetImage.jsx'
import { heroBadges } from '../data/socials.js'
import { portfolioAssets } from '../data/portfolioAssets.js'
import { scrollToHash } from '../lib/utils.js'
import { useLocale } from '../i18n/useLocale.js'

const Canvas3D = lazy(() => import('./Canvas3D.jsx'))

const BADGE_ICONS = { BadgeCheck, TrendingUp, Layers }
const heroAsset = portfolioAssets.find((a) => a.category === 'hero')
// Tries the mapped portfolio asset first, then either local placeholder filename.
const heroSources = [heroAsset?.url, '/assets/modar-hero.jpg', '/assets/profile.jpg']

export default function Hero() {
  const { t } = useLocale()
  const hero = t.hero

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-7 order-2 md:order-1"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            {hero.name}
          </span>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {hero.headline.lead}
            <span className="text-gradient">{hero.headline.highlightOne}</span>
            {hero.headline.mid}
            <span className="text-gradient">{hero.headline.highlightTwo}</span>
          </h1>

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

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <MagneticButton variant="primary" onClick={() => scrollToHash('#work')}>
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              {hero.ctaReel}
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollToHash('#contact')}>
              <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              {hero.ctaContact}
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative order-1 mx-auto aspect-[4/5] w-full max-w-sm md:order-2 md:max-w-none"
        >
          <div className="absolute -inset-10 z-0">
            <Suspense fallback={<div className="animate-pulse-glow h-full w-full rounded-full bg-emerald-500/10 blur-2xl" aria-hidden="true" />}>
              <Canvas3D />
            </Suspense>
          </div>

          <div className="glass-strong glow-emerald relative z-10 h-full w-full overflow-hidden rounded-[2rem] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
              <AssetImage
                sources={heroSources}
                alt={hero.portraitAlt}
                category="hero"
                fallbackIcon={User}
                className="h-full w-full object-cover"
                iconClassName="h-16 w-16"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
            </div>
          </div>

          <div className="animate-float absolute -bottom-5 -start-5 z-20 hidden rounded-2xl sm:block">
            <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-pulse-glow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-ink-muted">{hero.availability}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => scrollToHash('#story')}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-emerald-400 sm:flex"
        aria-label={hero.scrollAria}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">{hero.scroll}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
