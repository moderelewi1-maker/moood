import { motion } from 'framer-motion'
import { Target, Workflow, Clapperboard, Sparkles, BarChart3, Database } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import GlassCard from './ui/GlassCard.jsx'
import { tools } from '../data/tools.js'
import { useLocale } from '../i18n/useLocale.js'
import { EASE_AUTHORITY } from '../lib/motion.js'

const ICONS = { Target, Workflow, Clapperboard, Sparkles, BarChart3, Database }

export default function OperatingSystem() {
  const { t } = useLocale()
  const copy = t.system

  return (
    <section id="system" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="07"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const Icon = ICONS[tool.icon]
            const text = copy.tools[tool.id]
            return (
              <Reveal key={tool.id} delay={(i % 3) * 0.08}>
                <GlassCard className="group flex h-full flex-col gap-4 p-6 glow-ember-hover sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/18 to-ember/10 text-accent-bright transition-transform duration-500 group-hover:scale-110">
                      {Icon && <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />}
                    </span>
                    <span className="text-end text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                      {text.role}
                    </span>
                  </div>

                  <div>
                    {/* Latin product names: the bidi algorithm renders them LTR on
                        its own, so no dir override — they stay on the reading edge. */}
                    <h3 className="font-display text-lg font-semibold text-ink">{text.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text.description}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ember to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tool.proficiency}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.1, ease: EASE_AUTHORITY, delay: 0.15 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-ink-faint">{tool.proficiency}%</span>
                  </div>
                </GlassCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
