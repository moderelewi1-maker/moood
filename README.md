# Modar Akram Elewi — Portfolio

A bilingual (English / Arabic) work showcase and executive capability
portfolio. One page, in this order:

1. **Hero** — positioning statement
2. **Selected Work** — featured projects in a scroll-driven 3D sequence
3. **Work Index** — every project, filterable by discipline
4. **Capabilities** — executive leadership and governance, then functional expertise
5. **Approach** — the project lifecycle and delivery standards
6. **Contact**

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

`npm run build` writes the production site to `dist/`. Deployment is
configured for Cloudflare Workers static assets in `wrangler.jsonc`.

## Before publishing

These items are placeholders carried over from the earlier version of the
site. Each is marked with a `⚠` comment in the file named.

| Item | Where | What to do |
| --- | --- | --- |
| Result figures (ROAS, CAC, CTR, view duration) | `src/data/works/campaigns.js`, `src/data/works/video.js` | Replace with verified numbers, or delete the `metrics` line |
| Gallery images | `src/data/works/design.js`, `src/data/works/campaigns.js` | The links are `ibb.co` viewer pages, which cannot be displayed. See [Adding images](#adding-images) |
| Films | `src/data/works/video.js` | Paste a YouTube/Vimeo URL into `embed('')`, or add the `.mp4` files |
| Profile links | `src/data/site.js` | Fill in each `href`; empty ones are hidden |
| Tools for 3D, audio and AI work | `src/data/capabilities.js` | Add the tools you use to each `tools` list |

Until then the site still looks complete: a project without an image shows a
line-art cover for its discipline, and its viewer states that the material is
available on request.

## Adding a project

Everything about the works lives in `src/data/works/`. Open the file for the
project's discipline (`campaigns.js`, `video.js`, `design.js`) and add one
object to the list:

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
  media: images('/assets/works/spring-01.jpg', '/assets/works/spring-02.jpg'),
}
```

Only `id`, `category` and `title` are required. Nothing else needs to change:
the Selected Work sequence, the Work Index, its filters and counts, catalogue
numbers and the project viewer are all generated from this list.

- **Detail fields:** `objective`, `approach`, `concept`, `pacing`, `platform`, `outcome`.
- **Metric labels:** `roas`, `cac`, `scale`, `ctr`, `avd`, or your own `{ en, ar }` label.
- **Media helpers** (from `helpers.js`): `images(...)`, `video(src, { poster, duration, orientation })`, `embed(url, { poster, duration, orientation })`.
- **Order:** projects appear in the order of the `works` list in `src/data/works/index.js`.

### Adding images

Put the files in `public/assets/works/` and refer to them as
`/assets/works/file-name.jpg`.

To keep using ImgBB instead, each link must be the *direct* image address:
open the `ibb.co/…` page, right-click the image, choose "Copy image address",
and paste the resulting `https://i.ibb.co/…` link.

### Adding a discipline

Add one entry to `src/data/works/categories.js`. Its filter tab appears as
soon as a project uses it. `3d`, `ai` and `web` are already defined and are
waiting for their first projects.

## Editing content

| Content | File |
| --- | --- |
| Interface text (navigation, headings, buttons) in both languages | `src/i18n/translations.js` |
| Leadership competencies, disciplines and tools | `src/data/capabilities.js` |
| Lifecycle stages and delivery standards | `src/data/process.js` |
| Email, profile links, navigation | `src/data/site.js` |

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
- **Performance:** three.js loads on demand after first paint, and the scene
  lowers its render resolution automatically on devices that cannot hold a
  smooth frame rate.
