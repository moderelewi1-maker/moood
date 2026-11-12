import { images } from './helpers.js'

// Brand and design projects.
//
// ⚠ The image links below are ibb.co *viewer page* links, which cannot be
// displayed as images. Replace each with its direct https://i.ibb.co/… link,
// or with a file placed in /public/assets/works/ (see README → "Adding
// images"). Until then the project shows its line-art cover instead.
export const designWorks = [
  {
    id: 'advertising-creative-collection',
    category: 'design',
    featured: true,
    title: { en: 'Advertising Creative Collection', ar: 'مجموعة التصاميم الإعلانية' },
    summary: {
      en: 'Static advertising creative produced for paid social campaigns, from concept and layout to final artwork.',
      ar: 'تصاميم إعلانية ثابتة أُنتجت لحملات مدفوعة على وسائل التواصل الاجتماعي، من الفكرة والتخطيط إلى العمل الفني النهائي.',
    },
    scope: [
      { en: 'Art direction', ar: 'الإخراج الفني' },
      { en: 'Layout and artwork', ar: 'التخطيط والتنفيذ الفني' },
      { en: 'Campaign adaptation', ar: 'تكييف التصاميم للحملات' },
    ],
    media: images(
      'https://ibb.co/wNBT1Vrq',
      'https://ibb.co/FNcKH9F',
      'https://ibb.co/yGYhwvC',
      'https://ibb.co/4n1B21XR',
      'https://ibb.co/KpSVdDz9',
      'https://ibb.co/7JGHvs5r',
      'https://ibb.co/213m39Nt',
      'https://ibb.co/cS8Kygkv',
      'https://ibb.co/Gfn5FV2Z',
      'https://ibb.co/TMF7QmM5',
      'https://ibb.co/Hp7f3wKj',
      'https://ibb.co/P72mFnj',
      'https://ibb.co/KppFyrBv',
      'https://ibb.co/4nB140x9',
      'https://ibb.co/whXGFmYX',
      'https://ibb.co/DH5y6MNq',
      'https://ibb.co/60W7gFDn',
      'https://ibb.co/jddfh24',
      'https://ibb.co/j9qPLrth',
      'https://ibb.co/nsx319Jf',
      'https://ibb.co/WvT2jnSm',
      'https://ibb.co/4gstgtHT',
    ),
  },
  {
    id: 'brand-identity-systems',
    category: 'design',
    featured: true,
    title: { en: 'Brand Identity Systems', ar: 'أنظمة الهوية البصرية' },
    summary: {
      en: 'Identity work establishing consistent marks, typography, and visual standards across every brand touchpoint.',
      ar: 'أعمال هوية بصرية تُرسي اتساق الشعارات والخطوط والمعايير البصرية في مختلف نقاط حضور العلامة.',
    },
    scope: [
      { en: 'Identity design', ar: 'تصميم الهوية' },
      { en: 'Visual standards', ar: 'المعايير البصرية' },
      { en: 'Brand guidelines', ar: 'دليل استخدام العلامة' },
    ],
    media: images(
      'https://ibb.co/QtKgxCL',
      'https://ibb.co/qMwkRmXM',
      'https://ibb.co/Z1KVFW6S',
    ),
  },
]
