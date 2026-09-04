# Screenshots

Captured from the dev server at 1600×1000 (desktop) and 390×844 (mobile),
in both locales.

| File | What it shows |
| --- | --- |
| `01-hero-*` | Hero: kinetic headline, portrait plate with register marks, mono slate caption |
| `02-scene-production-*` | Scroll scene 1 — nine-blade iris, viewfinder reticle, anamorphic flare |
| `03-scene-post-*` | Scroll scene 2 — NLE timeline, timecode ruler, waveform, playhead |
| `04-scene-scaling-*` | Scroll scene 3 — data matrix, logarithmic growth vector, telemetry nodes |
| `05-design-showcase-*` | Design gallery, first 12 tiles |
| `06-design-expanded-*` | Gallery expanded to all 71 |
| `07-sound-toggle-off-*` | Ambient sound switch, muted (bars flat) + tooltip |
| `08-sound-toggle-on-*` | Ambient sound switch, playing (bars animating) + tooltip |
| `09-full-page-*` | Whole page, one tall image |
| `10-design-lightbox-en` | Lightbox with title, category chip and counter |
| `11-mobile-hero-*`, `12-mobile-full-*` | Mobile at 390×844 |

## One caveat on typography

This container's egress policy blocks `fonts.googleapis.com`, so **Archivo**
and **IBM Plex Mono** could not load — every screenshot falls back to system
fonts. The layout, spacing, colour and motion are accurate; the letterforms
are not. On Cloudflare the display type will be noticeably tighter and more
editorial than it looks here.

Video posters also render as placeholder frames because this headless
Chromium build has no H.264 decoder. That is a limitation of the capture
environment, not of the site.
