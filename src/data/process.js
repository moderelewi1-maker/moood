import { disciplines } from './capabilities.js'

// The project lifecycle shown in the "Approach" section, in order.
export const stages = [
  {
    id: 'brief-strategy',
    title: { en: 'Brief & Strategy', ar: 'الموجز والاستراتيجية' },
    text: {
      en: 'Objectives, audience, scope, and success measures are defined and agreed before work begins.',
      ar: 'تُحدَّد الأهداف والجمهور والنطاق ومؤشرات النجاح، ويُتَّفق عليها قبل بدء العمل.',
    },
  },
  {
    id: 'planning-resourcing',
    title: { en: 'Planning & Resourcing', ar: 'التخطيط وتوزيع الموارد' },
    text: {
      en: 'The roadmap, budget, team assignments, and delivery calendar are set.',
      ar: 'تُوضع خطة العمل والميزانية وتوزيع المهام وجدول التسليم.',
    },
  },
  {
    id: 'production',
    title: { en: 'Production', ar: 'الإنتاج' },
    text: {
      en: 'Creative, marketing, and technical teams execute in parallel under a single workflow.',
      ar: 'تنفّذ فرق الإبداع والتسويق والتقنية أعمالها بالتوازي ضمن مسار عمل واحد.',
    },
  },
  {
    id: 'quality-assurance',
    title: { en: 'Quality Assurance', ar: 'ضمان الجودة' },
    text: {
      en: 'Each deliverable is reviewed against its acceptance criteria and approved before release.',
      ar: 'يُراجَع كل مُخرَج وفق معايير القبول المحددة، ويُعتمد قبل إصداره.',
    },
  },
  {
    id: 'launch-optimization',
    title: { en: 'Launch & Optimization', ar: 'الإطلاق والتحسين' },
    text: {
      en: 'Work is released, measured against its targets, and refined on the evidence.',
      ar: 'يُطلق العمل، ويُقاس أداؤه مقارنةً بالمستهدفات، ويُحسَّن استناداً إلى النتائج.',
    },
  },
]

// Delivery standards. The first two figures come from Modar's own brief; the
// third is counted from the capabilities data so it never goes stale.
export const standards = [
  {
    id: 'on-time',
    value: '100%',
    label: { en: 'On-time milestone delivery', ar: 'تسليم المراحل في مواعيدها المحددة' },
  },
  {
    id: 'rating',
    value: '5/5',
    label: { en: 'Client rating on independent engagements', ar: 'تقييم العملاء في المشاريع المستقلة' },
  },
  {
    id: 'disciplines',
    value: String(disciplines.length),
    label: { en: 'Disciplines managed under one workflow', ar: 'تخصصات تُدار ضمن مسار عمل واحد' },
  },
]
