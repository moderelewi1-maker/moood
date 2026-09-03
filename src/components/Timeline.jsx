import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ChevronDown, MapPin, Radio } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import GlassCard from './ui/GlassCard.jsx'
import { experience } from '../data/experience.js'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const [openId, setOpenId] = useState(() => experience.find((e) => e.current)?.id ?? experience[0]?.id)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.timeline-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 64, rotateX: 14 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Proven Track Record"
          title="An Interactive Experience Timeline"
          description="Four chapters, one throughline: production instincts turned into acquisition systems. Tap any role to expand it."
        />

        <div className="relative mt-16 pl-10 sm:mt-20 sm:pl-16" style={{ perspective: '1400px' }}>
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:left-[23px]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {experience.map((item) => {
              const isOpen = openId === item.id
              return (
                <div key={item.id} className="timeline-card relative" style={{ transformStyle: 'preserve-3d' }}>
                  <span
                    className={`absolute -left-10 top-7 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-obsidian sm:-left-16 ${
                      item.current ? 'bg-emerald-400' : 'bg-white/25'
                    }`}
                    aria-hidden="true"
                  >
                    {item.current && <span className="animate-pulse-glow absolute h-full w-full rounded-full bg-emerald-400" />}
                  </span>

                  <GlassCard
                    as="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full p-6 text-left sm:p-7"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            {item.period}
                          </span>
                          {item.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                              <Radio className="h-2.5 w-2.5" aria-hidden="true" />
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-ink-muted sm:text-base">{item.org}</p>
                      </div>

                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-400 ${
                          isOpen ? 'rotate-180 text-emerald-400' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {item.location}
                      </span>
                      <span className="rounded-full glass px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                      {item.summary}
                    </p>

                    <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <ul className="flex flex-col gap-2 border-t border-white/10 pt-4">
                          {item.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-start gap-2.5 text-sm text-ink-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
