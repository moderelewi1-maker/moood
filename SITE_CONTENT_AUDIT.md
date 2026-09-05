# Site Content Audit

Generated from the source of truth — `src/i18n/translations.js`, `src/data/*.js` and `src/App.jsx` — not transcribed by hand. Regenerate after any content change.

**Commit at generation:** `6dd445e` · **Locales:** en, ar · **Translation keys:** 248 per locale, at full parity

---

## 1. Architecture & Visual Flow

Section order as rendered in `App.jsx`:

1. **Hero**
2. **VideoShowcase**
3. **DesignShowcase**
4. **SystemsArchitecture**
5. **PerformanceAudit**
6. **Narrative**
7. **Timeline**
8. **CampaignVault**
9. **OperatingSystem**
10. **Contact**

Fixed chrome outside `<main>`: `ScrollStoryCanvas` (background), `CustomCursor`, `Navbar`, `Footer`, `SoundToggle`.

Navigation order:

| # | Anchor | English | العربية |
| --- | --- | --- | --- |
| 1 | `#top` | Home | الرئيسية |
| 2 | `#video` | Video | الفيديو |
| 3 | `#design` | Design | التصاميم |
| 4 | `#systems` | Systems | الأنظمة |
| 5 | `#ads` | Performance | الأداء |
| 6 | `#about` | Experience | عن الخبرة |
| 7 | `#campaigns` | Campaigns | الحملات |
| 8 | `#system` | Stack | الأدوات |
| 9 | `#contact` | Contact | تواصل معي |

---

## 2. Bilingual Content Catalog

### 2.1 Hero & Executive Metadata

| Field | English | العربية |
| --- | --- | --- |
| Page title | Modar Akram Elewi — Digital Marketing & Growth | مضر أكرم عليوي — التسويق الرقمي والنمو |
| Name | Modar Akram Elewi | مضر أكرم عليوي |
| Headline (lead) | Where  | حيث تلتقي  |
| Headline (accent 1) | performance data | بيانات الأداء |
| Headline (mid) |  meets  |  |
| Headline (accent 2) | creative execution. | بالتنفيذ الإبداعي. |
| Role line | Digital Marketing & Growth Manager \| Paid Media & Visual Creative Systems | مدير التسويق الرقمي والنمو \| متخصص في الإعلام المدفوع والإنتاج المرئي |
| Subtitle | I build paid acquisition systems, scale Meta campaigns, produce performance-driven creative, and automate the operations behind growth. | أبني أنظمة الاستحواذ المدفوعة، وأوسّع حملات Meta، وأنتج محتوى موجهاً للأداء، وأؤتمت العمليات التي تدعم النمو. |
| Badge · meta | Meta Blueprint Credentialed | حاصل على اعتماد Meta Blueprint |
| Badge · roas | ROAS Optimization | تحسين العائد على الإنفاق (ROAS) |
| Badge · funnel | Full-Funnel Acquisition | إدارة مسارات التحويل الكاملة |
| CTA primary | View Work | استعرض الأعمال |
| CTA secondary | Discuss a Growth Opportunity | ناقش فرصة نمو |
| Availability | Open to growth roles & partnerships | متاح لفرص النمو والشراكات |
| Scroll cue | Explore | استكشف |
| Portrait alt | Portrait of Modar Akram Elewi | صورة مضر أكرم عليوي |

Static plate metadata (deliberately Latin in both locales): `MAE · 01`, `4:5 · BAGHDAD, IQ`.

### 2.2 Canvas Story Scenes

Drawn to `<canvas>` in `ScrollStoryCanvas.jsx`, not sourced from translations.

