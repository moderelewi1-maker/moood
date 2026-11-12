/**
 * Meta Ads Manager audit — transcribed from the account capture at
 * /assets/gallery/meta-ads-scaling-proof.png.
 *
 * ── PROVENANCE ───────────────────────────────────────────────────────────
 * Every figure below was read off that screenshot, which is an Arabic-locale
 * Ads Manager export. Its own totals row confirms the account figures:
 * ٤,١٦٣$ = $4,163 · ٥٢,٦٦٧,٧٣٧ = 52,667,737 · ٣٧,٢٦٦,٢٨٠ = 37,266,280 ·
 * ١,٤١ = 1.41. Nothing here is constructed or illustrative.
 *
 * Two corrections were made against the supplied transcription, both
 * verified by zooming into the source cells:
 *
 *   · Row 6 spend is $10.52, not $15.52. The cell reads ١٠,٥٢$ — the second
 *     glyph is ٠ (zero, a small dot), not ٥ (five). It self-checks: $10.52
 *     over 957 link clicks is $0.011, matching the $0.01 cost per result the
 *     same row reports, where $15.52 would give $0.016 and round to $0.02.
 *
 *   · Row 9's objective is profile visits, not link clicks. Its attribution
 *     window is نقر (1 يوم) — 1-day click — which in this capture only the
 *     profile-visit rows use; every link-click and messaging row shows
 *     النقر خلال 7 يوم أو المشاهدة. The row's own result label is clipped by
 *     the bottom edge of the screenshot, so the objective is inferred from
 *     that attribution rather than read directly. Flagged as `inferred`.
 *
 * ── SCOPE ────────────────────────────────────────────────────────────────
 * These nine rows are the visible page of the account, sorted by spend
 * descending, and they sum to $121.65 — about 2.9% of the $4,163 account
 * total. They are NOT the whole account, and the summary tier is therefore
 * labelled as account-level rather than as the sum of the rows shown. That
 * is exactly how Ads Manager presents it, and claiming otherwise would
 * misstate the account by a factor of thirty.
 */

/** Objective keys map to bilingual labels in translations under `results.objectives`. */
export const adsAuditRows = [
  {
    id: 'whatsapp-offer',
    campaign: { en: 'api.whatsapp.com — Special Offer', ar: 'api.whatsapp.com — عرض خاص' },
    objective: 'linkClicks',
    results: 1911,
    costPerResult: 0.02,
    spend: 36.37,
    reach: 310942,
    impressions: 335841,
    frequency: 1.08,
  },
  {
    id: 'jood-messaging',
    campaign: { en: 'Jood Hair Dye — Single Ad', ar: 'صبغة الشعر من Jood — إعلان واحد' },
    objective: 'conversations',
    results: 181,
    costPerResult: 0.11,
    spend: 20.51,
    reach: 86065,
    impressions: 137608,
    frequency: 1.6,
  },
  {
    id: 'jood-reach',
    campaign: { en: 'Jood Hair Dye — Reach', ar: 'صبغة الشعر من Jood — الوصول' },
    objective: 'reach',
    results: 550674,
    costPerResult: 0.03,
    costBasis: 'perThousand',
    spend: 17.6,
    reach: 550674,
    impressions: 685747,
    frequency: 1.25,
  },
  {
    id: 'clean-water',
    campaign: { en: 'Clean Water — Messaging', ar: 'كلين ووتر — المحادثات' },
    objective: 'conversations',
    results: 74,
    costPerResult: 0.17,
    spend: 12.88,
    reach: 38813,
    impressions: 70284,
    frequency: 1.81,
  },
  {
    id: 'ig-profile-visits',
    campaign: { en: 'Instagram — Profile Visits', ar: 'إنستغرام — زيارات الملف' },
    objective: 'profileVisits',
    results: 4170,
    costPerResult: 0.003,
    spend: 11.84,
    reach: 129620,
    impressions: 212330,
    frequency: 1.64,
  },
  {
    id: 'jood-traffic',
    campaign: { en: 'Jood Hair Dye — Traffic', ar: 'صبغة الشعر من Jood — الزيارات' },
    objective: 'linkClicks',
    results: 957,
    costPerResult: 0.01,
    // Source cell reads ١٠,٥٢$. See the provenance note above.
    spend: 10.52,
    reach: 54931,
    impressions: 56629,
    frequency: 1.03,
  },
  {
    id: 'multipack-offers',
    campaign: { en: 'Special Multi-pack Offers', ar: 'عروض مميزة ضمن مجموعات' },
    objective: 'conversations',
    results: 93,
    costPerResult: 0.07,
    spend: 6.85,
    reach: 11494,
    impressions: 20662,
    frequency: 1.8,
  },
  {
    id: 'fb-messaging',
    campaign: { en: 'fb.com — Messaging', ar: 'fb.com — المحادثات' },
    objective: 'conversations',
    results: 39,
    costPerResult: 0.09,
    spend: 3.5,
    reach: 11737,
    impressions: 14080,
    frequency: 1.2,
  },
  {
    id: 'direct-traffic',
    campaign: { en: 'Direct Profile Traffic', ar: 'زيارات مباشرة للملف' },
    // Objective inferred from the 1-day-click attribution window; the row's
    // own result label is cut off by the capture's bottom edge.
    objective: 'profileVisits',
    inferred: true,
    results: 126,
    costPerResult: 0.01,
    spend: 1.58,
    reach: 11223,
    impressions: 11987,
    frequency: 1.07,
  },
]

