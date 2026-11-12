import { embed, video } from './helpers.js'

// Video production projects.
//
// Films with an empty `embed('')` have no published link yet: the project
// still appears in the portfolio and its viewer states that the footage is
// available on request. Paste a YouTube or Vimeo URL to make it playable.
//
// ⚠ VERIFY BEFORE PUBLISHING: the `metrics` figures below were carried over
// from the previous version of the site. Confirm each against platform
// analytics, or delete the `metrics` line.
export const videoWorks = [
  {
    id: 'brand-commercial-product-launch',
    category: 'video',
    featured: true,
    title: { en: 'Brand Commercial: Product Launch', ar: 'إعلان تجاري: إطلاق منتج' },
    summary: {
      en: "A 60-second launch film that opens on the customer's problem before introducing the product.",
      ar: 'فيلم إطلاق مدته 60 ثانية يبدأ من مشكلة العميل قبل تقديم المنتج.',
    },
    scope: [
      { en: 'Direction', ar: 'الإخراج' },
      { en: 'Production', ar: 'الإنتاج' },
      { en: 'Post-production', ar: 'ما بعد الإنتاج' },
    ],
    details: {
      concept: {
        en: 'A cinematic opening built on the problem rather than the product.',
        ar: 'افتتاحية سينمائية تنطلق من المشكلة لا من المنتج.',
      },
      pacing: {
        en: 'Cinematic, at 2.4 seconds per shot on average.',
        ar: 'إيقاع سينمائي بمتوسط 2.4 ثانية للّقطة.',
      },
    },
    media: [embed('', { poster: '/assets/video/commercial-launch-poster.jpg', duration: '1:00' })],
  },
  {
    id: 'podcast-retention-edit',
    category: 'video',
    title: { en: 'Podcast Edit for Audience Retention', ar: 'مونتاج بودكاست يعزّز استبقاء الجمهور' },
    summary: {
      en: 'A long-form podcast episode restructured to hold attention from its first seconds.',
      ar: 'حلقة بودكاست طويلة أُعيد بناؤها للحفاظ على انتباه المشاهد منذ الثواني الأولى.',
    },
    scope: [
      { en: 'Editorial structure', ar: 'البناء التحريري' },
      { en: 'Video editing', ar: 'المونتاج' },
      { en: 'Audio post-production', ar: 'المعالجة الصوتية' },
    ],
    details: {
      concept: {
        en: 'An opening drawn from the strongest twenty seconds of the episode.',
        ar: 'افتتاحية مأخوذة من أقوى عشرين ثانية في الحلقة.',
      },
      pacing: {
        en: 'Dense, with every idle moment removed.',
        ar: 'إيقاع مكثَّف تُحذف فيه كل لحظة فراغ.',
      },
    },
    metrics: [{ label: 'avd', value: '+44%' }],
    media: [embed('', { poster: '/assets/video/podcast-retention-poster.jpg', duration: '12:04' })],
  },
  {
    id: 'brand-commercial-service',
    category: 'video',
    title: { en: 'Brand Commercial: Service Spotlight', ar: 'إعلان تجاري: التعريف بخدمة' },
    summary: {
      en: "A 45-second interview-led film that presents the founder's credibility as proof for the customer.",
      ar: 'فيلم مدته 45 ثانية يعتمد على المقابلة، ويقدّم مصداقية المؤسس دليلاً يطمئن العميل.',
    },
    scope: [
      { en: 'Direction', ar: 'الإخراج' },
      { en: 'Interview production', ar: 'إنتاج المقابلات' },
      { en: 'Post-production', ar: 'ما بعد الإنتاج' },
    ],
    details: {
      concept: {
        en: "The founder's credibility presented as customer proof.",
        ar: 'تقديم مصداقية المؤسس بوصفها دليلاً للعميل.',
      },
      pacing: {
        en: 'Measured and interview-led.',
        ar: 'إيقاع متزن يقوم على المقابلة.',
      },
    },
    media: [embed('', { poster: '/assets/video/commercial-service-poster.jpg', duration: '0:45' })],
  },
  {
    id: 'long-form-youtube-edit',
    category: 'video',
    title: { en: 'Long-Form YouTube Edit', ar: 'مونتاج محتوى طويل ليوتيوب' },
    summary: {
      en: 'A chaptered long-form edit that states its value to the viewer within the first eight seconds.',
      ar: 'مونتاج لمحتوى طويل مقسَّم إلى فصول، يوضّح للمشاهد قيمته خلال الثواني الثماني الأولى.',
    },
    scope: [
      { en: 'Editorial structure', ar: 'البناء التحريري' },
      { en: 'Video editing', ar: 'المونتاج' },
      { en: 'Motion graphics', ar: 'الرسوم المتحركة' },
    ],
    details: {
      concept: {
        en: 'The value to the viewer is stated within the first eight seconds.',
        ar: 'توضيح القيمة التي سيحصل عليها المشاهد خلال الثواني الثماني الأولى.',
      },
      pacing: {
        en: 'Chaptered, with a change of pattern every 30 seconds.',
        ar: 'تقسيم إلى فصول مع تغيير في النمط البصري كل 30 ثانية.',
      },
    },
    metrics: [{ label: 'avd', value: '+31%' }],
    media: [embed('', { poster: '/assets/video/youtube-retention-poster.jpg', duration: '9:22' })],
  },
  {
    id: 'direct-response-video-ad',
    category: 'video',
    title: { en: 'Direct-Response Video Advertisement', ar: 'إعلان فيديو للاستجابة المباشرة' },
    summary: {
      en: 'A 32-second vertical advertisement built around a direct opening line addressed to international shippers.',
      ar: 'إعلان عمودي مدته 32 ثانية، مبني على جملة افتتاحية مباشرة موجَّهة إلى شركات الشحن الدولي.',
    },
    scope: [
      { en: 'Scriptwriting', ar: 'كتابة النص' },
      { en: 'Production', ar: 'الإنتاج' },
      { en: 'Video editing', ar: 'المونتاج' },
    ],
    details: {
      concept: {
        en: 'Opening line: “Stop scrolling if you ship internationally.”',
        ar: 'الجملة الافتتاحية: «توقّف عن التمرير إن كنت تشحن دولياً».',
      },
      pacing: {
        en: 'Fast, at 1.2 seconds per shot on average.',
        ar: 'إيقاع سريع بمتوسط 1.2 ثانية للّقطة.',
      },
    },
    metrics: [{ label: 'ctr', value: '+38%' }],
    media: [
      video('/assets/video/video1.mp4', {
        poster: '/assets/video/video1-poster.jpg',
        orientation: 'vertical',
        duration: '0:32',
      }),
    ],
  },
  {
    id: 'founder-led-advertisement',
    category: 'video',
    title: { en: 'Founder-Led Advertisement', ar: 'إعلان يقدّمه المؤسس' },
    summary: {
      en: 'A 41-second handheld advertisement delivered by the founder in a deliberately informal, platform-native style.',
      ar: 'إعلان مدته 41 ثانية مصوَّر بكاميرا محمولة، يقدّمه المؤسس بأسلوب عفوي مقصود يلائم طبيعة المنصة.',
    },
    scope: [
      { en: 'Creative direction', ar: 'التوجيه الإبداعي' },
      { en: 'Production', ar: 'الإنتاج' },
      { en: 'Video editing', ar: 'المونتاج' },
    ],
    details: {
      concept: {
        en: 'Opening line: “I almost didn’t post this.”',
        ar: 'الجملة الافتتاحية: «كدتُ ألّا أنشر هذا الفيديو».',
      },
      pacing: {
        en: 'Handheld and informal by design.',
        ar: 'تصوير بكاميرا محمولة وأسلوب عفوي مقصود.',
      },
    },
    metrics: [{ label: 'ctr', value: '+52%' }],
    media: [
      video('/assets/video/video2.mp4', {
        poster: '/assets/video/video2-poster.jpg',
        orientation: 'vertical',
        duration: '0:41',
      }),
    ],
  },
  {
    id: 'offer-led-short-form-ad',
    category: 'video',
    title: { en: 'Offer-Led Short-Form Advertisement', ar: 'إعلان قصير يتمحور حول العرض' },
    summary: {
      en: 'A 28-second vertical advertisement that answers the price objection in its opening frame.',
      ar: 'إعلان عمودي مدته 28 ثانية يعالج اعتراض السعر في لقطته الأولى.',
    },
    scope: [
      { en: 'Offer development', ar: 'صياغة العرض' },
      { en: 'Video editing', ar: 'المونتاج' },
      { en: 'Motion graphics', ar: 'الرسوم المتحركة' },
    ],
    details: {
      concept: {
        en: 'The price objection is answered in the opening frame.',
        ar: 'معالجة اعتراض السعر في اللقطة الأولى.',
      },
      pacing: {
        en: 'Quick cuts, with on-screen text timed to the beat.',
        ar: 'قطعات سريعة مع نصوص متزامنة مع الإيقاع.',
      },
    },
    metrics: [{ label: 'ctr', value: '+29%' }],
    media: [
      embed('', {
        poster: '/assets/video/reels-offer-poster.jpg',
        orientation: 'vertical',
        duration: '0:28',
      }),
    ],
  },
]