| Phase | Scroll range | Motifs | On-canvas label |
| --- | --- | --- | --- |
| Aperture Iris | 0.00 – 0.34 | Nine-blade iris stopping down, f-stop barrel ticks, viewfinder reticle, corner framing brackets, anamorphic flare tracking scroll momentum | `SCENE 01 — PRODUCTION`, `f/1.4–7.6 · 24 FPS · ISO 800`, `REC` |
| NLE Timeline | 0.34 – 0.66 | Timecode ruler with frame ticks, four lanes whose clips slide into place, keyframe diamonds, audio waveform, razor guides, sweeping playhead | `SCENE 02 — POST-PRODUCTION`, `TC 00:MM:SS:FF`, `CUT · RIPPLE · ROLL` |
| Growth Matrix | 0.66 – 1.00 | Data matrix with resolving cells, logarithmic growth vector against a flat baseline, telemetry nodes | `SCENE 03 — SCALING & MEDIA BUYING`, `SPEND`, `RETURN`, `REACH / CPA ↓ / ROAS ↑ / SCALE` |

> **Note:** canvas labels are English-only in both locales. They are instrument-slate metadata rather than reading content, and mirroring them would misrepresent the tools they depict. Flagged in §4 for your decision.

### 2.3 Featured Video Showcase

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Creative Direction & Video Production | الإخراج والإنتاج البصري |
| Title | Shot for Attention, Cut for Retention | نصوّر لجذب الانتباه، ونمنتج للحفاظ عليه. |
| Description | Landscape commercials and long-form retention edits alongside vertical direct-response hooks built for the feed. | إعلانات أفقية ومحتوى مصمم لتعزيز المشاهدة، إلى جانب افتتاحيات عمودية مهيأة للاستجابة المباشرة داخل المنصات. |

**Format filters:** `All Formats` / `كل الصيغ` · `Landscape 16:9` / `أفقي 16:9` · `Vertical 9:16` / `عمودي 9:16`

| # | Title (EN) | العنوان (AR) | Orientation | Duration | Silent |
| --- | --- | --- | --- | --- | --- |
| 1 | Cinematic Production Reel | عرض الإنتاج المرئي | vertical | 0:26 | **yes — forced** |
| 2 | Adidas Brand Explainer | إعلان تعريفي — أديداس | vertical | 0:15 | no |
| 3 | Marketing Services Explainer | فيديو تعريفي بخدمات التسويق | vertical | 0:30 | no |
| 4 | Animated Follow CTA | دعوة متحركة للمتابعة | vertical | 0:22 | no |
| 5 | Motion Graphics Showcase | عرض الموشن غرافيك | landscape | 0:10 | no |

| # | Hook (EN) | الخطّاف (AR) |
| --- | --- | --- |
| 1 | Opens on the work, not the pitch. | يبدأ بالمشهد، لا بالكلام عنه. |
| 2 | The origin story lands in the first frame. | تبدأ القصة من اللقطة الأولى. |
| 3 | Lead with the problem, then the offer. | نبدأ بالمشكلة قبل تقديم الحل. |
| 4 | The silhouette drives the loop. | حركة الظل تبني الحلقة البصرية. |
| 5 | Typography reveals on the beat. | ظهور النصوص منسجم مع الإيقاع. |

| # | Pacing (EN) | الإيقاع (AR) | Style tag (EN) | الأسلوب (AR) |
| --- | --- | --- | --- | --- |
| 1 | Cinematic · kinetic caption cuts | سينمائي · قطعات مع نصوص حركية | Performance Edit | مونتاج موجه للأداء |
| 2 | Snap · product-led motion | سريع · حركة يقودها المنتج | Product-Led Motion | حركة يقودها المنتج |
| 3 | Measured · typographic build | متزن · بناء طباعي | Typographic Build | بناء طباعي متزن |
| 4 | Loop · minimal silhouette animation | متكرر · أنيميشن ظلّي بسيط | Loop Architecture | بنية تكرار بصرية |
| 5 | Dense · After Effects composite | مكثّف · تركيب في أفتر إفكتس | Brand-Focused Motion | رسوم متحركة للعلامة |

**Cinema modal labels:** Play / تشغيل · Pause / إيقاف مؤقت · Mute / كتم الصوت · Unmute / تشغيل الصوت · Volume / مستوى الصوت · Seek / التنقل · Full screen / ملء الشاشة · Exit full screen / إنهاء ملء الشاشة · Close / إغلاق · Muted by default / يبدأ بلا صوت · Space to play · M to mute · Esc to close / مسافة للتشغيل · M للكتم · Esc للإغلاق

