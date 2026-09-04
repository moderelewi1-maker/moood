// Full EN/AR copy tree. Both locales share the same shape, so every lookup
// resolves in either language. Structural data (ids, icons, numbers, hrefs)
// stays in src/data/*.
//
// The Arabic side is native marketing copy supplied by Modar — not a
// translation of the English. Where the two diverge in phrasing, Arabic is
// authoritative for Arabic readers.
export const LOCALES = ['en', 'ar']
export const DEFAULT_LOCALE = 'en'
export const RTL_LOCALES = ['ar']

export const translations = {
  en: {
    meta: {
      title: 'Modar Akram Elewi — Digital Marketing & Growth',
      switchTo: 'التبديل إلى العربية',
    },
    audio: {
      on: 'Sound: On',
      off: 'Sound: Off',
      enable: 'Turn ambient sound on',
      disable: 'Turn ambient sound off',
    },
    nav: {
      brand: 'M.Elewi',
      home: 'Home',
      about: 'Experience',
      design: 'Design',
      video: 'Video',
      systems: 'Systems',
      campaigns: 'Campaigns',
      system: 'Stack',
      contact: 'Contact',
      cta: 'Get in Touch',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      name: 'Modar Akram Elewi',
      title: 'Digital Marketing & Growth Manager | Paid Media Specialist & High-Impact Visual Producer',
      headline: {
        lead: 'Connecting ',
        highlightOne: 'digital performance analytics',
        mid: ' with ',
        highlightTwo: 'advertising content engineered for return on investment',
      },
      subtitle:
        'Building paid acquisition channels, scaling Meta Ads budgets, and engineering marketing operations automation.',
      badges: {
        meta: 'Meta Blueprint Credentialed',
        roas: 'ROAS Optimization',
        funnel: 'Full-Funnel Media Buying',
      },
      ctaReel: 'View Portfolio',
      ctaContact: 'Get in Touch for Collaboration',
      availability: 'Open to growth roles & partnerships',
      scroll: 'Scroll',
      scrollAria: 'Scroll to next section',
      portraitAlt: 'Portrait of Modar Akram Elewi',
    },
    about: {
      eyebrow: 'The Discipline',
      title: 'Three Phases, One Performance Engine',
      description:
        'Every asset moves through the same pipeline — shot with intent, cut for retention, then scaled against the numbers.',
      phases: {
        production: {
          index: '01',
          label: 'Production',
          title: 'On-Location Production',
          text: 'Framing, angle direction, and building advertising scenes grounded in consumer psychology.',
        },
        post: {
          index: '02',
          label: 'Post-Production',
          title: 'Editing & Retention Engineering',
          text: 'Fast cinematic editing that lifts watch-through rate and click-through rate.',
        },
        scaling: {
          index: '03',
          label: 'Scaling & Growth',
          title: 'Campaign Management & Scaling',
          text: 'Precise budget distribution, profitable audience targeting, and maximum return on ad spend.',
        },
      },
      stats: {
        delivery: { suffix: '%', label: 'On-Time Milestone Delivery' },
        rating: { suffix: '★', label: 'Rating on Freelance Content Projects' },
        promotion: { suffix: ' Days', label: 'Fast-Tracked to Head of Accounts' },
      },
    },
    experience: {
      eyebrow: 'Proven Track Record',
      title: 'An Interactive Experience Timeline',
      description: 'Four chapters, one throughline: production instincts turned into acquisition systems.',
      current: 'Current',
      items: {
        freelance: {
          period: 'Ongoing / Parallel Track',
          role: 'Founder & Media Producer',
          org: 'Freelance Creative & Growth Collective',
          location: 'Global Remote',
          tag: 'Production',
          summary:
            'Producing high-quality advertising content and collaborating with creators and brands, locally and internationally.',
          achievements: [
            'High-retention video edits for international creators and DTC brands',
            'Local commercial campaigns produced end to end: concept, shoot, edit',
            'A repeatable hook-first editing process later carried into agency work',
          ],
        },
        qareeba: {
          period: 'Prior Role',
          role: 'Head of Accounts & Media Buying',
          org: 'Qareeba Marketing Agency',
          location: 'Remote',
          tag: 'Media Buying',
          summary:
            'Managing and scaling Meta Ads budgets, resolving advertising restrictions, and promoted to Head of Accounts within 30 days.',
          achievements: [
            'Promoted to department lead within 30 days on performance alone',
            'Owned ROAS accountability across the full active client portfolio',
            'Handled Meta ad-account restriction cases through to resolution',
          ],
        },
        truepixel: {
          period: 'Previous Role',
          role: 'Operations & Social Media Lead',
          org: 'True Pixel',
          location: 'Germany (Remote)',
          tag: 'Growth Ops',
          summary:
            'Founding the social media department and running operations to European quality standards, including sales-team training.',
          achievements: [
            'Built the social media department’s workflows and SOPs from scratch',
            'Trained sales teams against European agency quality standards',
            'Set reporting standards adopted across the wider account team',
          ],
        },
        sts: {
          period: 'Current',
          role: 'Digital Marketing Specialist',
          org: 'STS — Smart Transportation Solutions Inc.',
          location: 'Damascus Hub',
          tag: 'Full-Funnel Growth',
          summary:
            'Leading digital acquisition campaigns for corporate clients in the US market and producing the direct-response visual assets behind them.',
          achievements: [
            'Own end-to-end digital acquisition strategy for the US market',
            'Produce direct-response video assets on a continuous testing cadence',
            'Run cross-border marketing operations workflows spanning multiple teams',
          ],
        },
      },
    },
    design: {
      eyebrow: 'Design Gallery',
      title: 'Graphic Design & Visual Branding',
      description:
        'Ad banners, brand systems, and performance creative — filter by track, click any tile to open it full screen.',
      categories: {
        all: 'All Work',
        packshot: 'E-Commerce Packshot',
        'direct-response': 'Direct Response',
        brand: 'Brand Identity',
        logistics: 'Logistics',
      },
      itemAlt: 'design work sample',
      viewAll: 'View Full Gallery',
      showLess: 'Show Less',
      openLightbox: 'Open full screen',
      closeLightbox: 'Close',
      prev: 'Previous',
      next: 'Next',
      counter: 'of',
    },
    video: {
      eyebrow: 'Video Production',
      title: 'Shot for Attention, Cut for Retention',
      description:
        'Landscape commercials and long-form retention edits alongside vertical direct-response hooks built for the feed.',
      formats: {
        all: 'All Formats',
        landscape: 'Landscape 16:9',
        vertical: 'Vertical 9:16',
      },
      labels: {
        hook: 'Hook Angle',
        pacing: 'Pacing',
        ctr: 'CTR Impact',
      },
      addEmbed: 'Add YouTube / Vimeo embed',
      controls: {
        play: 'Play',
        pause: 'Pause',
        mute: 'Mute',
        unmute: 'Unmute',
      },
      playAria: 'Play',
    },
    systems: {
      eyebrow: 'Systems & Automation',
      title: 'Systems & AI Architecture',
      description:
        'Architecting autonomous agents, real-time CRM synchronisations, and custom conversational funnels.',
      labels: {
        stack: 'Stack',
        nodes: 'Nodes in graph',
        inspect: 'Inspect architecture',
        zoomHint: 'Click to inspect · scroll to zoom · drag to pan',
        targetNote: 'Design target, not a measured production figure.',
      },
      viewer: {
        close: 'Close',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        reset: 'Fit to screen',
        actual: 'Actual size',
      },
    },
    audit: {
      eyebrow: 'Performance Marketing',
      title: 'Meta Ads Scaling Ledger',
      description:
        'Ads Manager telemetry across acquisition, conversational commerce and localized reach funnels.',
      beacon: 'Verified Meta Ads audit',
      inspect: 'Inspect ledger',
      inspectHint: 'Opens the raw Ads Manager capture · zoom and pan to read individual rows',
      columns: {
        campaign: 'Campaign',
        objective: 'Objective',
        results: 'Results',
        costPerResult: 'Cost per result',
        spend: 'Amount spent',
        reach: 'Reach',
        impressions: 'Impressions',
        frequency: 'Frequency',
      },
      objectives: {
        linkClicks: 'Link clicks',
        conversations: 'Messaging conversations',
        reach: 'Reach',
        profileVisits: 'Profile visits',
      },
      units: {
        linkClicks: 'clicks',
        conversations: 'conversations',
        reach: 'accounts reached',
        profileVisits: 'visits',
        perThousand: 'per 1,000 accounts',
      },
      inferredNote: 'Objective inferred from the attribution window; label clipped in the capture.',
      scopeNote:
        'Nine rows shown, sorted by spend. Totals below are account-level across all campaigns, not the sum of these rows.',
      totalsLabel: 'Account totals',
      totals: {
        spend: 'Total spend',
        reach: 'Total reach',
        impressions: 'Total impressions',
        frequency: 'Blended frequency',
      },
      reachUnit: 'Meta accounts',
      scrollHint: 'Scroll to see all columns',
      findingsTitle: 'Strategic Performance Audit',
      findings: {
        acquisition: {
          title: 'Ultra-low acquisition economics',
          body: 'Direct-to-WhatsApp and link acquisition ran at $0.01–$0.02 per click, with Instagram profile traffic captured at $0.003 per visit — sub-cent traffic at volume.',
        },
        conversational: {
          title: 'Conversational commerce funnels',
          body: 'Intent-led messaging campaigns for Jood and Clean Water held $0.07–$0.17 per qualified inquiry, filtering low-intent audiences before anything reached a sales agent.',
        },
        saturation: {
          title: 'Saturation and frequency control',
          body: 'Frequency held between 1.03 and 1.81 across every active tier, extracting unique reach without tipping campaigns into creative fatigue.',
        },
        scaling: {
          title: 'High-volume distribution',
          body: 'Delivery infrastructure carried 37.2M unique accounts reached and 52.6M impressions across omnichannel consumer touchpoints.',
        },
      },
    },
    campaigns: {
      eyebrow: 'Campaign Studies',
      title: 'Media Buying Case Studies',
      description:
        'How budget, creative, and targeting were structured on live accounts — and what moved as a result.',
      labels: {
        market: 'Market',
        platform: 'Platform',
        objective: 'Objective',
        execution: 'Execution Strategy',
        roas: 'ROAS',
        cac: 'CAC Reduction',
        scale: 'Spend Scaled',
      },
      items: {
        'us-acquisition': {
          market: 'US Operations Hub — B2B Logistics',
          platform: 'Meta Ads Manager',
          objective: 'Qualified lead generation for cross-border freight services.',
          execution:
            'Direct-response video testing matrix at the top of funnel, retargeting on watch-time cohorts, and weekly budget pacing against cost-per-qualified-lead.',
        },
        'agency-recovery': {
          market: 'Agency Client Book — Multi-Vertical',
          platform: 'Meta Ads Manager',
          objective: 'Recover restricted accounts and restore profitable ROAS.',
          execution:
            'Account restriction resolution with Meta support, campaign restructure onto consolidated ad sets, and creative refresh cycles to reset auction performance.',
        },
        'local-sme': {
          market: 'Local SME — Retail & Services',
          platform: 'Meta Ads Manager',
          objective: 'Drive in-store and direct-message demand in-market.',
          execution:
            'Offer-led creative with geo-fenced targeting, message-optimized objectives, and a lean testing budget scaled only against proven angles.',
        },
        'eu-pipeline': {
          market: 'European Agency — B2B Pipeline',
          platform: 'Meta Ads · Organic Social',
          objective: 'Build a repeatable B2B pipeline from a standing start.',
          execution:
            'SOP-driven content engine feeding paid amplification, with reporting standards that let the sales team act on the same numbers.',
        },
      },
    },
    system: {
      eyebrow: 'The Operating System',
      title: 'Tools & Systems That Run the Engine',
      description: 'The daily toolchain behind every campaign, edit, and automated workflow.',
      tools: {
        'meta-ads': {
          name: 'Meta Ads Manager',
          role: 'Media Buying',
          description:
            'Full-funnel campaign structuring, budget pacing, creative testing matrices, and ROAS-driven optimization across Meta placements.',
        },
        n8n: {
          name: 'n8n Automation',
          role: 'Marketing Ops',
          description:
            'Custom workflows and data pipelines connecting ad platforms, CRM, and reporting — turning manual ops into self-running systems.',
        },
        premiere: {
          name: 'Adobe Premiere Pro',
          role: 'Video Editing',
          description:
            'Direct-response and retention-focused editing — pacing, cut rhythm, and hook-first structure built for the scroll.',
        },
        'after-effects': {
          name: 'Adobe After Effects',
          role: 'Motion Graphics',
          description:
            'Motion graphics, kinetic captions, and animated overlays that lift watch time on short- and long-form assets.',
        },
        ga: {
          name: 'Google Analytics',
          role: 'Measurement',
          description:
            'Funnel and attribution analysis feeding creative and budget decisions back into the media buying loop.',
        },
        'al-ameen': {
          name: 'Al-Ameen ERP',
          role: 'Operations',
          description:
            'Cross-border operational reporting and resource coordination inside the ERP system powering the operations hub.',
        },
      },
    },
    contact: {
      eyebrow: 'Contact & Global Connect',
      title: 'Start Your Next Project With Me',
      description:
        'Available for full-time growth roles, media buying partnerships, and direct-response video production.',
      emailLabel: 'Email',
      sendEmail: 'Send an Email',
      copy: 'Copy Address',
      copied: 'Copied',
      location: 'Damascus, Syria / Global Remote',
      socials: { linkedin: 'LinkedIn', github: 'GitHub', whatsapp: 'WhatsApp' },
    },
    footer: {
      rights: 'Modar Akram Elewi. Built with React, Tailwind & Three.js.',
      backToTop: 'Back to top',
    },
  },

  ar: {
    meta: {
      title: 'مضر أكرم عليوي — التسويق الرقمي والنمو',
      switchTo: 'Switch to English',
    },
    audio: {
      on: 'الصوت: مفعّل',
      off: 'الصوت: صامت',
      enable: 'تشغيل الصوت المحيط',
      disable: 'كتم الصوت المحيط',
    },
    nav: {
      brand: 'م.عليوي',
      home: 'الرئيسية',
      about: 'عن الخبرة',
      design: 'التصاميم',
      video: 'الفيديو',
      systems: 'الأنظمة',
      campaigns: 'الحملات',
      system: 'الأدوات',
      contact: 'تواصل معي',
      cta: 'تواصل معي',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      name: 'مضر أكرم عليوي',
      title: 'مدير تسويق رقمي ونمو | خبير إعلانات ممولة وإنتاج مرئي عالي التأثير',
      headline: {
        lead: 'الربط بين ',
        highlightOne: 'التحليل البياني الرقمي',
        mid: ' وصناعة المحتوى الإعلاني الموجه لتحقيق ',
        highlightTwo: 'أعلى عائد استثماري',
      },
      subtitle:
        'بناء قنوات الاستحواذ المدفوعة، التوسع في ميزانيات Meta Ads، وهندسة أتمتة العمليات التسويقية.',
      badges: {
        meta: 'معتمد من Meta Blueprint',
        roas: 'تحسين العائد على الإنفاق الإعلاني',
        funnel: 'إدارة القمع التسويقي الكامل',
      },
      ctaReel: 'استعرض معرض الأعمال',
      ctaContact: 'تواصل للتعاون المشترك',
      availability: 'متاح لفرص النمو والشراكات',
      scroll: 'مرّر',
      scrollAria: 'الانتقال إلى القسم التالي',
      portraitAlt: 'صورة مضر أكرم عليوي',
    },
    about: {
      eyebrow: 'منهجية العمل',
      title: 'ثلاث مراحل، ومحرك أداء واحد',
      description:
        'كل عمل إعلاني يمر عبر المسار نفسه: تصوير بهدف، ومونتاج يخدم الاحتفاظ، ثم تحجيم يقوده الرقم.',
      phases: {
        production: {
          index: '٠١',
          label: 'الإنتاج',
          title: 'الإنتاج الميداني المباشر',
          text: 'ضبط الزوايا وصناعة المشاهد الإعلانية القائمة على علم نفس المستهلك (Consumer Psychology).',
        },
        post: {
          index: '٠٢',
          label: 'ما بعد الإنتاج',
          title: 'المونتاج وهندسة الاحتفاظ',
          text: 'تحرير سينمائي سريع يضمن رفع معدل المشاهدة (Retention Rate) ونسب النقر (CTR).',
        },
        scaling: {
          index: '٠٣',
          label: 'التحجيم والنمو',
          title: 'إدارة الحملات والتحجيم',
          text: 'توزيع الميزانيات بدقة، استهداف الشرائح المربحة، وتحقيق أعلى عائد على الإنفاق الإعلاني (ROAS).',
        },
      },
      stats: {
        delivery: { suffix: '%', label: 'نسبة التسليم في الموعد' },
        rating: { suffix: '★', label: 'تقييم مشاريع المحتوى المستقلة' },
        promotion: { suffix: ' يوماً', label: 'الترقية إلى رئيس إدارة الحسابات' },
      },
    },
    experience: {
      eyebrow: 'سجل الخبرة',
      title: 'الخط الزمني التفاعلي للمسيرة المهنية',
      description: 'أربع محطات يجمعها خيط واحد: خبرة الإنتاج تتحول إلى أنظمة استحواذ مدفوعة.',
      current: 'حالياً',
      items: {
        freelance: {
          period: 'مسار مستمر بالتوازي',
          role: 'مؤسس ومنتج محتوى إعلاني',
          org: 'Freelance & Creative Collective',
          location: 'عن بُعد عالمياً',
          tag: 'الإنتاج',
          summary:
            'إنتاج المحتوى الإعلاني عالي الجودة والتعاون مع صناع المحتوى والعلامات التجارية عالمياً ومحلياً.',
          achievements: [
            'مونتاج فيديو عالي الاحتفاظ لصنّاع محتوى وعلامات تجارية عالمية',
            'إنتاج حملات إعلانية محلية بالكامل: الفكرة، والتصوير، والمونتاج',
            'بناء منهجية مونتاج تبدأ من الخطّاف، انتقلت لاحقاً إلى العمل داخل الوكالات',
          ],
        },
        qareeba: {
          period: 'دور سابق',
          role: 'رئيس إدارة الحسابات والإعلانات الممولة',
          org: 'وكالة قريبة للتسويق',
          location: 'عن بُعد',
          tag: 'الإعلانات الممولة',
          summary:
            'إدارة وتوسيع ميزانيات Meta Ads، معالجة القيود الإعلانية، والترقية لمنصب رئيس إدارة الحسابات في 30 يوماً.',
          achievements: [
            'الترقية إلى قيادة القسم خلال 30 يوماً بناءً على الأداء',
            'تحمّل مسؤولية العائد على الإنفاق الإعلاني عبر محفظة العملاء بالكامل',
            'متابعة حالات تقييد الحسابات الإعلانية مع ميتا حتى معالجتها',
          ],
        },
        truepixel: {
          period: 'دور سابق',
          role: 'مدير العمليات وقسم السوشيال ميديا',
          org: 'True Pixel — وكالة تسويق ألمانية',
          location: 'ألمانيا (عن بُعد)',
          tag: 'إدارة العمليات',
          summary:
            'تأسيس قسم السوشيال ميديا وإدارة العمليات وفق معايير الجودة الأوروبية وتدريب فرق المبيعات.',
          achievements: [
            'بناء إجراءات العمل التشغيلية لقسم السوشيال ميديا من الصفر',
            'تدريب فرق المبيعات وفق معايير الجودة الأوروبية',
            'وضع معايير التقارير التي اعتمدها فريق الحسابات بالكامل',
          ],
        },
        sts: {
          period: 'حالياً',
          role: 'أخصائي تسويق رقمي',
          org: 'STS — Smart Transportation Solutions Inc.',
          location: 'مركز دمشق',
          tag: 'النمو المتكامل',
          summary:
            'قيادة حملات الاستحواذ الرقمي للشركات في السوق الأمريكي، وصناعة الإعلانات المرئية المباشرة.',
          achievements: [
            'إدارة استراتيجية الاستحواذ الرقمي بالكامل للسوق الأمريكي',
            'إنتاج أصول فيديو استجابة مباشرة ضمن دورة اختبار مستمرة',
            'تشغيل تدفّقات العمليات التسويقية العابرة للحدود بين عدة فرق',
          ],
        },
      },
    },
    design: {
      eyebrow: 'معرض التصاميم',
      title: 'التصميم الجرافيكي والهوية البصرية',
      description:
        'لافتات إعلانية وأنظمة هوية بصرية ومواد إعلانية موجهة للأداء — صنّف حسب المسار، واضغط أي عمل لعرضه بملء الشاشة.',
      categories: {
        all: 'كل الأعمال',
        packshot: 'صور المنتجات التجارية',
        'direct-response': 'الاستجابة المباشرة',
        brand: 'الهوية البصرية',
        logistics: 'الخدمات اللوجستية',
      },
      itemAlt: 'نموذج عمل تصميمي',
      viewAll: 'عرض المعرض الكامل',
      showLess: 'عرض أقل',
      openLightbox: 'عرض بملء الشاشة',
      closeLightbox: 'إغلاق',
      prev: 'السابق',
      next: 'التالي',
      counter: 'من',
    },
    video: {
      eyebrow: 'إنتاج الفيديو',
      title: 'تصوير يجذب الانتباه، ومونتاج يحافظ عليه',
      description:
        'إعلانات أفقية ومونتاج طويل عالي الاحتفاظ، إلى جانب خطّافات عمودية للاستجابة المباشرة مصمّمة لبيئة التمرير السريع.',
      formats: {
        all: 'كل الصيغ',
        landscape: 'أفقي 16:9',
        vertical: 'عمودي 9:16',
      },
      labels: {
        hook: 'زاوية الخطّاف',
        pacing: 'إيقاع المونتاج',
        ctr: 'أثر نسبة النقر',
      },
      addEmbed: 'أضف رابط يوتيوب / فيميو',
      controls: {
        play: 'تشغيل',
        pause: 'إيقاف مؤقت',
        mute: 'كتم الصوت',
        unmute: 'تشغيل الصوت',
      },
      playAria: 'تشغيل',
    },
    systems: {
      eyebrow: 'الأنظمة والأتمتة',
      title: 'هندسة الأنظمة والأتمتة الذكية',
      description:
        'بناء وكلاء مستقلين، ومزامنة فورية لبيانات العملاء، وقنوات محادثة مصمّمة خصيصاً.',
      labels: {
        stack: 'التقنيات',
        nodes: 'عدد العقد',
        inspect: 'استعراض البنية',
        zoomHint: 'اضغط للاستعراض · مرّر للتكبير · اسحب للتحريك',
        targetNote: 'هدف تصميمي وليس قياساً فعلياً من بيئة التشغيل.',
      },
      viewer: {
        close: 'إغلاق',
        zoomIn: 'تكبير',
        zoomOut: 'تصغير',
        reset: 'ملء الشاشة',
        actual: 'الحجم الأصلي',
      },
    },
    audit: {
      eyebrow: 'تسويق الأداء',
      title: 'سجل توسع حملات Meta',
      description:
        'بيانات من مدير الإعلانات تغطي قنوات الاستحواذ والمحادثة والوصول الموجّه.',
      beacon: 'تدقيق أداء معتمد',
      inspect: 'فحص السجل',
      inspectHint: 'يفتح لقطة مدير الإعلانات الأصلية · كبّر وحرّك لقراءة الصفوف',
      columns: {
        campaign: 'الحملة',
        objective: 'الهدف',
        results: 'النتائج',
        costPerResult: 'التكلفة لكل نتيجة',
        spend: 'المبلغ المُنفق',
        reach: 'الوصول',
        impressions: 'مرات الظهور',
        frequency: 'التكرار',
      },
      objectives: {
        linkClicks: 'النقرات على الروابط',
        conversations: 'محادثات تم بدؤها',
        reach: 'الوصول',
        profileVisits: 'زيارات الملف الشخصي',
      },
      units: {
        linkClicks: 'نقرة',
        conversations: 'محادثة',
        reach: 'حساب تم الوصول إليه',
        profileVisits: 'زيارة',
        perThousand: 'لكل ١٠٠٠ حساب',
      },
      inferredNote: 'الهدف مستنتج من نافذة الإسناد؛ التسمية مقطوعة في اللقطة.',
      scopeNote:
        'تسعة صفوف مرتّبة حسب الإنفاق. الإجماليات أدناه على مستوى الحساب بالكامل، وليست مجموع هذه الصفوف.',
      totalsLabel: 'إجماليات الحساب',
      totals: {
        spend: 'إجمالي الإنفاق',
        reach: 'إجمالي الوصول',
        impressions: 'إجمالي مرات الظهور',
        frequency: 'التكرار المُجمّع',
      },
      reachUnit: 'حساب Meta',
      scrollHint: 'مرّر أفقياً لعرض كل الأعمدة',
      findingsTitle: 'التدقيق الاستراتيجي للأداء',
      findings: {
        acquisition: {
          title: 'كفاءة الاستحواذ والتكلفة الميكروية',
          body: 'الاستحواذ المباشر عبر واتساب والروابط بتكلفة ٠٫٠١–٠٫٠٢ دولار للنقرة، وزيارات ملف إنستغرام عند ٠٫٠٠٣ دولار للزيارة — أي أقل من سنت واحد على نطاق واسع.',
        },
        conversational: {
          title: 'هندسة قنوات المحادثة المباشرة',
          body: 'حملات المحادثة لعلامتي Jood وكلين ووتر ضمن ٠٫٠٧–٠٫١٧ دولار للاستفسار المؤهل، مع تصفية الجمهور منخفض النية قبل تحويله إلى فريق المبيعات.',
        },
        saturation: {
          title: 'إدارة التشبع ومعدل التكرار',
          body: 'بقي التكرار بين ١٫٠٣ و١٫٨١ في كل المستويات النشطة، لاستخلاص أقصى وصول فريد دون إنهاك المحتوى الإعلاني.',
        },
        scaling: {
          title: 'التوسع الرأسي والأفقي',
          body: 'بنية توزيع استوعبت الوصول إلى ٣٧٫٢ مليون حساب فريد و٥٢٫٦ مليون ظهور عبر نقاط تواصل متعددة القنوات.',
        },
      },
    },
    campaigns: {
      eyebrow: 'دراسات الحملات',
      title: 'دراسات حالة في الإعلانات الممولة',
      description:
        'كيف جرى بناء الميزانية والمحتوى والاستهداف على حسابات فعلية — وما الذي تغيّر نتيجة ذلك.',
      labels: {
        market: 'السوق',
        platform: 'المنصة',
        objective: 'الهدف',
        execution: 'استراتيجية التنفيذ',
        roas: 'العائد على الإنفاق',
        cac: 'خفض تكلفة الاستحواذ',
        scale: 'توسيع الإنفاق',
      },
      items: {
        'us-acquisition': {
          market: 'السوق الأمريكي — خدمات لوجستية للشركات',
          platform: 'Meta Ads Manager',
          objective: 'توليد عملاء محتملين مؤهلين لخدمات الشحن العابر للحدود.',
          execution:
            'مصفوفة اختبار لفيديوهات الاستجابة المباشرة في أعلى القمع، وإعادة استهداف مبنية على شرائح مدة المشاهدة، وضبط أسبوعي للميزانية وفق تكلفة العميل المؤهل.',
        },
        'agency-recovery': {
          market: 'محفظة عملاء وكالة — قطاعات متعددة',
          platform: 'Meta Ads Manager',
          objective: 'استعادة الحسابات المقيّدة وإعادة العائد على الإنفاق إلى الربحية.',
          execution:
            'معالجة قيود الحسابات مع دعم ميتا، وإعادة هيكلة الحملات ضمن مجموعات إعلانية مدمجة، ودورات تحديث للمحتوى لإعادة ضبط الأداء في المزاد الإعلاني.',
        },
        'local-sme': {
          market: 'مشاريع محلية — تجزئة وخدمات',
          platform: 'Meta Ads Manager',
          objective: 'تحفيز الطلب المباشر عبر الرسائل والزيارات داخل السوق المحلي.',
          execution:
            'محتوى إعلاني قائم على العرض مع استهداف جغرافي دقيق، وأهداف محسّنة للرسائل، وميزانية اختبار محدودة لا تُوسّع إلا على الزوايا المثبتة.',
        },
        'eu-pipeline': {
          market: 'وكالة أوروبية — مسار مبيعات B2B',
          platform: 'Meta Ads · السوشيال العضوي',
          objective: 'بناء مسار مبيعات B2B متكرر من نقطة الصفر.',
          execution:
            'محرك محتوى قائم على إجراءات تشغيلية موثّقة يغذّي التضخيم المدفوع، مع معايير تقارير تتيح لفريق المبيعات العمل على الأرقام نفسها.',
        },
      },
    },
    system: {
      eyebrow: 'منظومة العمل',
      title: 'الأدوات والأنظمة التي تدير المحرك',
      description: 'سلسلة الأدوات اليومية خلف كل حملة، وكل مونتاج، وكل تدفّق عمل مؤتمت.',
      tools: {
        'meta-ads': {
          name: 'Meta Ads Manager',
          role: 'الإعلانات الممولة',
          description:
            'هيكلة الحملات عبر القمع الكامل، وضبط إيقاع الميزانيات، ومصفوفات اختبار المحتوى، والتحسين وفق العائد على الإنفاق الإعلاني.',
        },
        n8n: {
          name: 'n8n Automation',
          role: 'أتمتة العمليات',
          description:
            'تدفّقات عمل وخطوط بيانات تربط المنصّات الإعلانية بأنظمة إدارة العملاء والتقارير — تحويل العمل اليدوي إلى أنظمة ذاتية التشغيل.',
        },
        premiere: {
          name: 'Adobe Premiere Pro',
          role: 'المونتاج',
          description:
            'مونتاج موجّه للاستجابة المباشرة والاحتفاظ — ضبط الإيقاع، وتتابع القطعات، وبنية تبدأ من الخطّاف.',
        },
        'after-effects': {
          name: 'Adobe After Effects',
          role: 'الموشن غرافيك',
          description:
            'موشن غرافيك وترجمات حركية وطبقات بصرية ترفع مدة المشاهدة في المحتوى القصير والطويل.',
        },
        ga: {
          name: 'Google Analytics',
          role: 'القياس والتحليل',
          description:
            'تحليل القمع ومصادر الزيارات بما يغذّي قرارات المحتوى والميزانية داخل دورة الإعلانات الممولة.',
        },
        'al-ameen': {
          name: 'Al-Ameen ERP',
          role: 'العمليات',
          description:
            'التقارير التشغيلية العابرة للحدود وتنسيق الموارد داخل نظام ERP الذي يدير مركز العمليات.',
        },
      },
    },
    contact: {
      eyebrow: 'تواصل وتعاون عالمي',
      title: 'ابدأ مشروعك القادم معي',
      description:
        'متاح لأدوار النمو بدوام كامل، وشراكات الإعلانات الممولة، وإنتاج فيديوهات الاستجابة المباشرة.',
      emailLabel: 'البريد الإلكتروني',
      sendEmail: 'أرسل بريداً إلكترونياً',
      copy: 'نسخ العنوان',
      copied: 'تم النسخ',
      location: 'دمشق، سوريا / عمل عن بُعد عالمياً',
      socials: { linkedin: 'لينكد إن', github: 'غيت هب', whatsapp: 'واتساب' },
    },
    footer: {
      rights: 'مضر أكرم عليوي. مبني بـ React وTailwind وThree.js.',
      backToTop: 'العودة إلى الأعلى',
    },
  },
}
