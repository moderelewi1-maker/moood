import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, CircuitBoard } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import SchematicViewer from './ui/SchematicViewer.jsx'
import MetaAdsDashboard from './ui/MetaAdsDashboard.jsx'
import { automationItems } from '../data/automation.js'
import { EASE_AUTHORITY } from '../lib/motion.js'
import { useLocale } from '../i18n/useLocale.js'

/**
 * Systems & AI Architecture.
 *
 * Sits between the media work and the campaign studies: the creative proves
 * the output, this proves the infrastructure underneath it, and the campaigns
 * then show what both produced.
 *
 * The two schematics are light-background n8n exports dropped onto a near
 * black page. Rather than inverting them — which would falsify a technical
 * document and wreck the legibility of its small print — each sits behind a
 * dark bezel as an instrument screen, dimmed slightly at rest so it does not
 * glare against the ground, and returned to full brightness on hover and in
 * the inspector where legibility is the whole point.
 */
export default function SystemsArchitecture() {
  const { t, locale } = useLocale()
  const copy = t.systems
  const [active, setActive] = useState(null)
  const hasTarget = automationItems.some((i) => i.metrics.some((m) => m.kind === 'target'))

  const val = (v) => (typeof v === 'string' ? v : v[locale])

  return (
    <section id="systems" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="05"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {automationItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_AUTHORITY }}
              className="surface glow-ember-hover flex flex-col rounded-sm"
            >
              {/* Console bar */}
              <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
                <CircuitBoard className="h-3.5 w-3.5 shrink-0 text-cobalt" aria-hidden="true" />
                <span className="mono-meta text-cobalt" dir="ltr">{item.ref}</span>
                <span className="mono-meta ms-auto" dir="ltr">
                  {item.nodeCount} {copy.labels.nodes}
                </span>
              </div>

              {/* Screen */}
              <button
                onClick={() => setActive(item)}
                className="group/screen relative block w-full overflow-hidden border-b border-hairline bg-void p-3 text-start"
                aria-label={`${copy.labels.inspect} — ${item.title[locale]}`}
              >
                <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[2px] bg-[#eceef1]">
                  <img
                    src={item.src}
                    alt={item.title[locale]}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain opacity-85 transition-opacity duration-500 group-hover/screen:opacity-100"
                  />
                </div>

                <span className="pointer-events-none absolute inset-3 rounded-[2px] ring-1 ring-inset ring-cobalt/25" aria-hidden="true" />

                <span className="surface absolute bottom-5 end-5 flex items-center gap-2 rounded-sm px-3 py-2 opacity-0 transition-opacity duration-500 group-hover/screen:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5 text-cobalt" aria-hidden="true" />
                  <span className="mono-meta text-ink">{copy.labels.inspect}</span>
                </span>
              </button>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  {item.title[locale]}
                </h3>

                <p className="text-sm leading-relaxed text-ink-muted">{item.narrative[locale]}</p>

                {/* Metrics */}
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-hairline py-4">
                  {item.metrics.map((m) => (
                    <div key={m.label.en} className="flex flex-col gap-1">
                      <dt className="mono-meta">{m.label[locale]}</dt>
                      <dd
                        className={`text-sm font-medium ${
                          m.kind === 'target' ? 'text-ink-faint' : 'text-cobalt'
                        }`}
                      >
                        <span dir={typeof m.value === 'string' ? 'ltr' : undefined}>{val(m.value)}</span>
                        {m.kind === 'target' && <sup className="ms-0.5 text-ink-faint">†</sup>}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Stack */}
                <div className="mt-auto flex flex-col gap-2.5">
                  <span className="mono-meta">{copy.labels.stack}</span>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        dir="ltr"
                        className="rounded-sm border border-hairline bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] leading-none text-ink-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6">
          <MetaAdsDashboard />
        </div>

        {hasTarget && (
          <p className="mt-5 text-xs text-ink-faint">
            <span className="me-1">†</span>
            {copy.labels.targetNote}
          </p>
        )}
      </div>

      <SchematicViewer item={active} onClose={() => setActive(null)} />
    </section>
  )
}