### 2.4 Design & Visual Identity Gallery

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Design Gallery | معرض التصميم |
| Title | Design Systems & Visual Identity | التصميم والهوية البصرية |
| Description | Ad banners, brand systems, and performance creative — filter by track, click any tile to inspect full screen. | لافتات إعلانية، وأنظمة هوية، وإبداعات مصممة للأداء — اختر الفئة واضغط أي عمل لعرضه بالحجم الكامل. |

**Category filters:**

| Key | English | العربية | Assets |
| --- | --- | --- | --- |
| `all` | All Work | جميع الأعمال | 71 |
| `packshot` | Product Photography | تصوير المنتجات | 54 |
| `direct-response` | Direct Response | الاستجابة المباشرة | 7 |
| `brand` | Brand Identity | الهوية والعلامة التجارية | 6 |
| `logistics` | Logistics | الخدمات اللوجستية | 4 |

**Total assets:** 71 · initial render 12, expands to all 71.

Sample titles (first 8 of 71):

| Asset | English | العربية | Category |
| --- | --- | --- | --- |
| `packshot-amber-resin-bowl` | Amber Resin Bowl | وعاء الراتنج الكهرماني | packshot |
| `packshot-amber-resin-linen` | Amber Resin on Linen | راتنج كهرماني على الكتان | packshot |
| `packshot-apothecary-blend` | Apothecary Herb Blend | خلطة أعشاب العطارة | packshot |
| `packshot-apothecary-shelf` | Apothecary Shelf Still Life | رفوف العطارة | packshot |
| `campaign-dr-yamen-eid` | Dr. Yamen Alzeidan — Eid Greeting | د. يامن الزيدان — تهنئة العيد | direct-response |
| `packshot-frankincense-bowl` | Frankincense Bowl | وعاء اللبان | packshot |
| `brand-elewi-identity-system` | ELEWI Brand Identity System | نظام الهوية البصرية ELEWI | brand |
| `packshot-frankincense-scale` | Frankincense on Apothecary Scale | لبان على ميزان العطار | packshot |

### 2.5 Systems & AI Automation

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Systems & Automation | الأنظمة والأتمتة |
| Title | Systems & AI Automation Architecture | هندسة الأنظمة والذكاء الاصطناعي |
| Description | Designing autonomous agents, real-time CRM synchronizations, and custom conversational funnels. | تصميم وكلاء ذكيين، ومزامنة شبه فورية لبيانات العملاء، ومسارات محادثة مخصصة. |

**SYS-01 — Autonomous Lead Qualification Agent / وكيل ذكي لتأهيل العملاء المحتملين**

| Field | English | العربية |
| --- | --- | --- |
| Narrative | Inbound enquiries used to wait for someone to be awake. A webhook now hands each one straight to an agent that reads it, decides whether it qualifies, writes the record to the CRM sheet, and answers on WhatsApp — with the email branch reserved for the cases that warrant one. | كانت الاستفسارات الواردة تنتظر ردّاً بشرياً. الآن يستقبلها Webhook ويمرّرها مباشرة إلى وكيل يقرأها، ويقرّر ما إذا كانت مؤهّلة، ويكتب السجل في جدول العملاء، ثم يردّ عبر واتساب — مع إبقاء مسار البريد للحالات التي تستدعيه. |
| Metric · arch | Nodes: 8 | العقد: 8 |
| Metric · arch | Trigger: Webhook · 24/7 | المُشغِّل: Webhook · 24/7 |
| Metric · arch | CRM write: Sheets append | الكتابة للـCRM: إضافة صف |
| Metric · target | Response target: < 2s | زمن الاستجابة المستهدف: < 2s |

**Stack (6):** n8n Core · Webhook · OpenAI API · Google Sheets API · UltraMsg WhatsApp · Gmail

**Nodes (8):** Webhook · AI Agent · OpenAI Chat Model · Simple Memory · Append row in sheet · HTTP Request · If · Send a message

