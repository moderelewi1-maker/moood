import { image } from './helpers.js'

// AI and automation architectures built in n8n.
//
// Everything in `stack`, `details.nodes` and the metrics was read off the
// workflow diagrams themselves — node names, node counts, the four SQL
// stages, the Postgres chat memory. They describe the graph; they are not
// claims about results.
//
// A metric marked `kind: 'target'` is a design goal of the system, not a
// measured production figure, and is labelled as such wherever it is shown.
export const automationWorks = [
  {
    id: 'lead-qualification-agent',
    category: 'ai',
    featured: true,
    format: 'system',
    coverFit: 'contain',
    title: { en: 'Autonomous Lead Qualification Agent', ar: 'وكيل ذكي لتأهيل العملاء المحتملين' },
    summary: {
      en: 'Inbound enquiries no longer wait for someone to be available. A webhook passes each one to an agent that reads it, decides whether it qualifies, records it in the CRM sheet, and replies on WhatsApp, with an email route kept for the cases that warrant one.',
      ar: 'لم تعد الاستفسارات الواردة تنتظر ردّاً بشرياً. يستقبلها Webhook ويمرّرها إلى وكيل يقرؤها، ويقرّر ما إذا كانت مؤهَّلة، ويسجّلها في جدول العملاء، ثم يردّ عبر واتساب، مع إبقاء مسار البريد الإلكتروني للحالات التي تستدعيه.',
    },
    scope: [
      { en: 'Workflow architecture', ar: 'تصميم بنية سير العمل' },
      { en: 'AI agent design', ar: 'تصميم الوكيل الذكي' },
      { en: 'CRM integration', ar: 'الربط مع نظام العملاء' },
    ],
    stack: ['n8n', 'Webhook', 'OpenAI API', 'Google Sheets API', 'UltraMsg WhatsApp', 'Gmail'],
    details: {
      nodes: 'Webhook · AI Agent · OpenAI Chat Model · Simple Memory · Append row in sheet · HTTP Request · If · Send a message',
    },
    metrics: [
      { label: { en: 'Nodes in the workflow', ar: 'عدد العُقد في المسار' }, value: '8' },
      { label: { en: 'Trigger', ar: 'المُشغِّل' }, value: 'Webhook' },
      { kind: 'target', label: { en: 'Response time', ar: 'زمن الاستجابة' }, value: '< 2s' },
    ],
    media: [
      image('/assets/gallery/n8n-ai-lead-agent.jpg', {
        en: 'Workflow diagram: lead qualification agent',
        ar: 'مخطط سير العمل: وكيل تأهيل العملاء',
      }),
    ],
  },
  {
    id: 'relational-conversation-pipeline',
    category: 'ai',
    format: 'system',
    coverFit: 'contain',
    title: { en: 'Relational Conversation Pipeline', ar: 'مسار معالجة المحادثات المرتبط بقاعدة البيانات' },
    summary: {
      en: 'The same idea at production scale. Four SQL stages establish who the contact is and what has already been said before the agent replies, and conversation state is stored in Postgres, so a thread survives a restart and a returning contact is recognised.',
      ar: 'الفكرة نفسها على نطاق إنتاجي. أربع مراحل SQL تحدّد هوية جهة الاتصال وما سبق أن قيل لها قبل أن يردّ الوكيل، وتُحفظ حالة المحادثة في Postgres، فتبقى المحادثة قائمة بعد إعادة التشغيل، ويُعرَف العميل العائد.',
    },
    scope: [
      { en: 'Workflow architecture', ar: 'تصميم بنية سير العمل' },
      { en: 'Database design', ar: 'تصميم قاعدة البيانات' },
      { en: 'Multi-channel messaging', ar: 'المراسلة متعددة القنوات' },
    ],
    stack: ['n8n', 'PostgreSQL', 'Postgres Chat Memory', 'OpenAI API', 'Google Sheets API', 'UltraMsg WhatsApp', 'Gmail'],
    details: {
      nodes: 'Webhook · Execute a SQL query ×4 · If · Wait · AI Agent · OpenAI Chat Model · Postgres Chat Memory · Get row(s) in sheet · Append row in sheet · HTTP Request · Extract Email · Send a message',
    },
    metrics: [
      { label: { en: 'Nodes in the workflow', ar: 'عدد العُقد في المسار' }, value: '16' },
      { label: { en: 'SQL stages', ar: 'مراحل SQL' }, value: '4' },
      { label: { en: 'Channels', ar: 'القنوات' }, value: { en: 'WhatsApp + Email', ar: 'واتساب + بريد' } },
    ],
    media: [
      image('/assets/gallery/n8n-enterprise-pipeline.jpg', {
        en: 'Workflow diagram: relational conversation pipeline',
        ar: 'مخطط سير العمل: مسار معالجة المحادثات',
      }),
    ],
  },
]
