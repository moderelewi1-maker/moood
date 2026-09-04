import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ChevronDown, MapPin, Radio } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import GlassCard from './ui/GlassCard.jsx'
import { experience } from '../data/experience.js'
import { useLocale } from '../i18n/useLocale.js'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const [openId, setOpenId] = useState(() => experience.find((e) => e.current)?.id ?? experience[0]?.id)
  const { t } = useLocale()
  const copy = t.experience

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
            ease: 'power4.out',
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
          index="02"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="relative mt-16 ps-10 sm:mt-20 sm:ps-16" style={{ perspective: '1400px' }}>
          <div
            className="absolute start-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:start-[23px]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {experience.map((item) => {
              const isOpen = openId === item.id
              const text = copy.items[item.id]
              return (
                <div key={item.id} className="timeline-card relative" style={{ transformStyle: 'preserve-3d' }}>
                  <span
                    className={`absolute -start-10 top-7 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-ground sm:-start-16 ${
                      item.current ? 'bg-accent' : 'bg-white/25'
                    }`}
                    aria-hidden="true"
                  >
                    {item.current && <span className="animate-pulse-soft absolute h-full w-full rounded-full bg-accent" />}
                  </span>

                  <GlassCard
                    as="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full p-6 text-start sm:p-7"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
                            {text.period}
                          </span>
                          {item.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-0.5 text-[10px] font-semibold text-accent-bright">
                              <Radio className="h-2.5 w-2.5" aria-hidden="true" />
                              {copy.current}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                          {text.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-ink-muted sm:text-base">{text.org}</p>
                      </div>

                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-accent-bright' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {text.location}
                      </span>
                      <span className="rounded-full surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                        {text.tag}
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                      {text.summary}
                    </p>

                    <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <ul className="flex flex-col gap-2 border-t border-hairline pt-4">
                          {text.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-start gap-2.5 text-sm text-ink-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
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