/** Account-level, straight off the capture's totals row. */
export const adsAuditTotals = {
  spend: 4163.0,
  reach: 37266280,
  impressions: 52667737,
  frequency: 1.41,
}

/**
 * Findings shown beside the ledger. Every number cited is traceable to a row
 * above: the cost-per-click band to rows 1, 6 and 9, the profile-visit cost
 * to row 5, the messaging band to rows 2, 4, 7 and 8, and the frequency band
 * to the minimum and maximum across all nine.
 */
export const adsFindings = [
  {
    id: 'acquisition',
    title: { en: 'Efficient acquisition economics', ar: 'اقتصاديات اكتساب منخفضة التكلفة' },
    text: {
      en: 'Selected traffic campaigns delivered low platform-level costs: $0.01 to $0.02 per link click, and $0.003 per profile visit, in the campaigns shown.',
      ar: 'حققت حملات الزيارات تكلفة منخفضة على مستوى المنصة: من 0.01 إلى 0.02 دولار للنقرة على الرابط، و0.003 دولار لزيارة الملف الشخصي، في الحملات المعروضة.',
    },
  },
  {
    id: 'conversational',
    title: { en: 'Conversational acquisition flows', ar: 'اكتساب العملاء عبر المحادثة' },
    text: {
      en: 'Messaging campaigns generated conversations at $0.07 to $0.17 per result, with lead qualification taking place downstream, inside the conversation flow.',
      ar: 'ولّدت حملات الرسائل محادثات بتكلفة من 0.07 إلى 0.17 دولار لكل نتيجة، مع إتمام تأهيل العملاء في مرحلة لاحقة داخل مسار المحادثة.',
    },
  },
  {
    id: 'saturation',
    title: { en: 'Frequency and audience control', ar: 'ضبط التكرار والجمهور' },
    text: {
      en: 'Reported frequency stayed between 1.03 and 1.81 across the campaigns shown, limiting ad fatigue.',
      ar: 'بقي معدل التكرار بين 1.03 و1.81 في الحملات المعروضة، بما يحدّ من تشبّع الجمهور بالإعلان.',
    },
  },
  {
    id: 'scaling',
    title: { en: 'Scale of distribution', ar: 'التوزيع على نطاق واسع' },
    text: {
      en: 'The account reported a reach of 37.27 million and 52.67 million impressions across the measured campaigns.',
      ar: 'سجّل الحساب وصولاً بلغ 37.27 مليون حساب و52.67 مليون ظهور في الحملات المقيسة.',
    },
  },
]

/** The project in the works registry that holds the Ads Manager capture. */
export const ADS_LEDGER_WORK_ID = 'meta-ads-performance-ledger'
