import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import StatCounter from './ui/StatCounter.jsx'
import { narrativeMilestones, stats } from '../data/stats.js'
import { useLocale } from '../i18n/useLocale.js'

export default function Narrative() {
  const { t } = useLocale()
  const copy = t.narrative

  return (
    <section id="story" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="relative mt-16 ps-10 sm:mt-20 sm:ps-16">
          <div
            className="absolute start-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/70 via-blue-400/40 to-transparent sm:start-[23px]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-12 sm:gap-14">
            {narrativeMilestones.map((milestone, i) => (
              <Reveal key={milestone.id} delay={i * 0.08} className="relative">
                <span className="absolute -start-10 top-0 flex h-8 w-8 items-center justify-center rounded-full glass-strong font-display text-xs font-bold text-emerald-400 sm:-start-16 sm:h-11 sm:w-11 sm:text-sm">
                  {milestone.year}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {copy.milestones[milestone.id].title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {copy.milestones[milestone.id].text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:mt-24 sm:grid-cols-3 sm:gap-6">
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
