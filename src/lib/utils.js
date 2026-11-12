export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/** Smooth-scrolls to a section, through Lenis when it is running. */
export function scrollToHash(hash) {
  const target = hash === '#top' ? 0 : document.querySelector(hash)
  if (target === null) return
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: 0, duration: 1.5 })
  } else if (target === 0) {
    window.scrollTo({ top: 0 })
  } else {
    target.scrollIntoView({ block: 'start' })
  }
}

/** Freezes page scroll while an overlay is open. Returns the release function. */
export function lockScroll() {
  const root = document.documentElement
  const previous = root.style.overflow
  window.__lenis?.stop()
  root.style.overflow = 'hidden'
  return () => {
    root.style.overflow = previous
    window.__lenis?.start()
  }
}

/** Class for the studio backdrop behind a cut-out image (see `image()` in data/works/helpers.js). */
export function backdropClass(item) {
  return item?.backdrop === 'light' ? 'bg-[#d6d3cd]' : ''
}

/** True for a URL the browser can render in an <img>. */
export function isRenderableImage(src) {
  if (!src) return false
  // ibb.co links are viewer *pages*; only i.ibb.co serves the image file.
  return !/^https?:\/\/(www\.)?ibb\.co\//i.test(src)
}

/** Turns a YouTube or Vimeo page link into its embeddable player URL. */
export function toEmbedUrl(url) {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}?autoplay=1&rel=0`
    }
    if (host.endsWith('youtube.com')) {
      const id = parsed.searchParams.get('v') ?? parsed.pathname.split('/').filter(Boolean).pop()
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    }
    if (host.endsWith('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return `https://player.vimeo.com/video/${id}?autoplay=1`
    }
    return url
  } catch {
    return url
  }
}
