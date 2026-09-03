// Video production hub — structure only.
// `orientation` drives the card aspect ratio: 'landscape' (16:9) or
// 'vertical' (9:16). `type: 'local'` expects a file in /public/assets/video/;
// `type: 'embed'` expects a YouTube/Vimeo URL — leave embedUrl empty to show
// the "add your reel" placeholder instead of a broken embed.
// Titles, hook angles, pacing and CTR labels are localized under `video.items`.
export const videoFormats = ['all', 'landscape', 'vertical']

export const videos = [
  {
    id: 'commercial-launch',
    orientation: 'landscape',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/commercial-launch-poster.jpg',
    duration: '0:60',
  },
  {
    id: 'commercial-service',
    orientation: 'landscape',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/commercial-service-poster.jpg',
    duration: '0:45',
  },
  {
    id: 'podcast-retention',
    orientation: 'landscape',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/podcast-retention-poster.jpg',
    duration: '12:04',
  },
  {
    id: 'youtube-retention',
    orientation: 'landscape',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/youtube-retention-poster.jpg',
    duration: '9:22',
  },
  {
    id: 'dr-hook',
    orientation: 'vertical',
    type: 'local',
    src: '/assets/video/video1.mp4',
    poster: '/assets/video/video1-poster.jpg',
    duration: '0:32',
  },
  {
    id: 'ugc-founder',
    orientation: 'vertical',
    type: 'local',
    src: '/assets/video/video2.mp4',
    poster: '/assets/video/video2-poster.jpg',
    duration: '0:41',
  },
  {
    id: 'reels-offer',
    orientation: 'vertical',
    type: 'embed',
    embedUrl: '',
    poster: '/assets/video/reels-offer-poster.jpg',
    duration: '0:28',
  },
]
