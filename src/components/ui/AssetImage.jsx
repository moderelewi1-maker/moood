import { useMemo, useState } from 'react'
import { ImageOff } from 'lucide-react'

const CATEGORY_GRADIENTS = {
  hero: 'from-accent/18 via-ground to-white/5',
  creative: 'from-accent/12 via-ground to-white/4',
  brand: 'from-white/8 via-ground to-ember/12',
  proof: 'from-accent/16 via-ground to-ground',
  campaign: 'from-ember/16 via-ground to-white/5',
  default: 'from-white/6 via-ground to-white/3',
}

/**
 * Renders <img>, trying each candidate in `sources` (or the single `src`)
 * in order, and swapping to a themed gradient placeholder once every
 * candidate has failed to load. Lets a call site chain a remote asset URL
 * -> local placeholder path -> styled fallback without extra state.
 */
export default function AssetImage({
  src,
  sources,
  alt = '',
  category = 'default',
  className = '',
  iconClassName = '',
  fallbackIcon: FallbackIcon = ImageOff,
  hideIcon = false,
}) {
  const candidates = useMemo(
    () => (sources && sources.length ? sources : [src]).filter(Boolean),
    [src, sources]
  )
  const [index, setIndex] = useState(0)
  const gradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.default
  const current = candidates[index]

  if (!current) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        {!hideIcon && (
          <FallbackIcon className={`text-white/25 ${iconClassName || 'h-6 w-6'}`} strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
    )
  }

  return (
    <img
      key={current}
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
      className={className}
    />
  )
}
