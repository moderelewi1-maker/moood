/**
 * Meta Ads account performance.
 *
 * ── PROVENANCE ───────────────────────────────────────────────────────────
 * The four figures in `totals` are the real account numbers as supplied:
 * $4,163.00 spend, 37,266,280 reach, 52,667,737 impressions, 1.41 average
 * frequency. They are internally consistent — impressions ÷ reach = 1.4133,
 * which rounds to the stated 1.41 — so they are used verbatim.
 *
 * The per-campaign `rows` are NOT account exports. Row-level data was not
 * supplied, so this is a breakdown constructed to reconcile exactly to those
 * real totals: spend, reach and impressions each sum to the stated figure
 * with no rounding drift, and each row's frequency is its own impressions ÷
 * reach. Spend and reach weights are decoupled so cost per result varies
 * across rows ($0.099–$0.125 per 1,000 reached) the way a real account does
 * rather than sitting at one flat number.
 *
 * Campaign labels are the actual brands this portfolio already shows creative
 * for — Net4Speed, Morekiting, STS, Duo Clinic, Scoop — so the rows point at
 * real work. The split between them is still constructed.
 *
 * → Replace `rows` with a genuine Ads Manager export before treating the
 *   per-campaign numbers as reportable. The totals need no change.
 *
 * ── WHY FREQUENCY, NOT ROAS ──────────────────────────────────────────────
 * $4,163 against 52.7M impressions is a $0.079 CPM. That is reach and
 * awareness buying, not conversion buying, and Ads Manager does not report a
 * return figure for it. Frequency is the column that objective actually
 * produces, so showing ROAS here would be a category error dressed as data.
 */

export const adsTotals = {
  spend: 4163.0,
  reach: 37266280,
  impressions: 52667737,
  frequency: 1.41,
}

export const adsCurrency = 'USD'

/** Objective shown per row; drives which result label is used. */
export const adsObjective = 'reach'

export const adsRows = [
  {
    id: 'net4speed-tr',
    brand: 'Net4Speed — Türkiye Expansion',
    status: 'active',
    spend: 936.68,
    reach: 9502901,
    impressions: 14444410,
    frequency: 1.52,
    costPerResult: 0.099,
  },
  {
    id: 'net4speed-ca',
    brand: 'Net4Speed — Canada Corridor',
    status: 'active',
    spend: 957.49,
    reach: 7639587,
    impressions: 10542630,
    frequency: 1.38,
    costPerResult: 0.125,
  },
  {
    id: 'morekiting',
    brand: 'Morekiting — Launch Offer',
    status: 'active',
    spend: 728.52,
    reach: 6707930,
    impressions: 9860657,
    frequency: 1.47,
    costPerResult: 0.109,
  },
  {
    id: 'sts-freight',
    brand: 'STS — Cross-Border Freight',
    status: 'completed',
    spend: 666.08,
    reach: 5403611,
    impressions: 7078730,
    frequency: 1.31,
    costPerResult: 0.123,
  },
  {
    id: 'duo-clinic',
    brand: 'Duo Clinic — Ramadan Push',
    status: 'completed',
    spend: 520.38,
    reach: 4471954,
    impressions: 6439614,
    frequency: 1.44,
    costPerResult: 0.116,
  },
  {
    id: 'scoop-retail',
    brand: 'Scoop — Retail Awareness',
    status: 'paused',
    spend: 353.85,
    reach: 3540297,
    impressions: 4301696,
    frequency: 1.22,
    costPerResult: 0.1,
  },
]
