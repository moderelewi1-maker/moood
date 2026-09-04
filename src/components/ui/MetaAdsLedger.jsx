import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, TrendingDown, MessagesSquare, Gauge, Radio } from 'lucide-react'
import SchematicViewer from './SchematicViewer.jsx'
import { adsProof, adsAuditRows, adsAuditTotals, auditFindings } from '../../data/mediaAdsAudit.js'
import { EASE_AUTHORITY } from '../../lib/motion.js'
import { useLocale } from '../../i18n/useLocale.js'

const FINDING_ICONS = {
  acquisition: TrendingDown,
  conversational: MessagesSquare,
  saturation: Gauge,
  scaling: Radio,
}

/**
 * Meta Ads audit — the account capture, the transcribed rows, and the read-out.
 *
 * The screenshot and the table are both present on purpose. The table is what
 * makes the numbers selectable, searchable, legible at any width and readable
 * to a screen reader; the screenshot is the provenance, one click away, so a
 * client can check the transcription against the source rather than taking it
 * on trust. Neither substitutes for the other.
 *
 * Numerals are pinned LTR and tabular in both locales: Arabic mirrors the
 * column order and alignment, but Western digits still read left to right
 * inside their cell and tabular figures are what let a spend column align on
 * its decimal point.
 */
export default function MetaAdsLedger() {
  const { t, locale, isRTL } = useLocale()
  const copy = t.audit
  const [inspecting, setInspecting] = useState(null)

  const nf = new Intl.NumberFormat('en-US')
  const usd = (v, min = 2) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: min,
      maximumFractionDigits: min,
    }).format(v)
  // $0.003 needs three places; $36.37 needs two. Format to the precision the
  // source actually reports rather than padding every cell to one width.
  const cpr = (v) => usd(v, v < 0.01 ? 3 : 2)

  const num = 'mono-num text-end tabular-nums whitespace-nowrap'

  const totals = [
    { key: 'spend', label: copy.totals.spend, value: usd(adsAuditTotals.spend) },
    { key: 'reach', label: copy.totals.reach, value: nf.format(adsAuditTotals.reach), unit: copy.reachUnit },
    { key: 'impressions', label: copy.totals.impressions, value: nf.format(adsAuditTotals.impressions) },
    { key: 'frequency', label: copy.totals.frequency, value: adsAuditTotals.frequency.toFixed(2) },
  ]

  const open = () => setInspecting({ ...adsProof, title: adsProof.title })

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: EASE_AUTHORITY }}
        className="surface relative overflow-hidden rounded-sm"
      >
        {/* Ambient amber wash, clipped by the card and kept off pointer events. */}
        <div
          className="pointer-events-none absolute -top-32 end-0 h-64 w-64 rounded-full bg-accent/[0.07] blur-[90px]"
          aria-hidden="true"
        />

        {/* Telemetry bar */}
        <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-hairline px-4 py-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-[#34D399]" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#34D399]/40 blur-[3px]" />
          </span>
          <span className="mono-meta text-ink-muted">{copy.beacon}</span>

          <button
            onClick={open}
            className="mono-meta ms-auto inline-flex items-center gap-2 rounded-sm border border-hairline px-3 py-1.5 text-ink-muted transition-colors duration-300 hover:border-hairline-accent hover:text-accent"
          >
            <Maximize2 className="h-3 w-3" aria-hidden="true" />
            {copy.inspect}
          </button>
        </div>

        {/* Proof plate — the capture itself, click to inspect at full resolution. */}
        <button
          onClick={open}
          className="group/plate relative block w-full border-b border-hairline bg-void p-3 text-start"
          aria-label={`${copy.inspect} — ${adsProof.title[locale]}`}
        >
          <div className="relative w-full overflow-hidden rounded-[2px] bg-[#eceef1]">
            <img
              src={adsProof.src}
              alt={adsProof.title[locale]}
              width={adsProof.width}
              height={adsProof.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full opacity-[0.88] transition-opacity duration-500 group-hover/plate:opacity-100"
            />
          </div>
          <span
            className="pointer-events-none absolute inset-3 rounded-[2px] ring-1 ring-inset ring-hairline-accent"
            aria-hidden="true"
          />
          <span className="mono-meta mt-2.5 block text-ink-faint">{copy.inspectHint}</span>
        </button>

        {/* Transcribed rows */}
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={copy.title}>
          <table className="w-full min-w-[62rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="mono-meta whitespace-nowrap px-4 py-3 text-start font-medium">
                  {copy.columns.campaign}
                </th>
                <th scope="col" className="mono-meta whitespace-nowrap px-4 py-3 text-start font-medium">
                  {copy.columns.objective}
                </th>
                {['results', 'costPerResult', 'spend', 'reach', 'impressions', 'frequency'].map((c) => (
                  <th key={c} scope="col" className="mono-meta whitespace-nowrap px-4 py-3 text-end font-medium">
                    {copy.columns[c]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {adsAuditRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-hairline/60 transition-colors duration-200 hover:bg-accent/[0.04]"
                >
                  <th scope="row" className="whitespace-nowrap px-4 py-3.5 text-start font-normal text-ink">
                    {row.campaign[locale]}
                  </th>
                  <td className="whitespace-nowrap px-4 py-3.5 text-start text-ink-muted">
                    {copy.objectives[row.objective]}
                    {row.inferred && (
                      <sup className="ms-1 text-ink-faint" title={copy.inferredNote}>
                        *
                      </sup>
                    )}
                  </td>
                  <td className={`px-4 py-3.5 ${num}`}>
                    <span dir="ltr" className="text-ink">{nf.format(row.results)}</span>
                    <span className="mono-meta ms-2 text-ink-faint">{copy.units[row.objective]}</span>
                  </td>
                  <td className={`px-4 py-3.5 text-accent ${num}`}>
                    <span dir="ltr">{cpr(row.costPerResult)}</span>
                    {row.costBasis === 'perThousand' && (
                      <span className="mono-meta ms-2 text-ink-faint">{copy.units.perThousand}</span>
                    )}
                  </td>
                  <td className={`px-4 py-3.5 font-medium text-ink ${num}`} dir="ltr">
                    {usd(row.spend)}
                  </td>
                  <td className={`px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                    {nf.format(row.reach)}
                  </td>
                  <td className={`px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                    {nf.format(row.impressions)}
                  </td>
                  <td className={`px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                    {row.frequency.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Account totals. Labelled account-level because the nine rows above
            are a page of the account, not all of it. */}
        <div className="border-t border-hairline-strong bg-surface-2/40 px-4 py-5 sm:px-6 sm:py-6">
          <p className="mono-meta mb-4 text-accent">{copy.totalsLabel}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
            {totals.map((row) => (
              <div key={row.key} className="flex flex-col gap-1.5">
                <dt className="mono-meta">{row.label}</dt>
                <dd
                  className="mono-num text-xl font-semibold tabular-nums text-ink sm:text-2xl lg:text-[1.75rem]"
                  dir="ltr"
                >
                  {row.value}
                </dd>
                {row.unit && <span className="mono-meta text-ink-faint">{row.unit}</span>}
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-hairline px-4 py-3 sm:px-6">
          <p className="text-[11px] leading-relaxed text-ink-faint">{copy.scopeNote}</p>
          <p className="text-[11px] leading-relaxed text-ink-faint">
            <span className="me-1">*</span>
            {copy.inferredNote}
          </p>
          <p className="mono-meta pt-1 sm:hidden" aria-hidden="true">
            {isRTL ? '↢' : '↣'} {copy.scrollHint}
          </p>
        </div>
      </motion.div>

      {/* How to read the figures. Placed before the competency read-out
          because sub-cent costs invite disbelief, and the answer is what
          objective produced them and where the conversion actually happens —
          not a louder claim. */}
      <div className="surface rounded-sm border-s-2 border-s-accent/50 p-5 sm:p-6">
        <h3 className="mono-meta mb-2.5 text-accent">{copy.contextTitle}</h3>
        <p className="max-w-4xl text-sm leading-relaxed text-ink-muted">{copy.context}</p>
      </div>

      {/* Read-out */}
      <div>
        <h3 className="mono-meta mb-4 text-accent">{copy.findingsTitle}</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {auditFindings.map((key, i) => {
            const Icon = FINDING_ICONS[key]
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: EASE_AUTHORITY }}
                className="surface glow-ember-hover flex gap-4 rounded-sm p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-hairline text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-display text-sm font-semibold leading-snug text-ink">
                    {copy.findings[key].title}
                  </h4>
                  <p className="text-sm leading-relaxed text-ink-muted">{copy.findings[key].body}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <SchematicViewer item={inspecting} onClose={() => setInspecting(null)} />
    </div>
  )
}
