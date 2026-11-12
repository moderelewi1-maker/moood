import { image } from './helpers.js'

// Campaign strategy and paid media.
//
// Two kinds of entry live here and they are deliberately kept apart:
//
//   · The Meta Ads Performance Ledger carries VERIFIED figures, transcribed
//     from the Ads Manager capture in /assets/gallery. Its row-level data is
//     in src/data/adsAudit.js and is shown in the Results section.
//
//   · The four case studies describe how campaigns were structured. Their
//     ROAS / CAC / scaling figures are MODELLED, not pulled from an account,
//     so each one carries `illustrative: true`, which prints a disclosure
//     beside the numbers wherever they appear. To promote a study to
//     verified, replace its metrics with Ads Manager figures and delete the
//     `illustrative` line in the same edit.
export const campaignWorks = [
  {
    id: 'meta-ads-performance-ledger',
    category: 'campaigns',
    featured: true,
    format: 'caseStudy',
    cover: false, // the capture is a dense table; the line-art cover reads better
    title: { en: 'Meta Ads Performance Ledger', ar: 'سجل أداء حملات Meta الإعلانية' },
    summary: {
      en: 'Account-level results read directly from Meta Ads Manager, across customer acquisition, messaging, and reach campaigns.',
      ar: 'نتائج على مستوى الحساب مأخوذة مباشرةً من مدير إعلانات Meta، تشمل حملات اكتساب العملاء والمحادثات والوصول.',
    },
    scope: [
      { en: 'Paid media management', ar: 'إدارة الإعلانات المدفوعة' },
      { en: 'Budget scaling', ar: 'توسيع الميزانيات' },
      { en: 'Performance analysis', ar: 'تحليل الأداء' },
    ],
    details: {
      reading: {
        en: 'These campaigns were optimized for reach, link clicks, profile visits, and messaging, not for direct sales. Cost per result therefore reflects the objective selected for each campaign rather than customer acquisition cost.',
        ar: 'حُسِّنت هذه الحملات لأهداف الوصول والنقرات على الروابط وزيارات الملف الشخصي وبدء المحادثات، لا للمبيعات المباشرة. لذلك تعكس تكلفة النتيجة الهدف المحدَّد لكل حملة، لا تكلفة اكتساب العميل.',
      },
      platform: 'Meta Ads Manager',
    },
    metrics: [
      { label: 'spend', value: '$4,163' },
      { label: 'reach', value: '37.27M' },
      { label: 'impressions', value: '52.67M' },
      { label: 'frequency', value: '1.41' },
    ],
    media: [
      image('/assets/gallery/meta-ads-scaling-proof.png', {
        en: 'Meta Ads Manager account capture',
        ar: 'لقطة من حساب مدير إعلانات Meta',
      }),
    ],
  },
  {
    id: 'b2b-lead-generation-us',
    category: 'campaigns',
    illustrative: true,
    title: {
      en: 'B2B Lead Generation for the U.S. Logistics Market',
      ar: 'توليد العملاء المحتملين لقطاع الخدمات اللوجستية في السوق الأمريكية',
    },
    summary: {
      en: 'A paid acquisition program generating qualified business leads for cross-border freight services.',
      ar: 'برنامج اكتساب مدفوع لتوليد عملاء محتملين مؤهَّلين من الشركات لخدمات الشحن العابر للحدود.',
    },
    scope: [
      { en: 'Acquisition strategy', ar: 'استراتيجية اكتساب العملاء' },
      { en: 'Paid media management', ar: 'إدارة الإعلانات المدفوعة' },
      { en: 'Creative testing', ar: 'اختبار المواد الإعلانية' },
    ],
    details: {
      objective: {
        en: 'Establish a consistent flow of qualified business leads at a sustainable cost per lead.',
        ar: 'تأمين تدفق ثابت من العملاء المحتملين المؤهَّلين بتكلفة مستدامة لكل عميل محتمل.',
      },
      approach: {
        en: 'A structured testing matrix of direct-response video at the top of the funnel, retargeting built on watch-time audiences, and weekly budget pacing against cost per qualified lead.',
        ar: 'مصفوفة اختبار منظَّمة لفيديوهات الاستجابة المباشرة في أعلى مسار التحويل، وإعادة استهداف مبنية على شرائح مدة المشاهدة، وضبط أسبوعي للميزانية وفق تكلفة العميل المحتمل المؤهَّل.',
      },
      platform: 'Meta Ads Manager',
    },
    metrics: [
      { label: 'roas', value: '4.2x' },
      { label: 'cac', value: '-38%' },
      { label: 'scale', value: '3.5x' },
    ],
  },
  {
    id: 'account-recovery',
    category: 'campaigns',
    illustrative: true,
    title: {
      en: 'Account Recovery and Performance Restoration',
      ar: 'استعادة الحسابات الإعلانية وإعادة الأداء إلى الربحية',
    },
    summary: {
      en: 'Restricted advertising accounts across a multi-sector client portfolio returned to active, profitable delivery.',
      ar: 'إعادة حسابات إعلانية مقيَّدة ضمن محفظة عملاء متعددة القطاعات إلى العمل الفعّال والمربح.',
    },
    scope: [
      { en: 'Account governance', ar: 'حوكمة الحسابات الإعلانية' },
      { en: 'Campaign restructuring', ar: 'إعادة هيكلة الحملات' },
      { en: 'Creative refresh', ar: 'تحديث المواد الإعلانية' },
    ],
    details: {
      objective: {
        en: 'Recover restricted accounts and restore a profitable return on ad spend.',
        ar: 'استعادة الحسابات المقيَّدة وإعادة العائد على الإنفاق الإعلاني إلى مستوى مربح.',
      },
      approach: {
        en: 'Restriction cases resolved directly with platform support, campaigns restructured into consolidated ad sets, and creative refreshed on a fixed cycle to reset auction performance.',
        ar: 'معالجة حالات التقييد مباشرةً مع فريق دعم المنصة، وإعادة هيكلة الحملات ضمن مجموعات إعلانية موحَّدة، وتحديث المواد الإعلانية وفق دورة ثابتة لاستعادة الأداء في المزاد الإعلاني.',
      },
      platform: 'Meta Ads Manager',
    },
    metrics: [
      { label: 'roas', value: '3.6x' },
      { label: 'cac', value: '-31%' },
      { label: 'scale', value: '2.0x' },
    ],
  },
  {
    id: 'local-demand-generation',
    category: 'campaigns',
    illustrative: true,
    title: {
      en: 'Local Demand Generation for Retail and Services',
      ar: 'تحفيز الطلب المحلي لقطاعَي التجزئة والخدمات',
    },
    summary: {
      en: 'Campaigns for small and mid-sized businesses, driving in-store visits and direct-message enquiries.',
      ar: 'حملات للمنشآت الصغيرة والمتوسطة تستهدف زيادة زيارات المتاجر والاستفسارات عبر الرسائل المباشرة.',
    },
    scope: [
      { en: 'Local market strategy', ar: 'استراتيجية السوق المحلية' },
      { en: 'Offer development', ar: 'صياغة العروض' },
      { en: 'Paid media management', ar: 'إدارة الإعلانات المدفوعة' },
    ],
    details: {
      objective: {
        en: 'Increase in-store and direct-message demand within the local market.',
        ar: 'زيادة الطلب عبر زيارات المتاجر والرسائل المباشرة ضمن السوق المحلية.',
      },
      approach: {
        en: 'Offer-led creative with precise geographic targeting, message-optimized objectives, and a lean testing budget scaled only behind proven angles.',
        ar: 'مواد إعلانية تتمحور حول العرض، مع استهداف جغرافي دقيق وأهداف محسَّنة للرسائل، وميزانية اختبار محدودة لا تُرفع إلا للرسائل الإعلانية التي أثبتت فاعليتها.',
      },
      platform: 'Meta Ads Manager',
    },
    metrics: [
      { label: 'roas', value: '5.1x' },
      { label: 'cac', value: '-27%' },
      { label: 'scale', value: '2.4x' },
    ],
  },
  {
    id: 'b2b-pipeline-europe',
    category: 'campaigns',
    illustrative: true,
    title: {
      en: 'B2B Pipeline Development for the European Market',
      ar: 'بناء مسار مبيعات للشركات في السوق الأوروبية',
    },
    summary: {
      en: 'A repeatable business-to-business pipeline built from a standing start through content operations and paid amplification.',
      ar: 'مسار مبيعات قابل للتكرار بين الشركات، بُني من نقطة البداية عبر عمليات المحتوى والترويج المدفوع.',
    },
    scope: [
      { en: 'Content operations', ar: 'عمليات المحتوى' },
      { en: 'Paid amplification', ar: 'الترويج المدفوع' },
      { en: 'Reporting standards', ar: 'معايير التقارير' },
    ],
    details: {
      objective: {
        en: 'Build a repeatable B2B sales pipeline from a standing start.',
        ar: 'بناء مسار مبيعات قابل للتكرار بين الشركات انطلاقاً من نقطة البداية.',
      },
      approach: {
        en: 'A content operation governed by documented procedures and supported by paid amplification, with reporting standards that let the sales team act on the same figures.',
        ar: 'منظومة محتوى تحكمها إجراءات عمل موثَّقة وتدعمها حملات ترويج مدفوعة، مع معايير تقارير تتيح لفريق المبيعات العمل استناداً إلى الأرقام نفسها.',
      },
      platform: {
        en: 'Meta Ads · Organic social',
        ar: 'Meta Ads · المحتوى غير المدفوع على وسائل التواصل',
      },
    },
    metrics: [
      { label: 'roas', value: '2.8x' },
      { label: 'cac', value: '-22%' },
      { label: 'scale', value: '1.8x' },
    ],
  },
]
