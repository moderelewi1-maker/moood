import { useRef, useState } from 'react'
import { PlayCircle, Clock3, Film, Gauge, Crosshair, TrendingUp } from 'lucide-react'
import AssetImage from './AssetImage.jsx'
import { toEmbedUrl } from '../../lib/utils.js'
import { useLocale } from '../../i18n/useLocale.js'

/** One reel. Aspect ratio follows `video.orientation` (16:9 or 9:16). */
export default function VideoCard({ video }) {
  const videoRef = useRef(null)
  const [videoErrored, setVideoErrored] = useState(false)
  const [embedLoaded, setEmbedLoaded] = useState(false)
  const { t } = useLocale()
  const copy = t.video
  const text = copy.items[video.id]

  const hasLocalSrc = video.type === 'local' && !videoErrored
  const hasEmbed = video.type === 'embed' && Boolean(video.embedUrl)
  const isVertical = video.orientation === 'vertical'

  function handleEnter() {
    if (hasLocalSrc && videoRef.current) videoRef.current.play().catch(() => {})
  }

  function handleLeave() {
    if (hasLocalSrc && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`group surface relative overflow-hidden rounded-2xl ${
        isVertical ? 'aspect-[9/16]' : 'aspect-video'
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="absolute inset-0">
        <AssetImage
          src={video.poster}
          alt=""
          category="creative"
          className="h-full w-full object-cover"
          hideIcon
        />
      </div>

      {hasLocalSrc && (
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoErrored(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {video.type === 'embed' && !hasEmbed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-hairline text-ink-faint">
          <Film className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          <span className="px-4 text-center text-xs font-medium">{copy.addEmbed}</span>
        </div>
      )}

      {hasEmbed && embedLoaded && (
        <iframe
          src={toEmbedUrl(video.embedUrl)}
          title={text.title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}

      {hasEmbed && !embedLoaded && (
        <button
          onClick={() => setEmbedLoaded(true)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`${copy.playAria} — ${text.title}`}
        >
          <PlayCircle className="h-14 w-14 text-ink/80 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
        </button>
      )}

      {video.type === 'local' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60 transition-opacity duration-300 group-hover:opacity-0">
          <PlayCircle className="h-12 w-12 text-ink/70" strokeWidth={1.25} aria-hidden="true" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/35 to-transparent opacity-90" />

      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="surface rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          {isVertical ? copy.formats.vertical : copy.formats.landscape}
        </span>
        <span className="surface flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium text-ink-muted">
          <Clock3 className="h-3 w-3" aria-hidden="true" />
          <span dir="ltr">{video.duration}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-semibold text-ink sm:text-base">{text.title}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-crimson/12 px-2.5 py-1 text-[10px] font-semibold text-crimson-soft">
            <TrendingUp className="h-3 w-3 rtl:-scale-x-100" aria-hidden="true" />
            <span dir="ltr">{text.ctr}</span>
          </span>
        </div>

        {/* Hook angle + pacing reveal on hover so the card stays calm at rest. */}
        <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <dl className="flex flex-col gap-2 pt-1">
              <div className="flex items-start gap-2">
                <dt className="mt-0.5 shrink-0 text-crimson-soft">
                  <Crosshair className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">{copy.labels.hook}</span>
                </dt>
                <dd className="text-xs italic leading-relaxed text-ink-muted">{text.hook}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="mt-0.5 shrink-0 text-crimson-soft">
                  <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">{copy.labels.pacing}</span>
                </dt>
                <dd className="text-xs leading-relaxed text-ink-faint">{text.pacing}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