**SYS-02 — Relational Conversation Pipeline / خط معالجة المحادثات الاعتمادي**

| Field | English | العربية |
| --- | --- | --- |
| Narrative | The same idea at production scale. Four SQL stages resolve who the contact is and what has already been said to them before the agent replies, and conversation state persists in Postgres rather than in memory — so a thread survives a restart, and a returning contact is not greeted as a stranger. A code node extracts the address the reply routes to. | الفكرة نفسها على نطاق إنتاجي. أربع مراحل SQL تحدّد هوية جهة الاتصال وما سبق أن قيل لها قبل أن يردّ الوكيل، وحالة المحادثة محفوظة في Postgres لا في الذاكرة المؤقتة — فتبقى المحادثة قائمة بعد إعادة التشغيل، ولا يُستقبل العميل العائد كأنه جديد. وتستخرج عقدة برمجية العنوان الذي يُوجَّه إليه الرد. |
| Metric · arch | Nodes: 16 | العقد: 16 |
| Metric · arch | SQL stages: 4 | مراحل SQL: 4 |
| Metric · arch | State: Postgres-backed | الحالة: مخزّنة في Postgres |
| Metric · arch | Channels: WhatsApp + Email | القنوات: واتساب + بريد |

**Stack (8):** n8n Core · PostgreSQL · Postgres Chat Memory · OpenAI API · Google Sheets API · UltraMsg WhatsApp · Gmail · Code

**Nodes (16):** Webhook · Execute a SQL query ×4 · If1 · Wait · AI Agent · OpenAI Chat Model · Postgres Chat Memory · Get row(s) in sheet · Append row in sheet · HTTP Request · If · Extract Email · Send a message

### 2.6 Meta Ads Scaling Ledger

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Paid Media Management | إدارة الإعلانات المدفوعة |
| Title | Meta Ads Performance Ledger | سجل أداء حملات Meta |
| Description | Managing and scaling return-oriented advertising budgets across acquisition, conversational commerce, and localized reach funnels. | إدارة وتوسيع ميزانيات الإعلانات الموجهة للأداء عبر مسارات الاستحواذ والتجارة بالمحادثة والوصول الموجّه. |

**Column headers:**

| Key | English | العربية |
| --- | --- | --- |
| `campaign` | Campaign | الحملة |
| `objective` | Objective | الهدف |
| `results` | Results | النتائج |
| `costPerResult` | Cost per result | التكلفة لكل نتيجة |
| `spend` | Amount spent | المبلغ المُنفق |
| `reach` | Reach | الوصول |
| `impressions` | Impressions | مرات الظهور |
| `frequency` | Frequency | التكرار |

**Transcribed rows (from `meta-ads-scaling-proof.png`):**

| # | Campaign (EN) | الحملة (AR) | Objective | Results | CPR | Spend | Reach | Impressions | Freq |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | api.whatsapp.com — Special Offer | api.whatsapp.com — عرض خاص | Link clicks | 1,911 | $0.02 | $36.37 | 310,942 | 335,841 | 1.08 |
| 2 | Jood Hair Dye — Single Ad | صبغة الشعر من Jood — إعلان واحد | Messaging conversations | 181 | $0.11 | $20.51 | 86,065 | 137,608 | 1.60 |
| 3 | Jood Hair Dye — Reach | صبغة الشعر من Jood — الوصول | Reach | 550,674 | $0.03 | $17.60 | 550,674 | 685,747 | 1.25 |
| 4 | Clean Water — Messaging | كلين ووتر — المحادثات | Messaging conversations | 74 | $0.17 | $12.88 | 38,813 | 70,284 | 1.81 |
| 5 | Instagram — Profile Visits | إنستغرام — زيارات الملف | Profile visits | 4,170 | $0.003 | $11.84 | 129,620 | 212,330 | 1.64 |
| 6 | Jood Hair Dye — Traffic | صبغة الشعر من Jood — الزيارات | Link clicks | 957 | $0.01 | $10.52 | 54,931 | 56,629 | 1.03 |
| 7 | Special Multi-pack Offers | عروض مميزة ضمن مجموعات | Messaging conversations | 93 | $0.07 | $6.85 | 11,494 | 20,662 | 1.80 |
| 8 | fb.com — Messaging | fb.com — المحادثات | Messaging conversations | 39 | $0.09 | $3.50 | 11,737 | 14,080 | 1.20 |
| 9 | Direct Profile Traffic | زيارات مباشرة للملف | Profile visits * | 126 | $0.01 | $1.58 | 11,223 | 11,987 | 1.07 |

