// Work categories. A category only appears as a filter once at least one
// project uses it, so the three reserved ones below ('3d', 'ai', 'web') stay
// hidden until their first project is added.
//
// To add a category: append an entry here. `motif` picks the line-art drawn
// on a project's cover when it has no image (see components/work/CategoryMotif).
export const categories = [
  { id: 'campaigns', motif: 'campaigns', label: { en: 'Campaign Strategy', ar: 'استراتيجيات الحملات' } },
  { id: 'video', motif: 'video', label: { en: 'Video Production', ar: 'الإنتاج المرئي' } },
  { id: 'design', motif: 'design', label: { en: 'Brand & Design', ar: 'الهوية والتصميم' } },
  { id: '3d', motif: '3d', label: { en: '3D & Motion', ar: 'التصميم ثلاثي الأبعاد' } },
  { id: 'ai', motif: 'ai', label: { en: 'AI Workflows', ar: 'مسارات الذكاء الاصطناعي' } },
  { id: 'web', motif: 'web', label: { en: 'Web', ar: 'تطوير الويب' } },
]
