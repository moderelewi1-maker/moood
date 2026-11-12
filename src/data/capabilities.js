// Capabilities — two tiers.
//   `leadership`  : executive and governance competencies (how the work is led)
//   `disciplines` : functional expertise practiced first-hand (what is led)
// Add, remove or reorder entries freely; the section lays itself out.

export const leadership = [
  {
    id: 'executive-leadership',
    title: { en: 'Executive Leadership', ar: 'القيادة التنفيذية' },
    text: {
      en: 'Setting direction, priorities, and performance standards for multidisciplinary teams, with full accountability for outcomes.',
      ar: 'تحديد التوجهات والأولويات ومعايير الأداء لفرق متعددة التخصصات، مع تحمّل المسؤولية الكاملة عن النتائج.',
    },
  },
  {
    id: 'cross-departmental-workflow',
    title: { en: 'Cross-Departmental Workflow Management', ar: 'إدارة سير العمل بين الأقسام' },
    text: {
      en: 'Aligning marketing, creative, technical, and operations teams around shared workflows, clear handoffs, and a single delivery calendar.',
      ar: 'توحيد عمل فرق التسويق والإبداع والتقنية والعمليات ضمن مسارات عمل مشتركة، ونقاط تسليم واضحة، وجدول تنفيذ واحد.',
    },
  },
  {
    id: 'strategic-planning',
    title: { en: 'Strategic Planning', ar: 'التخطيط الاستراتيجي' },
    text: {
      en: 'Translating business objectives into roadmaps, budgets, and measurable targets that teams can execute against.',
      ar: 'تحويل أهداف العمل إلى خطط مرحلية وميزانيات ومؤشرات قابلة للقياس تلتزم بها الفرق في التنفيذ.',
    },
  },
  {
    id: 'quality-control',
    title: { en: 'Quality Control', ar: 'ضبط الجودة' },
    text: {
      en: 'Defining acceptance criteria and review gates so that every deliverable meets a consistent standard before release.',
      ar: 'وضع معايير القبول ومراحل المراجعة لضمان مطابقة كل مُخرَج لمستوى ثابت من الجودة قبل اعتماده.',
    },
  },
  {
    id: 'project-lifecycle-governance',
    title: { en: 'Project Lifecycle Governance', ar: 'حوكمة دورة حياة المشاريع' },
    text: {
      en: 'Governing each project from brief and scope through production, approval, launch, and post-delivery review.',
      ar: 'ضبط كل مشروع من موجز العمل وتحديد النطاق، مروراً بالإنتاج والاعتماد والإطلاق، وصولاً إلى مراجعة ما بعد التسليم.',
    },
  },
  {
    id: 'process-design-team-development',
    title: { en: 'Process Design & Team Development', ar: 'تصميم الإجراءات وتطوير الفرق' },
    text: {
      en: 'Documenting standard operating procedures, establishing reporting standards, and training teams to work to them.',
      ar: 'توثيق إجراءات العمل المعيارية، ووضع معايير التقارير، وتدريب الفرق على الالتزام بها.',
    },
  },
]

