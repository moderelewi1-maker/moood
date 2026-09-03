import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import StatCounter from './ui/StatCounter.jsx'
import { narrativeMilestones, stats } from '../data/stats.js'

export default function Narrative() {
  return (
    <section id="story" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The Core Narrative"
          title="From the Edit Bay to the Ad Account"
          description="The throughline from consumer psychology and direct-response editing to full-funnel acquisition and marketing operations."
        />

        <div className="relative mt-16 pl-10 sm:mt-20 sm:pl-16">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/70 via-blue-400/40 to-transparent sm:left-[23px]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-12 sm:gap-14">
            {narrativeMilestones.map((milestone, i) => (
              <Reveal key={milestone.id} delay={i * 0.08} className="relative">
                <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full glass-strong font-display text-xs font-bold text-emerald-400 sm:-left-16 sm:h-11 sm:w-11 sm:text-sm">
                  {milestone.year}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {milestone.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {milestone.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:mt-24 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCounter key={stat.id} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
