# Modar Akram Elewi — Portfolio

A bilingual (English / Arabic) work showcase and executive capability
portfolio. One page, in this order:

1. **Hero** — positioning statement
2. **Selected Work** — featured projects in a scroll-driven 3D sequence
3. **Work Index** — every project, filterable by discipline
4. **Verified Results** — the audited Meta Ads account: totals, ledger, findings
5. **Capabilities** — executive leadership and governance, then functional expertise
6. **Approach** — the project lifecycle and delivery standards
7. **Contact**

## Getting started

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

`npm run build` writes the production site to `dist/`.

## Deployment

Every push to `main` is built and deployed to the Cloudflare Worker named in
`wrangler.jsonc` by `.github/workflows/deploy.yml` (lint → build → asset size
check → `wrangler deploy`). The workflow needs the repository secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Open items

| Item | Where | What to do |
| --- | --- | --- |
| Profile links | `src/data/site.js` | Fill in each `href`; empty ones are hidden |
| Case-study figures | `src/data/works/campaigns.js` | The four case studies carry modelled figures and are labelled "illustrative" on the site. Replace with Ads Manager figures and delete `illustrative: true`, or delete the `metrics` line |
| Tools for 3D, audio and design work | `src/data/capabilities.js` | Add the tools you use to each `tools` list |

The Meta Ads ledger is the opposite case: every figure in
`src/data/adsAudit.js` is transcribed from the Ads Manager capture, and the
file documents how each was verified.

## Adding a project

Everything about the works lives in `src/data/works/`. Open the file for the
project's discipline (`campaigns.js`, `video.js`, `design.js`, `imagery.js`,
`automation.js`) and add one object to the list:

```js
{
  id: 'spring-campaign-identity',        // unique, kebab-case
  category: 'design',                    // an id from categories.js
  featured: true,                        // optional: adds it to Selected Work
  title:   { en: 'Spring Campaign Identity', ar: 'هوية حملة الربيع' },
  summary: { en: 'One sentence on what it is.', ar: 'جملة واحدة تعرّف بالمشروع.' },
  scope: [                               // optional: role and deliverable tags
    { en: 'Art direction', ar: 'الإخراج الفني' },
  ],
  details: {                             // optional: any of these fields
    objective: { en: '…', ar: '…' },
    approach:  { en: '…', ar: '…' },
    platform:  'Meta Ads Manager',       // a plain string shows in both languages
  },
  metrics: [{ label: 'roas', value: '4.2x' }],   // optional
  media: [
    image('/assets/gallery/spring-01.jpg', { en: 'Key visual', ar: 'التصميم الرئيسي' }),
    image('/assets/gallery/spring-02.jpg', { en: 'Poster', ar: 'الملصق' }),
  ],
}
```

Only `id`, `category` and `title` are required. Nothing else needs to change:
the Selected Work sequence, the Work Index, its filters and counts, catalogue
numbers and the project viewer are all generated from this list.

- **Detail fields:** `objective`, `approach`, `concept`, `pacing`, `style`, `reading`, `nodes`, `platform`, `outcome`.
- **Metric labels:** `roas`, `cac`, `scale`, `ctr`, `avd`, `spend`, `reach`, `impressions`, `frequency`, or your own `{ en, ar }` label. Add `kind: 'target'` to a metric that is a design goal rather than a measurement, and `illustrative: true` to a project whose figures are modelled; both are disclosed on the site.
- **Media helpers** (from `helpers.js`): `image(path, title, { backdrop: 'light' })`, `video(path, { poster, duration, orientation, forceMuted })`, `embed(url, { poster, duration, orientation })`.
- **Cover:** the first image, or the video poster. Set `coverFit: 'contain'` to show a logo or diagram whole, `cover: '/assets/…'` to choose another image, or `cover: false` for the line-art cover.
- **Order:** disciplines are dealt out in turn in the index; within a discipline, projects keep the order of their file. See `src/data/works/index.js` to pin an exact order.

### Adding images and films

1. Put images in `public/assets/gallery/` and films (with a poster image) in
   `public/assets/video/`. A single file must stay under 25 MB.
2. Generate the lightweight previews used by covers and thumbnails:

```bash
npm run media
```

The command only processes new or changed images. If you skip it the site
still works; it loads the full-size originals instead.

### Adding a discipline

Add one entry to `src/data/works/categories.js`. Its filter tab appears as
soon as a project uses it. `3d` and `web` are already defined and are waiting
for their first projects.

## Editing content

| Content | File |
| --- | --- |
| Interface text (navigation, headings, buttons) in both languages | `src/i18n/translations.js` |
| Meta Ads ledger rows, totals and findings | `src/data/adsAudit.js` |
| Leadership competencies, disciplines and tools | `src/data/capabilities.js` |
| Lifecycle stages and delivery standards | `src/data/process.js` |
| Email, portrait, profile links, navigation | `src/data/site.js` |

Content is written as `{ en: '…', ar: '…' }` pairs next to the data it
belongs to. The language switch re-renders in place and mirrors the whole
layout, including the 3D scene, for Arabic.

## Design system

Defined once in `src/index.css`:

- **Colour** — obsidian ground, warm ivory text, and a single brass accent
  reserved for indices, active states and hairlines. No second hue, no
  decorative gradients.
- **Type** — Newsreader (display) with Inter (text); in Arabic, Markazi Text
  (display) with IBM Plex Sans Arabic (text). The four display sizes are
  `.display-1` to `.display-4`.
- **Form** — hairline rules, 2px corners, a 12-column grid inside `.shell`.

## Motion architecture

| Layer | Technology | Files |
| --- | --- | --- |
| Inertial scrolling | Lenis | `src/motion/useSmoothScroll.js` |
| The 3D instrument behind the page | three.js (WebGL, physically based materials) | `src/scene/` |
| Scroll-linked 3D for content | framer-motion (`useScroll` + springs, CSS perspective) | `src/components/sections/`, `src/motion/` |

- **The instrument** (`src/scene/createScene.js`) is a brass gyroscope
  rendered once behind the whole page. Each section declares a pose with a
  `data-scene` attribute; `src/scene/poses.js` holds every pose and is the
  only file to edit to re-choreograph it.
- **Selected Work** (`FeaturedWork.jsx`) pins a stage with CSS `sticky` and
  moves a virtual camera through a stack of project plates in perspective.
- **Shared constants** (easing, springs, perspective) are in
  `src/motion/config.js`, so all motion keeps one character.
- **Reduced motion:** with the system setting on, scroll-linked effects are
  replaced by static layouts and the 3D scene becomes a still image.
- **Performance:** three.js loads on demand after first paint, covers load
  generated previews rather than originals, and the scene lowers its render
  resolution automatically on devices that cannot hold a smooth frame rate.
- **Ambient sound** (`src/hooks/useAmbientAudio.js`) is off by default, loads
  only when switched on, and steps aside while a film with sound is playing.
