# Modar Akram Elewi — Portfolio

Interactive, narrative-driven portfolio site for Modar Akram Elewi (Digital
Marketing & Growth Manager, Performance Media Buyer & Direct-Response Video
Producer). Built as a single-page React app: hero, core narrative, video
showcase, experience timeline, tools/systems grid, and contact.

## Stack

React 19 + Vite, Tailwind CSS v4, Framer Motion, GSAP (ScrollTrigger), Lenis
smooth scroll, and a hand-written Three.js shader for the hero orb.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run lint      # eslint
```

## Adding real content

The site ships with graceful fallbacks so it renders cleanly without any of
this, but for the finished version:

- **Hero portrait** — drop a file at `public/assets/profile.jpg` (or
  `modar-hero.jpg`), or replace the `hero`-category URL in
  `src/data/portfolioAssets.js`.
- **Showreel videos** — add `public/assets/video/video1.mp4` and `video2.mp4`
  (plus matching `*-poster.jpg` thumbnails), or fill in `embedUrl` for the
  YouTube/Vimeo entries in `src/data/videos.js`.
- **Creative/proof gallery** — the URLs in `src/data/portfolioAssets.js` are
  currently `ibb.co` viewer pages, not direct image links. Swap in the real
  `i.ibb.co/...` links, or drop files into `public/assets/gallery/` and point
  `url` at `/assets/gallery/...`.
- **Stats, socials, experience dates** — `src/data/stats.js`,
  `src/data/socials.js`, and `src/data/experience.js` all contain
  clearly-marked placeholder values to replace with verified numbers, real
  profile links, and exact dates.
