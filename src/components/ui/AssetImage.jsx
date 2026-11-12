import { useState } from 'react'
import { isRenderableImage } from '../../lib/utils.js'

/**
 * An <img> that degrades gracefully. It tries `src`, then `fallbackSrc`
 * (typically: a generated preview first, the original file second), and if
 * neither is a loadable image it renders `fallback` instead of a
 * broken-image icon. Remembering which URLs failed — rather than a boolean —
 * means a changed `src` is retried without any effect.
 */
export default function AssetImage({ src, fallbackSrc, alt = '', className, fallback = null, ...rest }) {
  const [failed, setFailed] = useState([])
  const current = [src, fallbackSrc].find((candidate) => isRenderableImage(candidate) && !failed.includes(candidate))

  if (!current) return fallback

  return (
    <img
      key={current}
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed((list) => [...list, current])}
      className={className}
      {...rest}
    />
  )
}
