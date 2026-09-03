// Full EN/AR copy tree. Both locales share the same shape, so every lookup
// in a component resolves in either language. Structural data (ids, icons,
// numbers, hrefs) stays in src/data/*.
export const LOCALES = ['en', 'ar']
export const DEFAULT_LOCALE = 'en'
export const RTL_LOCALES = ['ar']

export const translations = {
  en: {
    meta: {
      title: 'Modar Akram Elewi — Growth & Direct-Response Media',
      switchTo: 'التبديل إلى العربية',
      langShort: 'EN',
    },
    nav: {
      brand: 'M.Elewi',
      story: 'Story',
      work: 'Showreel',
      experience: 'Experience',
      system: 'Systems',
      contact: 'Contact',
      cta: 'Get in Touch',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      name: 'Modar Akram Elewi',
      headline: {
        lead: 'Bridging ',
        highlightOne: 'Analytical Media Buying',
        mid: ' with ',
        highlightTwo: 'High-Retention Video Production',
      },
      subtitle:
        'Digital Marketing & Growth Manager · Performance Media Buyer & Direct-Response Video Producer — turning consumer psychology into full-funnel acquisition systems.',
      badges: {
        meta: 'Meta Blueprint Credentialed',
        roas: 'ROAS Optimization',
        funnel: 'Full-Funnel Media Buying',
      },
      ctaReel: 'View Direct-Response Reel',
      ctaContact: 'Get in Touch',
      availability: 'Open to growth roles & partnerships',
      scroll: 'Scroll',
      scrollAria: 'Scroll to next section',
      portraitAlt: 'Portrait of Modar Akram Elewi',
    },
    narrative: {
      eyebrow: 'The Core Narrative',
      title: 'From the Edit Bay to the Ad Account',
      description:
        'The throughline between consumer behavioural psychology, high-retention video editing, and quantitative ad scaling through Meta Ads Manager — with the workflows automated in n8n.',
      milestones: {
        psychology: {
          title: 'Consumer Psychology',
          text: 'It started with understanding why people stop scrolling — the hooks, the pattern interrupts, the psychology of the first three seconds.',
        },
        editing: {
          title: 'Direct-Response Editing',
          text: 'That understanding became a craft: cutting video engineered to hold attention and drive a specific, measurable action.',
        },
        acquisition: {
          title: 'Full-Funnel Acquisition',
          text: 'Editing led to buying — turning creative instinct into structured media buying systems, budgets, and ROAS accountability.',
        },
        operations: {
          title: 'Marketing Operations',
          text: 'Today that means owning the whole engine: acquisition strategy, creative production, and the n8n data pipelines that scale it cross-border.',
        },
      },
      stats: {
        delivery: { suffix: '%', label: 'On-Time Milestone Delivery' },
        rating: { suffix: '★', label: 'Rating on Freelance Content Projects' },
        promotion: { suffix: ' Days', label: 'Fast-Tracked to Head of Media Buying' },
      },
    },
    work: {
      eyebrow: 'Performance Video Showcase',
      title: 'Built to Stop the Scroll',
      description:
        'Brand commercials, short-form direct-response ads, and long-form retention editing — hover any card to preview.',
      categories: {
        all: 'All Reels',
        commercial: 'Brand Commercials',
        'direct-response': 'Direct-Response Ads',
        retention: 'Retention Editing',
      },
      retentionLabel: 'retention',
      addEmbed: 'Add YouTube / Vimeo embed',
      playAria: 'Play',
      videos: {
        v1: {
          title: 'Direct-Response Hook Reel',
          hook: '"Stop scrolling if you ship internationally..."',
        },
        v2: {
          title: 'Founder-Led UGC Ad',
          hook: '"I almost didn’t post this..."',
        },
        v3: {
          title: 'Brand Commercial — Product Launch',
          hook: 'Cinematic launch spot built for paid + organic reach',
        },
        v4: {
          title: 'Brand Commercial — Service Spotlight',
          hook: 'Trust-building narrative for a service-based brand',
        },
        v5: {
          title: 'Podcast Retention Cut',
          hook: 'Long-form podcast re-cut for maximum audience retention',
        },
        v6: {
          title: 'YouTube Retention Edit',
          hook: 'YouTube long-form edit tuned for average-view-duration',
        },
      },
      gallery: {
        label: 'Creative & Proof of Performance',
        categories: {
          all: 'All',
          creative: 'Creatives',
          brand: 'Brand Assets',
          proof: 'Results & Badges',
        },
        viewAll: 'View Full Gallery',
        showLess: 'Show Less',
        itemAlt: 'work sample',
      },
    },
    experience: {
      eyebrow: 'Proven Track Record',
      title: 'An Interactive Experience Timeline',
      description:
        'Four chapters, one throughline: production instincts turned into acquisition systems. Tap any role to expand it.',
      current: 'Current',
      items: {
        freelance: {
          period: 'Ongoing / Parallel Track',
          role: 'Founder & Media Producer — Freelance Creative & Growth Collective',
          org: 'Independent',
          location: 'Global Remote',
          tag: 'Video Production',
          summary:
            'High-retention editing services and growth campaigns for clients locally and worldwide.',
          achievements: [
            'Delivered high-retention video edits for international creators and DTC brands',
            'Produced local commercial campaigns end-to-end: concept, shoot support, and edit',
            'Built a repeatable hook-first editing process later carried into agency work',
          ],
        },
        qareeba: {
          period: 'Prior Role',
          role: 'Head of Accounts & Media Buying',
          org: 'Qareeba Marketing Agency',
          location: 'Remote',
          tag: 'Media Buying',
          summary:
            'Promoted within 30 days, owning ROAS optimization and the resolution of Meta advertising restrictions across the client book.',
          achievements: [
            'Promoted to department lead within 30 days on performance alone',
            'Owned ROAS accountability across the full active client portfolio',
            'Handled Meta ad-account restriction cases through to resolution',
          ],
        },
        truepixel: {
          period: 'Previous Role',
          role: 'Operations & Social Media Projects Lead',
          org: 'True Pixel',
          location: 'Germany (Remote)',
          tag: 'Growth Ops',
          summary:
            'Established the communications management department and trained business development teams to European standards.',
          achievements: [
            'Built the social media department’s workflows and SOPs from scratch',
            'Trained business development teams against European agency standards',
            'Set reporting standards adopted across the wider account team',
          ],
        },
        sts: {
          period: 'Current',
          role: 'Digital Marketing Specialist',
          org: 'STS — Smart Transportation Solutions Inc.',
          location: 'US Operations Hub',
          tag: 'Full-Funnel Growth',
          summary:
            'Leading acquisition and growth initiatives for the US market and producing the direct-response ad assets behind them.',
          achievements: [
            'Own end-to-end digital acquisition strategy for the US operations hub',
            'Produce and ship direct-response video assets on a continuous testing cadence',
            'Run cross-border marketing operations workflows spanning multiple teams',
          ],
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
            'Custom automation workflows and data pipelines connecting ad platforms, CRM, and reporting — turning manual ops into self-running systems.',
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
            'Cross-border operational reporting and resource coordination inside the ERP system powering the US operations hub.',
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
      socials: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        whatsapp: 'WhatsApp',
      },
    },
    footer: {
      rights: 'Modar Akram Elewi. Built with React, Tailwind & Three.js.',
      backToTop: 'Back to top',
    },
  },

  ar: {
    meta: {
      title: 'مضر أكرم عليوي — النمو الرقمي وإعلانات الاستجابة المباشرة',
      switchTo: 'Switch to English',
      langShort: 'AR',
    },
    nav: {
      brand: 'م.عليوي',
      story: 'القصة',
      work: 'معرض الأعمال',
      experience: 'الخبرات',
      system: 'الأنظمة',
      contact: 'تواصل معي',
      cta: 'تواصل معي',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      name: 'مضر أكرم عليوي',
      headline: {
        lead: 'دمج ',
        highlightOne: 'التحليل الرياضي لشراء الميديا',
        mid: ' مع ',
        highlightTwo: 'صناعة محتوى الفيديو عالي الاحتفاظ',
      },
      subtitle:
        'مدير نمو وتسويق رقمي · خبير شراء مساحات إعلانية ومعدّ فيديوهات استجابة مباشرة — أحوّل سيكولوجيا المستهلك إلى أنظمة استحواذ متكاملة.',
      badges: {
        meta: 'معتمد من Meta Blueprint',
        roas: 'تحسين عوائد الإنفاق الإعلاني (ROAS)',
        funnel: 'استراتيجيات قمع الاستحواذ الكامل',
      },
      ctaReel: 'استعرض معرض الأعمال',
      ctaContact: 'تواصل معي',
      availability: 'متاح لفرص النمو والشراكات',
      scroll: 'مرّر',
      scrollAria: 'الانتقال إلى القسم التالي',
      portraitAlt: 'صورة مضر أكرم عليوي',
    },
    narrative: {
      eyebrow: 'القصة الأساسية',
      title: 'من غرفة المونتاج إلى إدارة الحسابات الإعلانية',
      description:
        'الخيط الواصل بين سيكولوجيا سلوك المستهلك، والمونتاج عالي الاحتفاظ، والتوسّع الكمّي في شراء الإعلانات عبر Meta Ads Manager — مع تدفّقات عمل مؤتمتة بالكامل عبر n8n.',
      milestones: {
        psychology: {
          title: 'سيكولوجيا المستهلك',
          text: 'بدأت القصة من فهم سبب توقّف الناس عن التمرير — الخطّافات، وكسر النمط، وسيكولوجيا الثواني الثلاث الأولى.',
        },
        editing: {
          title: 'مونتاج الاستجابة المباشرة',
          text: 'تحوّل هذا الفهم إلى حرفة: مونتاج فيديو مصمّم لتثبيت الانتباه ودفع المشاهد إلى إجراء محدّد وقابل للقياس.',
        },
        acquisition: {
          title: 'الاستحواذ عبر القمع الكامل',
          text: 'قاد المونتاج إلى شراء الميديا — تحويل الحدس الإبداعي إلى أنظمة شراء منظّمة، وميزانيات مدروسة، ومسؤولية مباشرة عن الـ ROAS.',
        },
        operations: {
          title: 'عمليات التسويق',
          text: 'واليوم يعني ذلك إدارة المحرّك بالكامل: استراتيجية الاستحواذ، وإنتاج المحتوى، وخطوط البيانات المؤتمتة عبر n8n التي توسّع العمل عبر الحدود.',
        },
      },
      stats: {
        delivery: { suffix: '%', label: 'نسبة التسليم في الموعد' },
        rating: { suffix: '★', label: 'تقييم مشاريع المحتوى المستقلة' },
        promotion: { suffix: ' يوماً', label: 'الترقية إلى رئيس قسم الميديا بايينغ' },
      },
    },
    work: {
      eyebrow: 'معرض أعمال الفيديو الإعلاني',
      title: 'محتوى مصمّم ليوقف التمرير',
      description:
        'إعلانات تجارية للعلامات، وفيديوهات استجابة مباشرة قصيرة، ومونتاج طويل عالي الاحتفاظ — مرّر المؤشر فوق أي بطاقة للمعاينة.',
      categories: {
        all: 'كل الأعمال',
        commercial: 'إعلانات العلامات التجارية',
        'direct-response': 'إعلانات الاستجابة المباشرة',
        retention: 'مونتاج الاحتفاظ',
      },
      retentionLabel: 'نسبة الاحتفاظ',
      addEmbed: 'أضف رابط يوتيوب / فيميو',
      playAria: 'تشغيل',
      videos: {
        v1: {
          title: 'ريل خطّافات الاستجابة المباشرة',
          hook: '«توقّف عن التمرير إذا كنت تشحن دولياً...»',
        },
        v2: {
          title: 'إعلان UGC بصوت المؤسّس',
          hook: '«كدت لا أنشر هذا الفيديو...»',
        },
        v3: {
          title: 'إعلان تجاري — إطلاق منتج',
          hook: 'إعلان سينمائي مصمّم للانتشار المدفوع والعضوي',
        },
        v4: {
          title: 'إعلان تجاري — إبراز خدمة',
          hook: 'سرد يبني الثقة لعلامة قائمة على الخدمات',
        },
        v5: {
          title: 'مونتاج احتفاظ لبودكاست',
          hook: 'إعادة مونتاج محتوى طويل لأقصى نسبة احتفاظ بالجمهور',
        },
        v6: {
          title: 'مونتاج احتفاظ ليوتيوب',
          hook: 'مونتاج طويل مضبوط على متوسط مدة المشاهدة',
        },
      },
      gallery: {
        label: 'الأعمال الإبداعية وإثبات النتائج',
        categories: {
          all: 'الكل',
          creative: 'الإعلانات الإبداعية',
          brand: 'الهوية البصرية',
          proof: 'النتائج والشهادات',
        },
        viewAll: 'عرض المعرض الكامل',
        showLess: 'عرض أقل',
        itemAlt: 'نموذج عمل',
      },
    },
    experience: {
      eyebrow: 'سجل الإنجازات',
      title: 'الخط الزمني التفاعلي للخبرات',
      description:
        'أربع محطات وخيط واحد يجمعها: غرائز الإنتاج تتحوّل إلى أنظمة استحواذ. اضغط على أي دور لعرض تفاصيله.',
      current: 'حالياً',
      items: {
        freelance: {
          period: 'مسار مستمر / بالتوازي',
          role: 'مؤسس ومعد وسائط إعلانية — Freelance Creative & Growth Collective',
          org: 'عمل مستقل',
          location: 'عن بُعد عالمياً',
          tag: 'إنتاج الفيديو',
          summary:
            'تقديم خدمات التحرير عالي الاحتفاظ وحملات النمو للعملاء محلياً وعالمياً.',
          achievements: [
            'تنفيذ مونتاج فيديو عالي الاحتفاظ لصنّاع محتوى وعلامات DTC عالمية',
            'إنتاج حملات إعلانية محلية بالكامل: الفكرة، ودعم التصوير، والمونتاج',
            'بناء منهجية مونتاج قابلة للتكرار تبدأ من الخطّاف، انتقلت لاحقاً إلى العمل داخل الوكالات',
          ],
        },
        qareeba: {
          period: 'دور سابق',
          role: 'رئيس إدارة الحسابات ومسؤول الميديا بايينغ',
          org: 'وكالة قريبة للتسويق',
          location: 'عن بُعد',
          tag: 'شراء الميديا',
          summary:
            'الترقية خلال 30 يوماً، مع تحسين الـ ROAS وإدارة حل القيود الإعلانية مع ميتا عبر محفظة العملاء.',
          achievements: [
            'الترقية إلى قيادة القسم خلال 30 يوماً بناءً على الأداء وحده',
            'تحمّل مسؤولية الـ ROAS عبر محفظة العملاء النشطة بالكامل',
            'متابعة حالات تقييد الحسابات الإعلانية مع ميتا حتى حلّها',
          ],
        },
        truepixel: {
          period: 'دور سابق',
          role: 'قائد العمليات ومشاريع السوشيال ميديا',
          org: 'True Pixel — وكالة تسويق ألمانية',
          location: 'ألمانيا (عن بُعد)',
          tag: 'عمليات النمو',
          summary:
            'تأسيس قسم إدارة التواصل وتدريب فرق تطوير الأعمال وفق المعايير الأوروبية.',
          achievements: [
            'بناء تدفّقات عمل قسم السوشيال ميديا وإجراءاته التشغيلية من الصفر',
            'تدريب فرق تطوير الأعمال وفق معايير الوكالات الأوروبية',
            'وضع معايير التقارير التي اعتمدها فريق الحسابات بالكامل',
          ],
        },
        sts: {
          period: 'حالياً',
          role: 'أخصائي تسويق رقمي',
          org: 'STS — Smart Transportation Solutions Inc.',
          location: 'مركز العمليات الأمريكي',
          tag: 'النمو الشامل',
          summary:
            'قيادة مبادرات الاستحواذ والنمو للسوق الأمريكي وإنتاج الأصول الإعلانية المباشرة.',
          achievements: [
            'إدارة استراتيجية الاستحواذ الرقمي بالكامل لمركز العمليات الأمريكي',
            'إنتاج وإطلاق أصول فيديو استجابة مباشرة ضمن دورة اختبار مستمرة',
            'تشغيل تدفّقات عمليات التسويق العابرة للحدود بين عدّة فرق',
          ],
        },
      },
    },
    system: {
      eyebrow: 'نظام التشغيل',
      title: 'الأدوات والأنظمة التي تدير المحرّك',
      description: 'سلسلة الأدوات اليومية خلف كل حملة، وكل مونتاج، وكل تدفّق عمل مؤتمت.',
      tools: {
        'meta-ads': {
          name: 'Meta Ads Manager',
          role: 'شراء الميديا',
          description:
            'هيكلة الحملات عبر القمع الكامل، وضبط إيقاع الميزانيات، ومصفوفات اختبار المحتوى، والتحسين المدفوع بالـ ROAS عبر مواضع ميتا.',
        },
        n8n: {
          name: 'n8n Automation',
          role: 'عمليات التسويق',
          description:
            'تدفّقات عمل وخطوط بيانات مؤتمتة تربط المنصّات الإعلانية بأنظمة إدارة العملاء والتقارير — تحويل العمل اليدوي إلى أنظمة ذاتية التشغيل.',
        },
        premiere: {
          name: 'Adobe Premiere Pro',
          role: 'مونتاج الفيديو',
          description:
            'مونتاج موجّه للاستجابة المباشرة والاحتفاظ — ضبط الإيقاع، وتتابع القطعات، وبنية تبدأ من الخطّاف ومصمّمة للتمرير السريع.',
        },
        'after-effects': {
          name: 'Adobe After Effects',
          role: 'موشن غرافيك',
          description:
            'موشن غرافيك وترجمات حركية وطبقات بصرية ترفع مدة المشاهدة في المحتوى القصير والطويل.',
        },
        ga: {
          name: 'Google Analytics',
          role: 'القياس والتحليل',
          description:
            'تحليل القمع ومصادر الزيارات بما يغذّي قرارات المحتوى والميزانية داخل دورة شراء الميديا.',
        },
        'al-ameen': {
          name: 'Al-Ameen ERP',
          role: 'العمليات',
          description:
            'التقارير التشغيلية العابرة للحدود وتنسيق الموارد داخل نظام ERP الذي يدير مركز العمليات الأمريكي.',
        },
      },
    },
    contact: {
      eyebrow: 'تواصل وتعاون عالمي',
      title: 'ابدأ مشروعك القادم معي',
      description:
        'متاح لأدوار النمو بدوام كامل، وشراكات شراء الميديا، وإنتاج فيديوهات الاستجابة المباشرة.',
      emailLabel: 'البريد الإلكتروني',
      sendEmail: 'أرسل بريداً إلكترونياً',
      copy: 'نسخ العنوان',
      copied: 'تم النسخ',
      location: 'دمشق، سوريا / عمل عن بُعد عالمياً',
      socials: {
        linkedin: 'لينكد إن',
        github: 'غيت هب',
        whatsapp: 'واتساب',
      },
    },
    footer: {
      rights: 'مضر أكرم عليوي. مبني بـ React وTailwind وThree.js.',
      backToTop: 'العودة إلى الأعلى',
    },
  },
}
