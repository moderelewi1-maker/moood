// Section 3 — Performance Video Showcase (structure only).
// `type: 'local'` expects a file in /public/assets/video/ (hover-to-play).
// `type: 'embed'` expects a YouTube/Vimeo URL — leave embedUrl empty to
// show the "add your reel" placeholder state instead of a broken embed.
// Titles and hooks are localized in src/i18n/translations.js under work.videos.
export const videoCategoryKeys = ['all', 'commercial', 'direct-response', 'retention']

export const videos = [
  {
    id: 'v1',
    category: 'direct-response',
    type: 'local',
    src: '/assets/video/video1.mp4',
    poster: '/assets/video/video1-poster.jpg',
    retention: 74,
    ctrImpact: '+38% CTR',
    duration: '0:32',
  },
  {
    id: 'v2',
    category: 'direct-response',
    type: 'local',
    src: '/assets/video/video2.mp4',
    poster: '/assets/video/video2-poster.jpg',
    retention: 81,
    ctrImpact: '+52% CTR',
    duration: '0:41',
  },
  {
    id: 'v3',
    category: 'commercial',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/commercial-1-poster.jpg',
    retention: 68,
    ctrImpact: 'Brand Lift',
    duration: '0:60',
  },
  {
    id: 'v4',
    category: 'commercial',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/commercial-2-poster.jpg',
    retention: 71,
    ctrImpact: 'Brand Lift',
    duration: '0:45',
  },
  {
    id: 'v5',
    category: 'retention',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/retention-1-poster.jpg',
    retention: 79,
    ctrImpact: 'AVD +44%',
    duration: '12:04',
  },
  {
    id: 'v6',
    category: 'retention',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/retention-2-poster.jpg',
    retention: 76,
    ctrImpact: 'AVD +31%',
    duration: '9:22',
  },
]