// `icon` is a key of the ICONS map in components/sections/Capabilities.jsx.
// `tools` lists tools and credentials by their proper names (not translated);
// leave it empty and the row is simply not shown.
export const disciplines = [
  {
    id: 'digital-marketing',
    icon: 'Target',
    title: { en: 'Digital Marketing & Growth', ar: 'التسويق الرقمي والنمو' },
    items: [
      { en: 'Paid media strategy and budget allocation', ar: 'استراتيجيات الإعلانات المدفوعة وتوزيع الميزانيات' },
      { en: 'Full-funnel customer acquisition', ar: 'اكتساب العملاء عبر مسار التحويل الكامل' },
      { en: 'Performance analytics and attribution', ar: 'تحليل الأداء وإسناد النتائج' },
      { en: 'Return on ad spend (ROAS) optimization', ar: 'تحسين العائد على الإنفاق الإعلاني (ROAS)' },
    ],
    tools: ['Meta Ads Manager', 'Google Analytics', 'Meta Blueprint'],
  },
  {
    id: 'video-audio-production',
    icon: 'Clapperboard',
    title: { en: 'Video & Audio Production', ar: 'الإنتاج المرئي والصوتي' },
    items: [
      { en: 'Direction and on-location production', ar: 'الإخراج والإنتاج الميداني' },
      { en: 'Editing and post-production', ar: 'المونتاج وعمليات ما بعد الإنتاج' },
      { en: 'Audio recording, editing, and mixing', ar: 'تسجيل الصوت وتحريره ومزجه' },
      { en: 'Commercial, long-form, and short-form formats', ar: 'الإعلانات التجارية والمحتوى الطويل والقصير' },
    ],
    tools: ['Adobe Premiere Pro'],
  },
  {
    id: 'brand-visual-design',
    icon: 'PenTool',
    title: { en: 'Brand & Visual Design', ar: 'الهوية والتصميم البصري' },
    items: [
      { en: 'Brand identity systems', ar: 'أنظمة الهوية البصرية' },
      { en: 'Advertising and campaign creative', ar: 'التصاميم الإعلانية ومواد الحملات' },
      { en: 'Art direction and visual standards', ar: 'الإخراج الفني والمعايير البصرية' },
      { en: 'Motion graphics', ar: 'الرسوم المتحركة (موشن غرافيك)' },
    ],
    tools: ['Adobe After Effects'],
  },
  {
    id: '3d-motion',
    icon: 'Box',
    title: { en: '3D & Motion', ar: 'التصميم ثلاثي الأبعاد' },
    items: [
      { en: '3D modeling and visualization', ar: 'النمذجة والتصوّر ثلاثي الأبعاد' },
      { en: 'Product and environment rendering', ar: 'الإظهار ثلاثي الأبعاد للمنتجات والبيئات' },
      { en: '3D animation for campaign and brand content', ar: 'التحريك ثلاثي الأبعاد لمحتوى الحملات والعلامات التجارية' },
      { en: 'Integration of 3D assets into video and web', ar: 'دمج العناصر ثلاثية الأبعاد في الفيديو والويب' },
    ],
    tools: [],
  },
  {
    id: 'ai-workflows-automation',
    icon: 'Workflow',
    title: { en: 'AI Workflows & Automation', ar: 'مسارات الذكاء الاصطناعي والأتمتة' },
    items: [
      { en: 'AI-assisted content and production pipelines', ar: 'مسارات إنتاج المحتوى المدعومة بالذكاء الاصطناعي' },
      { en: 'Workflow automation across platforms', ar: 'أتمتة سير العمل بين المنصات' },
      { en: 'Data integration between advertising, CRM, and reporting systems', ar: 'ربط بيانات المنصات الإعلانية وأنظمة إدارة العملاء والتقارير' },
      { en: 'ERP-based operational reporting', ar: 'التقارير التشغيلية عبر أنظمة تخطيط الموارد (ERP)' },
    ],
    tools: ['n8n', 'Al-Ameen ERP'],
  },
  {
    id: 'web-development',
    icon: 'CodeXml',
    title: { en: 'Web Development', ar: 'تطوير الويب' },
    items: [
      { en: 'Websites and landing pages', ar: 'المواقع الإلكترونية وصفحات الهبوط' },
      { en: 'Front-end development and interactive experiences', ar: 'تطوير الواجهات والتجارب التفاعلية' },
      { en: 'Performance, tracking, and analytics implementation', ar: 'تحسين الأداء وإعداد التتبّع والتحليلات' },
      { en: 'Deployment and maintenance', ar: 'النشر والصيانة' },
    ],
    tools: ['React', 'Tailwind CSS', 'Three.js'],
  },
]
