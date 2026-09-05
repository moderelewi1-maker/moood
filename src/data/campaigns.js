// Media buying case studies — structure only; market, objective and
// execution copy live in src/i18n/translations.js under `campaigns.items`.
//
// ⚠ ILLUSTRATIVE METRICS: the ROAS / CAC / spend-scaling figures below are
// modelled, not pulled from an account. Every study therefore carries
// `illustrative: true`, which renders a disclosure tag on the card next to
// the numbers — the flag and the numbers travel together so a figure cannot
// end up on the page without the caveat that qualifies it.
//
// Replace a study's metrics with verified Ads Manager figures and drop its
// `illustrative` flag in the same edit; the audited account data lives
// separately in src/data/mediaAdsAudit.js.
export const campaigns = [
  {
    id: 'us-acquisition',
    accent: 'primary',
    illustrative: true,
    metrics: { roas: '4.2x', cac: '-38%', scale: '3.5x' },
  },
  {
    id: 'agency-recovery',
    accent: 'default',
    illustrative: true,
    metrics: { roas: '3.6x', cac: '-31%', scale: '2.0x' },
  },
  {
    id: 'local-sme',
    accent: 'default',
    illustrative: true,
    metrics: { roas: '5.1x', cac: '-27%', scale: '2.4x' },
  },
  {
    id: 'eu-pipeline',
    accent: 'default',
    illustrative: true,
    metrics: { roas: '2.8x', cac: '-22%', scale: '1.8x' },
  },
]
