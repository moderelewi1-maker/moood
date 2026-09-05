import { motion } from 'framer-motion'
import { FlaskConical, Globe2, Layers3, Target, Workflow } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { campaigns } from '../data/campaigns.js'
import { useLocale } from '../i18n/useLocale.js'
import { EASE_AUTHORITY } from '../lib/motion.js'

function Metric({ label, value, emphasis }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        dir="ltr"
        className={`font-display text-2xl font-bold tabular-nums sm:text-3xl ${
          emphasis ? 'text-accent-bright' : 'text-ink'
        }`}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">{label}</span>
    </div>
  )
}

export default function CampaignVault() {
  const { t } = useLocale()
  const copy = t.campaigns

  return (
    <section id="campaigns" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="07" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-2">
          {campaigns.map((campaign, i) => {
            const text = copy.items[campaign.id]
            const primary = campaign.accent === 'primary'
            return (
              <Reveal key={campaign.id} delay={(i % 2) * 0.08}>
                <article
                  className={`surface glow-ember-hover flex h-full flex-col gap-6 rounded-2xl p-6 sm:p-8 ${
                    primary ? 'edge-accent' : ''
                  }`}
                >
                  <header className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-bright">
                        <Globe2 className="h-3 w-3" aria-hidden="true" />
                        {copy.labels.market}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full surface px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                        <Layers3 className="h-3 w-3" aria-hidden="true" />
                        <span dir="ltr">{text.platform}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                      {text.market}
                    </h3>
                  </header>

                  <dl className="flex flex-col gap-4 border-t border-hairline pt-5">
                    <div className="flex flex-col gap-1.5">
                      <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                        <Target className="h-3 w-3 text-accent-bright" aria-hidden="true" />
                        {copy.labels.objective}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink-muted">{text.objective}</dd>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                        <Workflow className="h-3 w-3 text-accent-bright" aria-hidden="true" />
                        {copy.labels.execution}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink-muted">{text.execution}</dd>
                    </div>
                  </dl>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: EASE_AUTHORITY }}
                    className="mt-auto flex flex-col gap-4 border-t border-hairline pt-5"
                  >
                    {campaign.illustrative && (
                      <span className="mono-meta inline-flex w-fit items-center gap-1.5 rounded-sm border border-hairline px-2 py-1 text-ink-faint">
                        <FlaskConical className="h-3 w-3" aria-hidden="true" />
                        {copy.illustrative}
                      </span>
                    )}
                    <div className="grid grid-cols-3 gap-4">
                      <Metric label={copy.labels.roas} value={campaign.metrics.roas} emphasis />
                      <Metric label={copy.labels.cac} value={campaign.metrics.cac} />
                      <Metric label={copy.labels.scale} value={campaign.metrics.scale} />
                    </div>
                  </motion.div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
