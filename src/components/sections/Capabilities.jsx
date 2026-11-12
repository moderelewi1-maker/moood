import { Box, Clapperboard, CodeXml, PenTool, Target, Workflow } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../../motion/Reveal.jsx'
import { disciplines, leadership } from '../../data/capabilities.js'
import { useLocale } from '../../i18n/useLocale.js'

const ICONS = { Box, Clapperboard, CodeXml, PenTool, Target, Workflow }

const pad = (value) => String(value).padStart(2, '0')

function TierHeading({ label, note }) {
  return (
    <Reveal depth={false} className="lg:col-span-3">
      <div className="lg:sticky lg:top-28">
        <h3 className="label text-accent">{label}</h3>
        <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">{note}</p>
      </div>
    </Reveal>
  )
}

/**
 * Capabilities — two tiers, in the order a hiring executive reads them:
 * first how the work is led (leadership and governance), then the functions
 * that leadership is grounded in (hands-on disciplines and their tools).
 */
export default function Capabilities() {
  const { t, tr } = useLocale()
  const copy = t.capabilities

  return (
    <section
      id="capabilities"
      data-scene="capabilities"
      aria-labelledby="capabilities-title"
      className="relative py-24 lg:py-36"
    >
      <div className="shell">
        <SectionHeader
          number="04"
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="capabilities-title"
        />

        {/* ── Tier 1: leadership & governance ── */}
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-28 lg:grid-cols-12">
          <TierHeading label={copy.leadershipLabel} note={copy.leadershipNote} />
          <ol className="lg:col-span-9">
            {leadership.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(i, 3) * 0.05}
                className="group grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-3 border-t border-line py-7 last:border-b md:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,6fr)] md:gap-x-8 md:py-9"
              >
                <span className="label pt-1.5 text-ink-faint tabular-nums transition-colors duration-300 group-hover:text-accent md:pt-2.5" dir="ltr">
                  {pad(i + 1)}
                </span>
                <h4 className="display display-4 text-ink">{tr(item.title)}</h4>
                <p className="col-start-2 leading-relaxed text-ink-muted md:col-start-3">{tr(item.text)}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ── Tier 2: functional expertise ── */}
        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-36 lg:grid-cols-12">
          <TierHeading label={copy.disciplinesLabel} note={copy.disciplinesNote} />
          <ul className="grid grid-cols-1 border-s border-t border-line sm:grid-cols-2 lg:col-span-9">
            {disciplines.map((discipline, i) => {
              const Icon = ICONS[discipline.icon]
              return (
                <Reveal
                  as="li"
                  key={discipline.id}
                  delay={(i % 2) * 0.08}
                  className="group flex flex-col border-e border-b border-line bg-ground p-7 transition-colors duration-500 hover:bg-surface sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    {Icon && <Icon aria-hidden="true" strokeWidth={1.25} className="h-7 w-7 text-accent" />}
                    <span className="label text-ink-faint tabular-nums" dir="ltr">
                      {pad(i + 1)}
                    </span>
                  </div>
                  <h4 className="display display-4 mt-8 text-ink">{tr(discipline.title)}</h4>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {discipline.items.map((entry, j) => (
                      <li key={j} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-line-strong" />
                        <span>{tr(entry)}</span>
                      </li>
                    ))}
                  </ul>
                  {discipline.tools?.length > 0 && (
                    <div className="mt-auto pt-8">
                      <p className="label text-ink-faint">{copy.tools}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {discipline.tools.map((tool) => (
                          <li
                            key={tool}
                            dir="ltr"
                            className="rounded-[2px] border border-line px-2.5 py-1 text-xs text-ink"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
