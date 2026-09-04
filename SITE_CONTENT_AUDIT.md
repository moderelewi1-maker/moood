# Site Content Audit

Generated from the source of truth — `src/i18n/translations.js`, `src/data/*.js` and `src/App.jsx` — not transcribed by hand. Regenerate after any content change.

**Commit at generation:** `188ab3d` · **Locales:** en, ar · **Translation keys:** 247 per locale, at full parity

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
| Headline (lead) | Connecting  | الربط بين  |
| Headline (accent 1) | digital performance analytics | التحليل البياني الرقمي |
| Headline (mid) |  with  |  وصناعة المحتوى الإعلاني الموجه لتحقيق  |
| Headline (accent 2) | advertising content engineered for return on investment | أعلى عائد استثماري |
| Role line | Digital Marketing & Growth Manager \| Paid Media Specialist & High-Impact Visual Producer | مدير تسويق رقمي ونمو \| خبير إعلانات ممولة وإنتاج مرئي عالي التأثير |
| Subtitle | Building paid acquisition channels, scaling Meta Ads budgets, and engineering marketing operations automation. | بناء قنوات الاستحواذ المدفوعة، التوسع في ميزانيات Meta Ads، وهندسة أتمتة العمليات التسويقية. |
| Badge · meta | Meta Blueprint Credentialed | معتمد من Meta Blueprint |
| Badge · roas | ROAS Optimization | تحسين العائد على الإنفاق الإعلاني |
| Badge · funnel | Full-Funnel Media Buying | إدارة القمع التسويقي الكامل |
| CTA primary | View Portfolio | استعرض معرض الأعمال |
| CTA secondary | Get in Touch for Collaboration | تواصل للتعاون المشترك |
| Availability | Open to growth roles & partnerships | متاح لفرص النمو والشراكات |
| Scroll cue | Scroll | مرّر |
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
| Eyebrow | Media Direction & Production | إخراج وإنتاج الوسائط السينمائية |
| Title | Shot for Attention, Cut for Retention | تصوير يجذب الانتباه، ومونتاج يحافظ عليه |
| Description | Landscape commercials and long-form retention edits alongside vertical direct-response hooks built for the feed. | إعلانات أفقية ومونتاج طويل عالي الاحتفاظ، إلى جانب خطّافات عمودية للاستجابة المباشرة مصمّمة لبيئة التمرير السريع. |

**Format filters:** `All Formats` / `كل الصيغ` · `Landscape 16:9` / `أفقي 16:9` · `Vertical 9:16` / `عمودي 9:16`

| # | Title (EN) | العنوان (AR) | Orientation | Duration | Silent |
| --- | --- | --- | --- | --- | --- |
| 1 | Cinematic Production Reel | ريل الإنتاج السينمائي | vertical | 0:26 | **yes — forced** |
| 2 | Adidas Brand Explainer | إعلان تعريفي — أديداس | vertical | 0:15 | no |
| 3 | Marketing Services Explainer | فيديو تعريفي بخدمات التسويق | vertical | 0:30 | no |
| 4 | Animated Follow CTA | دعوة متحركة للمتابعة | vertical | 0:22 | no |
| 5 | Motion Graphics Showcase | عرض الموشن غرافيك | landscape | 0:10 | no |

| # | Hook (EN) | الخطّاف (AR) |
| --- | --- | --- |
| 1 | Cold open on the set, not the pitch | افتتاحية من داخل موقع التصوير لا من العرض |
| 2 | Origin-story hook in the first frame | خطّاف قصة النشأة في اللقطة الأولى |
| 3 | Problem framed before the offer | طرح المشكلة قبل عرض الخدمة |
| 4 | Silhouette motion holds the loop | حركة الظل تحافظ على التكرار |
| 5 | Type reveal synced to the beat | ظهور النصوص متزامن مع الإيقاع |

| # | Pacing (EN) | الإيقاع (AR) | CTR badge |
| --- | --- | --- | --- |
| 1 | Cinematic · kinetic caption cuts | سينمائي · قطعات مع نصوص حركية | +41% CTR |
| 2 | Snap · product-led motion | سريع · حركة يقودها المنتج | +36% CTR |
| 3 | Measured · typographic build | متزن · بناء طباعي | +28% CTR |
| 4 | Loop · minimal silhouette animation | متكرر · أنيميشن ظلّي بسيط | +19% CTR |
| 5 | Dense · After Effects composite | مكثّف · تركيب في أفتر إفكتس | Brand Lift |

