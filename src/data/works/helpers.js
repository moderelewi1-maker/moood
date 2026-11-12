// Small constructors that keep project entries short.

/**
 * One image. `title` is optional — { en, ar } or a plain string — and is
 * shown as the caption in the viewer and used as the alternative text.
 * Pass `{ backdrop: 'light' }` for a cut-out with a transparent background,
 * so a dark subject is not lost against the dark page.
 */
export const image = (src, title, options = {}) => ({ type: 'image', src, title, ...options })

/** Several untitled images from a list of /public paths or URLs. */
export const images = (...sources) => sources.map((src) => image(src))

/**
 * A self-hosted video file, e.g. video('/assets/video/launch.mp4', { poster, duration: '1:00' }).
 * `orientation` is 'landscape' (16:9, default) or 'vertical' (9:16).
 * `forceMuted: true` keeps the film silent whatever the player's controls say.
 */
export const video = (src, options = {}) => ({ type: 'video', src, orientation: 'landscape', ...options })

/** A YouTube or Vimeo link. Leave `url` empty until the film is published. */
export const embed = (url, options = {}) => ({ type: 'embed', url, orientation: 'landscape', ...options })

/**
 * Path of the lightweight preview that `npm run media` generates for an
 * image under /assets (see scripts/build-thumbnails.mjs), or null for
 * anything else. Components fall back to the original when it is missing.
 */
export function previewOf(src) {
  if (typeof src !== 'string' || !src.startsWith('/assets/') || src.startsWith('/assets/thumbs/')) return null
  return src.replace('/assets/', '/assets/thumbs/').replace(/\.[^./]+$/, '.webp')
}