**Account totals:**

| Metric | English | العربية | Value |
| --- | --- | --- | --- |
| Spend | Total spend | إجمالي الإنفاق | **$4,163.00** |
| Reach | Total reach | إجمالي الوصول | **37,266,280** |
| Impressions | Total impressions | إجمالي مرات الظهور | **52,667,737** |
| Frequency | Blended frequency | التكرار المُجمّع | **1.41** |

**How to read these figures:**

| | Text |
| --- | --- |
| EN | These campaigns were optimized for reach, link clicks, profile visits, and messaging — not direct sales. Cost per result therefore reflects the platform objective selected for each campaign rather than customer acquisition cost. Qualification happened downstream, within the WhatsApp conversation flow, before qualified opportunities reached the sales team. |
| AR | هذه الحملات حُسّنت لتحقيق أهداف مثل الوصول، والنقرات، وزيارات الملف، وبدء المحادثات، لا لإثبات المبيعات المباشرة. لذلك تعكس تكلفة النتيجة الهدف الذي جرى تحسين الحملة من أجله، ولا تمثل تكلفة اكتساب العميل بالضرورة. وجرت عملية التأهيل في المرحلة اللاحقة داخل مسار المحادثة عبر واتساب، قبل تحويل الفرص المؤهلة إلى فريق المبيعات. |

**Four strategic takeaways:**

1. **Efficient acquisition economics** / **اقتصاديات استحواذ منخفضة التكلفة**
   - EN: Selected traffic campaigns delivered low platform-level costs, with click costs reaching $0.01–$0.02 and profile visits at $0.003 in the reported campaigns.
   - AR: حققت حملات الزيارات تكلفة منخفضة على مستوى المنصة، مع كلفة نقرة بلغت 0.01–0.02 دولار، وزيارات للملف الشخصي بـ 0.003 دولار في الحملات المسجلة.
2. **Conversational acquisition flows** / **مسارات الاستحواذ عبر المحادثة**
   - EN: Messaging campaigns generated conversations at $0.07–$0.17 per result, with lead qualification taking place downstream in the conversation flow.
   - AR: ولّدت حملات الرسائل محادثات بتكلفة 0.07–0.17 دولار لكل نتيجة، مع إتمام تأهيل العملاء في المرحلة اللاحقة داخل مسار المحادثة.
3. **Frequency and audience control** / **ضبط التكرار والجمهور**
   - EN: Reported campaign frequency remained controlled between 1.03 and 1.81 across the displayed rows to minimize ad fatigue.
   - AR: بقي معدل التكرار منضبطاً بين 1.03 و 1.81 في الصفوف المعروضة للحد من تشبع الجمهور وإنهاك المحتوى الإعلاني.
4. **Scale of distribution** / **التوزيع على نطاق واسع**
   - EN: The account reported 37.27M reach and 52.67M impressions across the measured campaigns.
   - AR: سجل الحساب 37.27 مليون وصول و 52.67 مليون ظهور عبر الحملات المقاسة.

### 2.7 Narrative / Executive Philosophy

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | The Discipline | منهجية العمل |
| Title | Three Disciplines, One Performance Engine | ثلاثة مسارات. منظومة أداء واحدة. |
| Description | Every creative asset moves through the same discipline: purposeful production, retention-led editing, and data-driven iteration. | كل أصل إبداعي يمر عبر المنهج نفسه: تصوير مقصود، ومونتاج مدفوع بسلوك المشاهدة، ثم تحسين تقوده البيانات. |

