import { image } from './helpers.js'

// Brand identity and advertising creative, grouped by client project.
// Each `image(path, title)` line is one asset; the title is shown as its
// caption in the viewer and read out as its alternative text.
export const designWorks = [
  {
    id: 'elewi-brand-identity-system',
    category: 'design',
    featured: true,
    coverFit: 'contain',
    title: { en: 'ELEWI Brand Identity System', ar: 'نظام الهوية البصرية ELEWI' },
    summary: {
      en: 'A complete identity system: mark, typography, colour, usage rules, and a structured delivery of every production file.',
      ar: 'نظام هوية متكامل يشمل الشعار والخطوط والألوان وقواعد الاستخدام، مع تسليم منظَّم لجميع ملفات الإنتاج.',
    },
    scope: [
      { en: 'Identity design', ar: 'تصميم الهوية' },
      { en: 'Brand guidelines', ar: 'دليل استخدام العلامة' },
      { en: 'Asset delivery system', ar: 'نظام تسليم الملفات' },
    ],
    media: [
      image('/assets/gallery/brand-elewi-identity-system.png', { en: 'ELEWI Brand Identity System', ar: 'نظام الهوية البصرية ELEWI' }),
    ],
  },
  {
    id: 'scoop-nutrition',
    category: 'design',
    coverFit: 'contain',
    title: { en: 'Scoop Nutrition: Identity and Product Campaign', ar: 'Scoop للتغذية: الهوية وحملة المنتجات' },
    summary: {
      en: 'Logo design and a series of product advertisements for a sports nutrition range.',
      ar: 'تصميم الشعار وسلسلة إعلانات للمنتجات لعلامة مكمّلات غذائية رياضية.',
    },
    scope: [
      { en: 'Logo design', ar: 'تصميم الشعار' },
      { en: 'Product advertising', ar: 'إعلانات المنتجات' },
      { en: 'Art direction', ar: 'الإخراج الفني' },
    ],
    media: [
      image('/assets/gallery/brand-scoop-logo.jpg', { en: 'Scoop Nutrition Logo', ar: 'شعار Scoop للتغذية' }),
      image('/assets/gallery/packshot-scoop-carbo-x.jpg', { en: 'Scoop Carbo X', ar: 'سكوب كاربو إكس' }),
      image('/assets/gallery/packshot-scoop-iso-pro.jpg', { en: 'Scoop Iso Pro Protein', ar: 'سكوب أيزو برو بروتين' }),
      image('/assets/gallery/packshot-scoop-max-mass-gainer.jpg', { en: 'Scoop Max Mass Gainer', ar: 'سكوب ماكس ماس غينر' }),
      image('/assets/gallery/packshot-scoop-max-mass-xl.png', { en: 'Scoop Max Mass XL', ar: 'سكوب ماكس ماس XL' }),
    ],
  },
  {
    id: 'net4speed',
    category: 'design',
    title: { en: 'Net4Speed: Identity and Service Campaigns', ar: 'Net4Speed: الهوية وحملات الخدمات' },
    summary: {
      en: 'A logo mark, a printed services card, and campaign creative for immigration and scholarship services.',
      ar: 'شعار وبطاقة خدمات مطبوعة وتصاميم حملات لخدمات الهجرة والمنح الدراسية.',
    },
    scope: [
      { en: 'Logo design', ar: 'تصميم الشعار' },
      { en: 'Print design', ar: 'تصميم المطبوعات' },
      { en: 'Campaign creative', ar: 'تصاميم الحملات' },
    ],
    media: [
      image('/assets/gallery/brand-net4speed-logo.jpg', { en: 'Net4Speed Logo Mark', ar: 'شعار Net4Speed' }),
      image('/assets/gallery/brand-net4speed-services-card.jpg', { en: 'Net4Speed Services Card', ar: 'بطاقة خدمات Net4Speed' }),
      image('/assets/gallery/campaign-net4speed-canada.jpg', { en: 'Canada Immigration — Arrima Program', ar: 'الهجرة إلى كندا — برنامج Arrima' }),
      image('/assets/gallery/campaign-net4speed-turkey.jpg', { en: 'Turkish Bachelor Scholarship', ar: 'المنحة التركية للبكالوريوس' }),
    ],
  },
  {
    id: 'sahnaya-news-identity',
    category: 'design',
    title: { en: 'Sahnaya News: Broadcast Identity', ar: 'سحنايا نيوز: هوية البث الإخباري' },
    summary: {
      en: 'A logo and on-screen broadcast frame for a local news outlet.',
      ar: 'شعار وإطار عرض على الشاشة لمنصة إخبارية محلية.',
    },
    scope: [
      { en: 'Logo design', ar: 'تصميم الشعار' },
      { en: 'Broadcast graphics', ar: 'غرافيك البث' },
    ],
    media: [
      image('/assets/gallery/brand-sahnaya-news-broadcast.png', { en: 'Sahnaya News Broadcast Frame', ar: 'إطار بث سحنايا نيوز' }),
      image('/assets/gallery/brand-sahnaya-news-logo.png', { en: 'Sahnaya News Logo', ar: 'شعار سحنايا نيوز' }),
    ],
  },
  {
    id: 'morekiting-launch-campaign',
    category: 'design',
    title: { en: 'Morekiting: Launch Campaign Creative', ar: 'موركيتينغ: تصاميم حملة الإطلاق' },
    summary: {
      en: 'Offer and pricing creative for the launch of a marketing services brand.',
      ar: 'تصاميم العروض والباقات لحملة إطلاق علامة متخصصة في خدمات التسويق.',
    },
    scope: [
      { en: 'Offer design', ar: 'تصميم العروض' },
      { en: 'Campaign creative', ar: 'تصاميم الحملات' },
    ],
    media: [
      image('/assets/gallery/campaign-morekiting-launch-boost.png', { en: 'Launch Boost Campaign Offer', ar: 'عرض حملة الانطلاقة السريعة' }),
      image('/assets/gallery/campaign-morekiting-launch-offer.jpg', { en: 'Morekiting Launch Offer', ar: 'عرض إطلاق موركيتينغ' }),
      image('/assets/gallery/campaign-morekiting-service-packages.png', { en: 'Morekiting Service Packages', ar: 'باقات خدمات موركيتينغ' }),
    ],
  },
  {
    id: 'clinic-seasonal-campaigns',
    category: 'design',
    title: { en: 'Seasonal Campaigns for Dental Clinics', ar: 'حملات موسمية لعيادات الأسنان' },
    summary: {
      en: 'Eid and Ramadan greeting creative produced for two dental practices.',
      ar: 'تصاميم تهنئة بالعيد ورمضان أُنتجت لعيادتَي أسنان.',
    },
    scope: [
      { en: 'Seasonal creative', ar: 'التصاميم الموسمية' },
      { en: 'Brand adaptation', ar: 'تكييف هوية العلامة' },
    ],
    media: [
      image('/assets/gallery/campaign-dr-yamen-eid.jpg', { en: 'Dr. Yamen Alzeidan — Eid Greeting', ar: 'د. يامن الزيدان — تهنئة العيد' }),
      image('/assets/gallery/campaign-duo-clinic-ramadan.jpg', { en: 'Duo Clinic — Ramadan Greeting', ar: 'عيادة ديو — تهنئة رمضان' }),
    ],
  },
]
