import { useRef, useState } from 'react'
import { PlayCircle, Clock3, TrendingUp, Film } from 'lucide-react'
import AssetImage from './AssetImage.jsx'
import { toEmbedUrl } from '../../lib/utils.js'
import { useLocale } from '../../i18n/useLocale.js'

export default function VideoCard({ video, categoryLabel }) {
  const videoRef = useRef(null)
  const [videoErrored, setVideoErrored] = useState(false)
  const [embedLoaded, setEmbedLoaded] = useState(false)
  const { t } = useLocale()
  const copy = t.work
  const text = copy.videos[video.id]

  const hasLocalSrc = video.type === 'local' && !videoErrored
  const hasEmbed = video.type === 'embed' && Boolean(video.embedUrl)

  function handleEnter() {
    if (hasLocalSrc && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  function handleLeave() {
    if (hasLocalSrc && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="group relative aspect-video overflow-hidden rounded-2xl glass"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 text-ink-faint">
          <Film className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-xs font-medium">{copy.addEmbed}</span>
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
          <PlayCircle className="h-14 w-14 text-white/80 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
        </button>
      )}

      {video.type === 'local' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-opacity duration-300 group-hover:opacity-0">
          <PlayCircle className="h-12 w-12 text-white/70" strokeWidth={1.25} aria-hidden="true" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          {categoryLabel}
        </span>
        <span className="glass flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium text-ink-muted">
          <Clock3 className="h-3 w-3" aria-hidden="true" />
          <span dir="ltr">{video.duration}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-sm font-semibold text-ink sm:text-base">{text.title}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
            <TrendingUp className="h-3 w-3 rtl:-scale-x-100" aria-hidden="true" />
            <span dir="ltr">{video.ctrImpact}</span>
          </span>
        </div>

        <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-1 text-xs italic leading-relaxed text-ink-muted sm:text-sm">{text.hook}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"
                  style={{ width: `${video.retention}%` }}
                />
              </div>
              <span className="shrink-0 text-[10px] font-medium text-ink-faint">
                {video.retention}% {copy.retentionLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