| Phase · production | On-Location Production — Framing, angle direction, and building advertising scenes grounded in consumer psychology. | الإنتاج في موقع التصوير — التكوين، وتوجيه الكاميرا، وبناء المشاهد الإعلانية المبنية على فهم سلوك المستهلك. |
| Phase · post | Editing & Retention Engineering — Fast cinematic editing that lifts watch-through rate and click-through rate. | المونتاج وهندسة المشاهدة — تحرير سريع يعزز معدل إكمال المشاهدة (Watch-Through Rate) ونسب النقر (CTR). |
| Phase · scaling | Campaign Management & Scaling — Precise budget distribution, profitable audience targeting, and maximum return on ad spend. | إدارة الحملات والتوسع — توزيع الميزانيات بدقة، استهداف الشرائح الأعلى أداءً، وتحسين العائد على الإنفاق (ROAS). |

### 2.8 Experience Timeline

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Proven Track Record | سجل الخبرة |
| Title | An Interactive Experience Timeline | الخط الزمني التفاعلي للمسيرة المهنية |
| Description | Four chapters, one throughline: production instincts turned into acquisition systems. | أربع محطات يجمعها خيط واحد: خبرة الإنتاج تتحول إلى أنظمة استحواذ مدفوعة. |

### 2.9 Campaign Studies

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Campaign Studies | دراسات الحملات |
| Title | Media Buying Case Studies | دراسات حالة في الإعلانات الممولة |
| Description | How budget, creative, and targeting were structured on live accounts — and what moved as a result. | كيف جرى بناء الميزانية والمحتوى والاستهداف على حسابات فعلية — وما الذي تغيّر نتيجة ذلك. |
| Disclosure tag | Illustrative Case Study | دراسة توضيحية |

Every one of the 4 studies carries `illustrative: true`, so the disclosure tag renders on each card beside its metrics.

### 2.10 Operating System / Technical Stack

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | The Operating System | منظومة العمل |
| Title | Tools & Systems That Run the Engine | الأدوات والأنظمة التي تدير المحرك |
| Description | The daily toolchain behind every campaign, edit, and automated workflow. | سلسلة الأدوات اليومية خلف كل حملة، وكل مونتاج، وكل تدفّق عمل مؤتمت. |

### 2.11 Contact

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Contact & Global Connect | تواصل وتعاون عالمي |
| Title | Discuss a Growth Opportunity | ناقش فرصة نمو |
| Description | Available for growth management roles, media buying partnerships, and performance video creative systems. | متاح لأدوار إدارة النمو، وشراكات الإعلام المدفوع، وبناء أنظمة الفيديو الإعلاني الموجه للأداء. |

**Audio control strings:**

| Key | English | العربية |
| --- | --- | --- |
| `on` | Sound: On | الصوت: مفعّل |
| `off` | Sound: Off | الصوت: مغلق |
| `enable` | Turn ambient sound on | تشغيل الصوت المحيط |
| `prompt` | Enable ambient audio | استمع للأجواء الصوتية |
| `disable` | Turn ambient sound off | كتم الصوت المحيط |

---

## 3. Data & Credibility Verification

### 3.1 Meta Ads figures

| Check | Result |
| --- | --- |
| Total spend | $4,163.00 — matches capture totals row `٤,١٦٣$` |
| Total reach | 37,266,280 — matches `٣٧,٢٦٦,٢٨٠` |
| Total impressions | 52,667,737 — matches `٥٢,٦٦٧,٧٣٧` |
| Blended frequency | 1.41 — impressions ÷ reach = 1.4133 ✓ |
| Per-row frequency | all 9 rows: impressions ÷ reach equals stated frequency ✓ |
| Row scope | 9 rows sum to $121.65 = 2.9% of account. Labelled account-level, **not** presented as the row sum ✓ |
| Blended CPM | $0.079 — consistent with reach/awareness buying |
| Corrections applied | Row 6 spend $10.52 (capture reads `١٠,٥٢$`, not $15.52) · Row 9 objective = Profile Visits, inferred from 1-day-click attribution, marked `*` |

