// Media buying case studies — structure only; market, objective and
// execution copy live in src/i18n/translations.js under `campaigns.items`.
//
// ⚠ PLACEHOLDER METRICS: the ROAS / CAC / spend-scaling figures below are
// illustrative so the cards render with realistic shape. Replace them with
// verified numbers pulled from Ads Manager before publishing — or drop the
// `metrics` block on any study you'd rather present without numbers.
export const campaigns = [
  {
    id: 'us-acquisition',
    accent: 'primary',
    metrics: { roas: '4.2x', cac: '-38%', scale: '3.5x' },
  },
  {
    id: 'agency-recovery',
    accent: 'default',
    metrics: { roas: '3.6x', cac: '-31%', scale: '2.0x' },
  },
  {
    id: 'local-sme',
    accent: 'default',
    metrics: { roas: '5.1x', cac: '-27%', scale: '2.4x' },
  },
  {
    id: 'eu-pipeline',
    accent: 'default',
    metrics: { roas: '2.8x', cac: '-22%', scale: '1.8x' },
  },
]