**Cinema modal labels:** Play / تشغيل · Pause / إيقاف مؤقت · Mute / كتم الصوت · Unmute / تشغيل الصوت · Volume / مستوى الصوت · Seek / التنقل في المقطع · Full screen / ملء الشاشة · Exit full screen / إنهاء ملء الشاشة · Close / إغلاق · Silent by design / صامت بحكم التصميم · Space to play · M to mute · Esc to close / مسافة للتشغيل · M للكتم · Esc للإغلاق

### 2.4 Design & Visual Identity Gallery

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | Design Gallery | معرض التصاميم |
| Title | Graphic Design & Visual Branding | التصميم الجرافيكي والهوية البصرية |
| Description | Ad banners, brand systems, and performance creative — filter by track, click any tile to open it full screen. | لافتات إعلانية وأنظمة هوية بصرية ومواد إعلانية موجهة للأداء — صنّف حسب المسار، واضغط أي عمل لعرضه بملء الشاشة. |

**Category filters:**

| Key | English | العربية | Assets |
| --- | --- | --- | --- |
| `all` | All Work | كل الأعمال | 71 |
| `packshot` | E-Commerce Packshot | صور المنتجات التجارية | 54 |
| `direct-response` | Direct Response | الاستجابة المباشرة | 7 |
| `brand` | Brand Identity | الهوية البصرية | 6 |
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
| Title | Systems & AI Architecture | هندسة الأنظمة والأتمتة الذكية |
| Description | Architecting autonomous agents, real-time CRM synchronisations, and custom conversational funnels. | بناء وكلاء مستقلين، ومزامنة فورية لبيانات العملاء، وقنوات محادثة مصمّمة خصيصاً. |

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
| Eyebrow | Paid Media Management | إدارة الميزانيات الإعلانية |
| Title | Meta Ads Scaling Ledger | سجل توسع حملات Meta |
| Description | Managing and scaling return-oriented advertising budgets across acquisition, conversational commerce and localized reach funnels. | إدارة وتوسيع الميزانيات الإعلانية الموجهة للعائد عبر قنوات الاستحواذ والمحادثة والوصول الموجّه. |

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
| EN | Every objective here is top-of-funnel — reach, link clicks, profile visits and messaging — so cost per result is the cost of a click, a visit or an opened conversation, not the cost of a sale. The qualifying step happens after the click, inside WhatsApp, where intent is filtered before anything reaches a sales agent. Costs at this level reflect MENA reach inventory priced at a $0.079 blended CPM, held there by frequency discipline between 1.03 and 1.81 rather than by repeated impressions against the same audience. Reach and impressions are cumulative across the account, not a single campaign. |
| AR | جميع الأهداف هنا في أعلى القمع — الوصول والنقرات وزيارات الملف والمحادثات — أي أن تكلفة النتيجة هي كلفة نقرة أو زيارة أو محادثة مفتوحة، لا كلفة عملية بيع. تتم مرحلة التأهيل بعد النقرة داخل واتساب، حيث تُصفّى نية العميل قبل تحويله إلى فريق المبيعات. وتعكس هذه الكلفة أسعار مخزون الوصول في أسواق المنطقة عند متوسط تكلفة ألف ظهور يبلغ ٠٫٠٧٩ دولار، مع انضباط في التكرار بين ١٫٠٣ و١٫٨١ بدلاً من تكرار العرض على الجمهور نفسه. أرقام الوصول والظهور تراكمية على مستوى الحساب وليست حملة واحدة. |

**Four strategic takeaways:**

1. **Ultra-low acquisition economics** / **كفاءة الاستحواذ والتكلفة الميكروية**
   - EN: Direct-to-WhatsApp and link acquisition ran at $0.01–$0.02 per click, with Instagram profile traffic captured at $0.003 per visit — sub-cent traffic at volume.
   - AR: الاستحواذ المباشر عبر واتساب والروابط بتكلفة ٠٫٠١–٠٫٠٢ دولار للنقرة، وزيارات ملف إنستغرام عند ٠٫٠٠٣ دولار للزيارة — أي أقل من سنت واحد على نطاق واسع.
