// Small constructors that keep project entries short.

/** One image media item. `alt` is optional: { en, ar }. */
export const image = (src, alt) => ({ type: 'image', src, alt })

/** Several image media items from a list of URLs or /public paths. */
export const images = (...sources) => sources.map((src) => image(src))

/**
 * A self-hosted video file, e.g. video('/assets/works/launch.mp4', { poster, duration: '1:00' }).
 * `orientation` is 'landscape' (16:9, default) or 'vertical' (9:16).
 */
export const video = (src, options = {}) => ({ type: 'video', src, orientation: 'landscape', ...options })

/** A YouTube or Vimeo link. Leave `url` empty until the film is published. */
export const embed = (url, options = {}) => ({ type: 'embed', url, orientation: 'landscape', ...options })
