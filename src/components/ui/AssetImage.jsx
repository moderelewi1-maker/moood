import { useState } from 'react'
import { isRenderableImage } from '../../lib/utils.js'

/**
 * An <img> that degrades gracefully: when the source is missing, is not a
 * direct image file, or fails to load, it renders `fallback` instead of a
 * broken-image icon. Tracking the failed URL (rather than a boolean) means a
 * changed `src` is retried without any effect.
 */
export default function AssetImage({ src, alt = '', className, fallback = null, onLoad, ...rest }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!isRenderableImage(src) || failedSrc === src) return fallback

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onLoad={onLoad}
      onError={() => setFailedSrc(src)}
      className={className}
      {...rest}
    />
  )
}
