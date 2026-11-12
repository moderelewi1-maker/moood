import { video } from './helpers.js'

// Video production. Every film here is a file in /public/assets/video with
// a matching poster image. `details.style` is an editorial description of
// the cut, not a performance figure.
export const videoWorks = [
  {
    id: 'cinematic-production-reel',
    category: 'video',
    featured: true,
    title: { en: 'Cinematic Production Reel', ar: 'عرض الإنتاج المرئي' },
    summary: {
      en: 'A 26-second reel of production work that opens on the footage itself rather than on a pitch.',
      ar: 'عرض مدته 26 ثانية لأعمال الإنتاج، يبدأ بالمشهد نفسه لا بالحديث عنه.',
    },
    scope: [
      { en: 'Direction', ar: 'الإخراج' },
      { en: 'Cinematography', ar: 'التصوير' },
      { en: 'Editing', ar: 'المونتاج' },
    ],
    details: {
      concept: { en: 'Opens on the work, not the pitch.', ar: 'يبدأ بالمشهد، لا بالكلام عنه.' },
      pacing: { en: 'Cinematic, with kinetic caption cuts.', ar: 'إيقاع سينمائي مع قطعات تصاحبها نصوص حركية.' },
      style: { en: 'Performance edit', ar: 'مونتاج موجَّه للأداء' },
    },
    media: [
      video('/assets/video/video-production-reel.mp4', {
        poster: '/assets/video/video-production-reel-poster.jpg',
        orientation: 'vertical',
        duration: '0:26',
        // Presented silent by design, in every player.
        forceMuted: true,
      }),
    ],
  },
  {
    id: 'adidas-brand-explainer',
    category: 'video',
    title: { en: 'Adidas Brand Explainer', ar: 'فيديو تعريفي بعلامة أديداس' },
    summary: {
      en: 'A 15-second product-led motion piece that establishes the brand story in its first frame.',
      ar: 'عمل حركي مدته 15 ثانية يتمحور حول المنتج، ويقدّم قصة العلامة منذ اللقطة الأولى.',
    },
    scope: [
      { en: 'Motion design', ar: 'التصميم الحركي' },
      { en: 'Editing', ar: 'المونتاج' },
    ],
    details: {
      concept: { en: 'The origin story lands in the first frame.', ar: 'تبدأ القصة من اللقطة الأولى.' },
      pacing: { en: 'Quick, with product-led motion.', ar: 'إيقاع سريع تقوده حركة المنتج.' },
      style: { en: 'Product-led motion', ar: 'حركة يقودها المنتج' },
    },
    media: [
      video('/assets/video/video-adidas-reel.mp4', {
        poster: '/assets/video/video-adidas-reel-poster.jpg',
        orientation: 'vertical',
        duration: '0:15',
      }),
    ],
  },
  {
    id: 'marketing-services-explainer',
    category: 'video',
    title: { en: 'Marketing Services Explainer', ar: 'فيديو تعريفي بخدمات التسويق' },
    summary: {
      en: 'A 30-second typographic explainer that states the problem before presenting the offer.',
      ar: 'فيديو تعريفي مدته 30 ثانية يعتمد على الطباعة الحركية، ويعرض المشكلة قبل تقديم الحل.',
    },
    scope: [
      { en: 'Scriptwriting', ar: 'كتابة النص' },
      { en: 'Motion design', ar: 'التصميم الحركي' },
      { en: 'Editing', ar: 'المونتاج' },
    ],
    details: {
      concept: { en: 'Lead with the problem, then the offer.', ar: 'البدء بالمشكلة قبل تقديم الحل.' },
      pacing: { en: 'Measured, with a typographic build.', ar: 'إيقاع متزن وبناء طباعي متدرّج.' },
      style: { en: 'Typographic build', ar: 'بناء طباعي' },
    },
    media: [
      video('/assets/video/video-marketing-explainer.mp4', {
        poster: '/assets/video/video-marketing-explainer-poster.jpg',
        orientation: 'vertical',
        duration: '0:30',
      }),
    ],
  },
  {
    id: 'animated-follow-call-to-action',
    category: 'video',
    title: { en: 'Animated Follow Call to Action', ar: 'دعوة متحركة للمتابعة' },
    summary: {
      en: 'A 22-second looping animation in which a single silhouette carries the call to follow.',
      ar: 'رسم متحرك متكرر مدته 22 ثانية، تحمل فيه حركة ظلّ واحد الدعوة إلى المتابعة.',
    },
    scope: [
      { en: 'Animation', ar: 'التحريك' },
      { en: 'Motion design', ar: 'التصميم الحركي' },
    ],
    details: {
      concept: { en: 'The silhouette drives the loop.', ar: 'حركة الظلّ تبني الحلقة البصرية.' },
      pacing: { en: 'Looping, with minimal silhouette animation.', ar: 'حلقة متكررة بتحريك ظلّي بسيط.' },
      style: { en: 'Loop structure', ar: 'بنية تكرار بصرية' },
    },
    media: [
      video('/assets/video/video-social-cta.mp4', {
        poster: '/assets/video/video-social-cta-poster.jpg',
        orientation: 'vertical',
        duration: '0:22',
      }),
    ],
  },
  {
    id: 'motion-graphics-showcase',
    category: 'video',
    title: { en: 'Motion Graphics Showcase', ar: 'عرض الرسوم المتحركة' },
    summary: {
      en: 'A 10-second motion graphics piece in which typography is revealed on the beat.',
      ar: 'عمل رسوم متحركة مدته 10 ثوانٍ، يظهر فيه النص منسجماً مع الإيقاع.',
    },
    scope: [
      { en: 'Motion graphics', ar: 'الرسوم المتحركة' },
      { en: 'Compositing', ar: 'التركيب البصري' },
    ],
    details: {
      concept: { en: 'Typography is revealed on the beat.', ar: 'ظهور النصوص منسجم مع الإيقاع.' },
      pacing: { en: 'Dense, composited in After Effects.', ar: 'إيقاع مكثَّف بتركيب منفَّذ في After Effects.' },
      style: { en: 'Brand-focused motion', ar: 'رسوم متحركة للعلامة' },
    },
    media: [
      video('/assets/video/video-motion-showcase.mp4', {
        poster: '/assets/video/video-motion-showcase-poster.jpg',
        duration: '0:10',
      }),
    ],
  },
]
