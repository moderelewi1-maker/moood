import { motion } from 'framer-motion'
import { adsRows, adsTotals } from '../../data/adsPerformance.js'
import { EASE_AUTHORITY } from '../../lib/motion.js'
import { useLocale } from '../../i18n/useLocale.js'

const STATUS_DOT = {
  active: 'bg-[#31C48D]',
  completed: 'bg-ink-faint',
  paused: 'bg-accent',
}

/**
 * Account view, built as a real table rather than shipped as a screenshot.
 *
 * Live markup earns its keep here: the figures stay selectable and
 * searchable, they scale to any viewport instead of pixellating, screen
 * readers get a proper header/row structure, and updating a number is a data
 * edit rather than a re-export.
 *
 * Numerals are pinned LTR and tabular in both locales. Arabic reverses the
 * column order and the text alignment, but Western digits still read
 * left-to-right inside their cell, and tabular figures are what let a column
 * of spend align on its decimal point. Getting either wrong is the tell that
 * a bilingual data table was never actually checked in RTL.
 */
export default function MetaAdsDashboard() {
  const { t, isRTL } = useLocale()
  const copy = t.ads

  const nf = new Intl.NumberFormat('en-US')
  const money = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v)
  const cpr = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(v)

  const num = 'mono-num text-end tabular-nums'

  const summary = [
    { key: 'spend', label: copy.totals.spend, value: money(adsTotals.spend) },
    { key: 'reach', label: copy.totals.reach, value: nf.format(adsTotals.reach) },
    { key: 'impressions', label: copy.totals.impressions, value: nf.format(adsTotals.impressions) },
    { key: 'frequency', label: copy.totals.frequency, value: adsTotals.frequency.toFixed(2) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE_AUTHORITY }}
      className="surface overflow-hidden rounded-sm"
    >
      {/* Console bar */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-hairline px-4 py-3">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-[#31C48D]" />
        </span>
        <span className="mono-meta text-ink-muted">{copy.title}</span>
        <span className="mono-meta ms-auto" dir="ltr">
          {adsRows.length} CAMPAIGNS
        </span>
      </div>

      {/* The table scrolls inside its own container so the page body never
          scrolls sideways on a narrow viewport. */}
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={copy.title}>
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="mono-meta whitespace-nowrap px-4 py-3 text-start font-medium">
                {copy.columns.campaign}
              </th>
              {['results', 'costPerResult', 'spend', 'frequency', 'impressions', 'reach'].map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="mono-meta whitespace-nowrap px-4 py-3 text-end font-medium"
                >
                  {copy.columns[c]}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {adsRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-hairline/60 transition-colors duration-200 hover:bg-accent/[0.04]"
              >
                <th scope="row" className="px-4 py-3.5 text-start font-normal">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[row.status]}`}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap text-ink">{row.brand}</span>
                    <span className="mono-meta whitespace-nowrap text-ink-faint">
                      {copy.status[row.status]}
                    </span>
                  </span>
                </th>

                <td className={`whitespace-nowrap px-4 py-3.5 ${num}`}>
                  <span dir="ltr">{nf.format(row.reach)}</span>
                  <span className="mono-meta ms-2 text-ink-faint">{copy.resultUnit}</span>
                </td>
                <td className={`whitespace-nowrap px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                  {cpr(row.costPerResult)}
                </td>
                <td className={`whitespace-nowrap px-4 py-3.5 font-medium text-ink ${num}`} dir="ltr">
                  {money(row.spend)}
                </td>
                <td className={`whitespace-nowrap px-4 py-3.5 text-accent ${num}`} dir="ltr">
                  {row.frequency.toFixed(2)}
                </td>
                <td className={`whitespace-nowrap px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                  {nf.format(row.impressions)}
                </td>
                <td className={`whitespace-nowrap px-4 py-3.5 text-ink-muted ${num}`} dir="ltr">
                  {nf.format(row.reach)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary. Set at display scale because these four numbers are the
          reason the table is on the page at all. */}
      <div className="border-t border-hairline-strong bg-surface-2/40 px-4 py-5 sm:px-6 sm:py-6">
        <p className="mono-meta mb-4">{copy.totalsLabel.replace('{count}', adsRows.length)}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
          {summary.map((s) => (
            <div key={s.key} className="flex flex-col gap-1.5">
              <dt className="mono-meta">{s.label}</dt>
              <dd
                className="mono-num text-xl font-semibold tabular-nums text-ink sm:text-2xl lg:text-[1.75rem]"
                dir="ltr"
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-hairline px-4 py-3 sm:px-6">
        <p className="text-[11px] leading-relaxed text-ink-faint">{copy.objectiveNote}</p>
        <p className="text-[11px] leading-relaxed text-ink-faint">{copy.provenance}</p>
        <p className="mono-meta pt-1 sm:hidden" aria-hidden="true">
          {isRTL ? '↢' : '↣'} {copy.scrollHint}
        </p>
      </div>
    </motion.div>
  )
}
