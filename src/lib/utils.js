export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function toEmbedUrl(url) {
  if (!url) return ''
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
      if (u.pathname.startsWith('/embed/')) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return `https://player.vimeo.com/video/${id}?autoplay=1`
    }
    return url
  } catch {
    return url
  }
}
