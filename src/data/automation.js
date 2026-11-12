/**
 * n8n automation architectures.
 *
 * Everything in `nodes`, `stack` and the architectural entries of `metrics`
 * was read off the diagrams themselves — node names, node counts, the four
 * `executeQuery` stages, the Postgres Chat Memory binding, the UltraMsg
 * endpoint on the HTTP Request node. They are descriptions of the graph, not
 * claims about it.
 *
 * `kind` separates the two sorts of metric, because they carry very different
 * weight to a client reading this page:
 *   'arch'   — verifiable from the diagram (a node exists, a count is what it is)
 *   'target' — a design goal of the system, not a measured production figure
 * Anything marked 'target' renders without the emphasis treatment, and should
 * not be presented as an observed result.
 *
 * Copy that differs per locale lives here beside the asset, matching how
 * src/data/media.js handles gallery titles: adding an architecture touches
 * one file.
 */

export const automationItems = [
  {
    id: 'n8n-ai-lead-agent',
    src: '/assets/gallery/n8n-ai-lead-agent.jpg',
    ref: 'SYS-01',
    nodeCount: 8,
    // Native size, used to set the frame's aspect ratio so the card reserves
    // the right space before the image decodes.
    width: 736,
    height: 346,
    title: {
      en: 'Autonomous Lead Qualification Agent',
      ar: 'وكيل ذكي لتأهيل العملاء المحتملين',
    },
    narrative: {
      en: 'Inbound enquiries used to wait for someone to be awake. A webhook now hands each one straight to an agent that reads it, decides whether it qualifies, writes the record to the CRM sheet, and answers on WhatsApp — with the email branch reserved for the cases that warrant one.',
      ar: 'كانت الاستفسارات الواردة تنتظر ردّاً بشرياً. الآن يستقبلها Webhook ويمرّرها مباشرة إلى وكيل يقرأها، ويقرّر ما إذا كانت مؤهّلة، ويكتب السجل في جدول العملاء، ثم يردّ عبر واتساب — مع إبقاء مسار البريد للحالات التي تستدعيه.',
    },
    stack: ['n8n Core', 'Webhook', 'OpenAI API', 'Google Sheets API', 'UltraMsg WhatsApp', 'Gmail'],
    nodes: [
      'Webhook',
      'AI Agent',
      'OpenAI Chat Model',
      'Simple Memory',
      'Append row in sheet',
      'HTTP Request',
      'If',
      'Send a message',
    ],
    metrics: [
      { kind: 'arch', label: { en: 'Nodes', ar: 'العقد' }, value: '8' },
      { kind: 'arch', label: { en: 'Trigger', ar: 'المُشغِّل' }, value: { en: 'Webhook · 24/7', ar: 'Webhook · 24/7' } },
      { kind: 'arch', label: { en: 'CRM write', ar: 'الكتابة للـCRM' }, value: { en: 'Sheets append', ar: 'إضافة صف' } },
      { kind: 'target', label: { en: 'Response target', ar: 'زمن الاستجابة المستهدف' }, value: '< 2s' },
    ],
  },
  {
    id: 'n8n-enterprise-pipeline',
    src: '/assets/gallery/n8n-enterprise-pipeline.jpg',
    ref: 'SYS-02',
    nodeCount: 16,
    width: 860,
    height: 741,
    title: {
      en: 'Relational Conversation Pipeline',
      ar: 'خط معالجة المحادثات الاعتمادي',
    },
    narrative: {
      en: 'The same idea at production scale. Four SQL stages resolve who the contact is and what has already been said to them before the agent replies, and conversation state persists in Postgres rather than in memory — so a thread survives a restart, and a returning contact is not greeted as a stranger. A code node extracts the address the reply routes to.',
      ar: 'الفكرة نفسها على نطاق إنتاجي. أربع مراحل SQL تحدّد هوية جهة الاتصال وما سبق أن قيل لها قبل أن يردّ الوكيل، وحالة المحادثة محفوظة في Postgres لا في الذاكرة المؤقتة — فتبقى المحادثة قائمة بعد إعادة التشغيل، ولا يُستقبل العميل العائد كأنه جديد. وتستخرج عقدة برمجية العنوان الذي يُوجَّه إليه الرد.',
    },
    stack: ['n8n Core', 'PostgreSQL', 'Postgres Chat Memory', 'OpenAI API', 'Google Sheets API', 'UltraMsg WhatsApp', 'Gmail', 'Code'],
    nodes: [
      'Webhook',
      'Execute a SQL query ×4',
      'If1',
      'Wait',
      'AI Agent',
      'OpenAI Chat Model',
      'Postgres Chat Memory',
      'Get row(s) in sheet',
      'Append row in sheet',
      'HTTP Request',
      'If',
      'Extract Email',
      'Send a message',
    ],
    metrics: [
      { kind: 'arch', label: { en: 'Nodes', ar: 'العقد' }, value: '16' },
      { kind: 'arch', label: { en: 'SQL stages', ar: 'مراحل SQL' }, value: '4' },
      { kind: 'arch', label: { en: 'State', ar: 'الحالة' }, value: { en: 'Postgres-backed', ar: 'مخزّنة في Postgres' } },
      { kind: 'arch', label: { en: 'Channels', ar: 'القنوات' }, value: { en: 'WhatsApp + Email', ar: 'واتساب + بريد' } },
    ],
  },
]