2. **Conversational commerce funnels** / **هندسة قنوات المحادثة المباشرة**
   - EN: Intent-led messaging campaigns for Jood and Clean Water held $0.07–$0.17 per qualified inquiry, filtering low-intent audiences before anything reached a sales agent.
   - AR: حملات المحادثة لعلامتي Jood وكلين ووتر ضمن ٠٫٠٧–٠٫١٧ دولار للاستفسار المؤهل، مع تصفية الجمهور منخفض النية قبل تحويله إلى فريق المبيعات.
3. **Saturation and frequency control** / **إدارة التشبع ومعدل التكرار**
   - EN: Frequency held between 1.03 and 1.81 across every active tier, extracting unique reach without tipping campaigns into creative fatigue.
   - AR: بقي التكرار بين ١٫٠٣ و١٫٨١ في كل المستويات النشطة، لاستخلاص أقصى وصول فريد دون إنهاك المحتوى الإعلاني.
4. **High-volume distribution** / **التوسع الرأسي والأفقي**
   - EN: Delivery infrastructure carried 37.2M unique accounts reached and 52.6M impressions across omnichannel consumer touchpoints.
   - AR: بنية توزيع استوعبت الوصول إلى ٣٧٫٢ مليون حساب فريد و٥٢٫٦ مليون ظهور عبر نقاط تواصل متعددة القنوات.

### 2.7 Narrative / Executive Philosophy

| Field | English | العربية |
| --- | --- | --- |
| Eyebrow | The Discipline | منهجية العمل |
| Title | Three Phases, One Performance Engine | ثلاث مراحل، ومحرك أداء واحد |
| Description | Every asset moves through the same pipeline — shot with intent, cut for retention, then scaled against the numbers. | كل عمل إعلاني يمر عبر المسار نفسه: تصوير بهدف، ومونتاج يخدم الاحتفاظ، ثم تحجيم يقوده الرقم. |

| Phase · production | On-Location Production — Framing, angle direction, and building advertising scenes grounded in consumer psychology. | الإنتاج الميداني المباشر — ضبط الزوايا وصناعة المشاهد الإعلانية القائمة على علم نفس المستهلك (Consumer Psychology). |
| Phase · post | Editing & Retention Engineering — Fast cinematic editing that lifts watch-through rate and click-through rate. | المونتاج وهندسة الاحتفاظ — تحرير سينمائي سريع يضمن رفع معدل المشاهدة (Retention Rate) ونسب النقر (CTR). |
| Phase · scaling | Campaign Management & Scaling — Precise budget distribution, profitable audience targeting, and maximum return on ad spend. | إدارة الحملات والتحجيم — توزيع الميزانيات بدقة، استهداف الشرائح المربحة، وتحقيق أعلى عائد على الإنفاق الإعلاني (ROAS). |

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
| Title | Start Your Next Project With Me | ابدأ مشروعك القادم معي |
| Description | Available for full-time growth roles, media buying partnerships, and direct-response video production. | متاح لأدوار النمو بدوام كامل، وشراكات الإعلانات الممولة، وإنتاج فيديوهات الاستجابة المباشرة. |

**Audio control strings:**

| Key | English | العربية |
| --- | --- | --- |
| `on` | Sound: On | الصوت: مفعّل |
| `off` | Sound: Off | الصوت: صامت |
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
2. **Video CTR badges remain simulated.** `videoItems[].ctr` values (`+41% CTR` etc.) are placeholders flagged in `src/data/media.js`. Every other number on the site is now sourced. These are the last unsourced figures — consider supplying real ones or dropping the badge.
3. **Campaign study metrics remain illustrative.** `src/data/campaigns.js` carries a placeholder warning on its ROAS/CAC/scale figures.
4. **Row 9 objective is inferred**, not read — its label is clipped at the capture edge. Marked with `*` and footnoted. A fuller screenshot would let it be read directly.
5. **Plate metadata says `BAGHDAD, IQ`** — confirm that is the location you want shown publicly.

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
