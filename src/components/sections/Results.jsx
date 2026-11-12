import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import { useWorkViewer } from '../work/WorkViewerContext.js'
import Reveal from '../../motion/Reveal.jsx'
import { ADS_LEDGER_WORK_ID, adsAuditRows, adsAuditTotals, adsFindings } from '../../data/adsAudit.js'
import { useLocale } from '../../i18n/useLocale.js'

// Figures keep Western digits in both languages, matching the rest of the site.
const whole = new Intl.NumberFormat('en-US')
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const decimal = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const money = (value) => `$${decimal.format(value)}`
// Sub-cent costs need a third decimal to say anything ($0.003, not $0.00).
const cost = (value) => `$${value < 0.01 ? value.toFixed(3) : value.toFixed(2)}`

const pad = (value) => String(value).padStart(2, '0')

/** Left-to-right island, so signs, currency and separators keep their order in Arabic. */
function Figure({ children, className }) {
  return (
    <span dir="ltr" className={`inline-block tabular-nums ${className ?? ''}`}>
      {children}
    </span>
  )
}

/**
 * Verified Results — the audited Meta Ads account, presented the way a
 * finance reader expects: totals first, then the ledger they come from, then
 * what the figures do and do not show. Data and provenance notes are in
 * src/data/adsAudit.js.
 */
export default function Results() {
  const { t, tr } = useLocale()
  const { open } = useWorkViewer()
  const copy = t.results
  const hasInferred = adsAuditRows.some((row) => row.inferred)

  const totals = [
    { id: 'spend', value: `$${whole.format(adsAuditTotals.spend)}` },
    { id: 'reach', value: compact.format(adsAuditTotals.reach) },
    { id: 'impressions', value: compact.format(adsAuditTotals.impressions) },
    { id: 'frequency', value: decimal.format(adsAuditTotals.frequency) },
  ]

  return (
    <section id="results" data-scene="results" aria-labelledby="results-title" className="relative py-24 lg:py-36">
      <div className="shell">
        <SectionHeader
          number="03"
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="results-title"
        />

        {/* ── Account totals ── */}
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-28 lg:grid-cols-12">
          <Reveal depth={false} className="lg:col-span-3">
            <h3 className="label text-accent">{copy.totalsLabel}</h3>
          </Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-9 xl:grid-cols-4">
            {totals.map((total, i) => (
              <Reveal
                key={total.id}
                delay={i * 0.08}
                className="flex flex-col-reverse justify-end gap-3 border-t border-line pt-6"
              >
                <dt className="text-[0.9375rem] leading-relaxed text-ink-muted">{copy.totals[total.id]}</dt>
                <dd className="display display-3 text-ink">
                  <Figure>{total.value}</Figure>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* ── Campaign ledger ── */}
        <div className="mt-24 lg:mt-32">
          <Reveal depth={false} className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div className="max-w-2xl">
              <h3 className="label text-accent">{copy.ledgerLabel}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{copy.scopeNote}</p>
            </div>
            <p className="label text-ink-faint lg:hidden">{copy.scrollHint}</p>
          </Reveal>

          <Reveal amount={0.08} className="mt-8">
            <div className="-mx-[clamp(1.25rem,4.5vw,4rem)] overflow-x-auto px-[clamp(1.25rem,4.5vw,4rem)] lg:mx-0 lg:px-0">
              <table className="w-full min-w-[58rem] border-collapse text-start">
                <thead>
                  <tr className="border-y border-line">
                    {['campaign', 'objective', 'results', 'costPerResult', 'spend', 'reach', 'impressions', 'frequency'].map(
                      (column, i) => (
                        <th
                          key={column}
                          scope="col"
                          className={`label py-4 font-medium text-ink-faint ${i > 1 ? 'ps-4 text-end' : 'pe-4 text-start'} ${i === 0 ? 'ps-10' : ''}`}
                        >
                          {copy.columns[column]}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {adsAuditRows.map((row, i) => (
                    <tr
                      key={row.id}
                      className="border-b border-line text-[0.9375rem] transition-colors duration-300 hover:bg-surface"
                    >
                      <th scope="row" className="py-5 pe-4 text-start font-normal text-ink">
                        <span className="flex items-baseline gap-4">
                          <span className="label w-6 shrink-0 text-ink-faint tabular-nums" dir="ltr">
                            {pad(i + 1)}
                          </span>
                          <span>{tr(row.campaign)}</span>
                        </span>
                      </th>
                      <td className="py-5 pe-4 text-ink-muted">
                        {copy.objectives[row.objective]}
                        {row.inferred && (
                          <sup className="ms-0.5 text-accent" aria-hidden="true">
                            *
                          </sup>
                        )}
                      </td>
                      <td className="py-5 ps-4 text-end text-ink">
                        <Figure>{whole.format(row.results)}</Figure>
                      </td>
                      <td className="py-5 ps-4 text-end text-ink">
                        <Figure className="text-accent-soft">{cost(row.costPerResult)}</Figure>
                        {row.costBasis === 'perThousand' && (
                          <span className="block text-xs text-ink-faint">{copy.perThousand}</span>
                        )}
                      </td>
                      <td className="py-5 ps-4 text-end text-ink-muted">
                        <Figure>{money(row.spend)}</Figure>
                      </td>
                      <td className="py-5 ps-4 text-end text-ink-muted">
                        <Figure>{whole.format(row.reach)}</Figure>
                      </td>
                      <td className="py-5 ps-4 text-end text-ink-muted">
                        <Figure>{whole.format(row.impressions)}</Figure>
                      </td>
                      <td className="py-5 ps-4 text-end text-ink-muted">
                        <Figure>{decimal.format(row.frequency)}</Figure>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal depth={false} className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
            {hasInferred ? (
              <p className="max-w-xl text-xs leading-relaxed text-ink-faint">
                <span className="text-accent" aria-hidden="true">
                  *{' '}
                </span>
                {copy.inferredNote}
              </p>
            ) : (
              <span />
            )}
            <Button variant="outline" icon={ArrowUpRight} onClick={() => open(ADS_LEDGER_WORK_ID, [ADS_LEDGER_WORK_ID])}>
              {copy.inspect}
            </Button>
          </Reveal>
        </div>

        {/* ── Findings and how to read them ── */}
        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-32 lg:grid-cols-12">
          <Reveal depth={false} className="lg:col-span-3">
            <h3 className="label text-accent">{copy.findingsLabel}</h3>
          </Reveal>
          <div className="lg:col-span-9">
            <ol className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
              {adsFindings.map((finding, i) => (
                <Reveal as="li" key={finding.id} delay={(i % 2) * 0.08} className="border-t border-line pt-6">
                  <p className="label text-ink-faint tabular-nums" dir="ltr">
                    {pad(i + 1)}
                  </p>
                  <h4 className="display display-4 mt-4 text-ink">{tr(finding.title)}</h4>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{tr(finding.text)}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal depth={false} className="mt-14 border-s border-accent ps-6">
              <h4 className="label text-ink">{copy.readingLabel}</h4>
              <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">{copy.reading}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
