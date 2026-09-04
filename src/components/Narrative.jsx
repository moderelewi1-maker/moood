import { Camera, Scissors, TrendingUp } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import StatCounter from './ui/StatCounter.jsx'
import { phases, stats } from '../data/stats.js'
import { useLocale } from '../i18n/useLocale.js'

const PHASE_ICONS = { Camera, Scissors, TrendingUp }

export default function Narrative() {
  const { t } = useLocale()
  const copy = t.about

  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="01" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-3">
          {phases.map((phase, i) => {
            const Icon = PHASE_ICONS[phase.icon]
            const text = copy.phases[phase.id]
            return (
              <Reveal key={phase.id} delay={i * 0.1}>
                <article className="surface glow-ember-hover relative flex h-full flex-col gap-5 rounded-2xl p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-bright">
                      {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                    </span>
                    <span className="font-display text-3xl font-bold text-ink/10 sm:text-4xl">
                      {text.index}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
                      {text.label}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                      {text.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{text.text}</p>
                  </div>

                  {/* phase connector — hidden on the last card and on mobile */}
                  {i < phases.length - 1 && (
                    <span
                      className="absolute -end-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-accent/45 to-transparent lg:block"
                      aria-hidden="true"
                    />
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.id}
              value={stat.value}
              suffix={copy.stats[stat.id].suffix}
              label={copy.stats[stat.id].label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