### 3.2 Asset counts

| Item | Count | Verified against |
| --- | --- | --- |
| Design assets | 71 | `designItems.length`; every category declared in translations |
| Videos | 5 (1 landscape / 4 vertical) | `videoItems` |
| Automation schematics | 2 | node counts match listed nodes (8, 16) |
| Ads rows | 9 | transcribed from capture |

### 3.3 Verified behaviour

| Behaviour | Status |
| --- | --- |
| `video-production-reel` muted inline | ✅ `forceMuted: true`; mute control removed, not disabled |
| `video-production-reel` muted in modal | ✅ enforced in code (`muted={silent \|\| muted}`, re-mute on every `play`, volume slider omitted); browser check for the modal path not yet run |
| Lightbox — X button | ✅ verified topmost at its own coordinates |
| Lightbox — backdrop click | ✅ closes |
| Lightbox — Escape | ✅ closes |
| Lightbox — portalled to `<body>` | ✅ escapes `<main>`'s `z-10` stacking context |
| Cinema modal autoplay | ✅ currentTime advances on open |
| Audio pill click starts audio | ✅ both locales, 1440px and 390px |
| Audio pill no viewport overflow | ✅ x 24→206 (EN) / 24→200 (AR) at 390px |

---

## 4. Actionable Notes

### Content decisions for you

1. **Canvas scene labels are English-only** in both locales (`SCENE 01 — PRODUCTION`, `TC 00:00:00:00`, `CUT · RIPPLE · ROLL`). Treated as instrument-slate metadata. Say the word if you want them localised.
2. **Video CTR badges are gone.** `videoItems[].ctr` carried simulated percentages; each is now a `tag` — an editorial descriptor of the cut (`Performance Edit`, `Loop Architecture`) with no numeric claim attached.
3. **Campaign study metrics remain illustrative — and now say so on the page.** Every study in `src/data/campaigns.js` carries `illustrative: true`, which renders a disclosure tag beside its ROAS/CAC/scale figures in both locales. Drop the flag in the same edit that replaces the numbers with verified ones.
4. **Row 9 objective is inferred**, not read — its label is clipped at the capture edge. Marked with `*` and footnoted. A fuller screenshot would let it be read directly.
5. **Plate metadata reads `4:5 · DAMASCUS · REMOTE`**, matching the contact block’s `Damascus, Syria / Global Remote`.

### Layout & responsiveness

1. **Nav carries 9 items.** Single-line at 1280px and 1440px, verified. Adding a tenth will wrap — shorten labels first.
2. **Wide tables scroll in their own container** (ads ledger `min-w-[62rem]`, systems cards). Page body never scrolls sideways; verified 0px overflow at 390px in both locales.
3. **Arabic hero headline runs 5 lines at 1440px** vs 6 for English, both above the fold. Arabic uses a smaller clamp with positive tracking — negative letter-spacing would sever letter joins.
4. **Fixed chrome uses physical left in both locales** (sound toggle, its pill, its tooltip). This is deliberate: logical `start-*` mirrors under RTL and pushed them off-screen. Fixed twice now — worth remembering for any new fixed-position chrome.

### Known limitations of the QA environment

1. **H.264 cannot be decoded** by the headless browser used for QA, so `<video>` elements error and unmount there. Video behaviour was verified against a VP9 WebM served in their place.
2. **Google Fonts is blocked** by the container egress policy, so QA screenshots fall back to system fonts. Archivo and IBM Plex Mono load normally in a real browser.

### Deployment

The live Worker is still serving an older build. It needs **one** of:

- `CLOUDFLARE_API_TOKEN` added to repo secrets, then re-run the GitHub Actions workflow; **or**
- Cloudflare Workers Builds deploy command changed from `npx wrangler versions upload` to `npx wrangler deploy` — `versions upload` creates a version but never routes traffic to it, which is why green builds leave the site stale.

Enable one and disable the other so they do not both deploy on every push.
