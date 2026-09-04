import { useRef, useState } from 'react'
import { PlayCircle, PauseCircle, Volume2, VolumeX, Clock3, Film, Gauge, Crosshair, TrendingUp } from 'lucide-react'
import AssetImage from './AssetImage.jsx'
import { toEmbedUrl } from '../../lib/utils.js'
import { useLocale } from '../../i18n/useLocale.js'

/** One reel. Aspect ratio follows `video.orientation` (16:9 or 9:16). */
export default function VideoCard({ video }) {
  const videoRef = useRef(null)
  const [videoErrored, setVideoErrored] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [embedLoaded, setEmbedLoaded] = useState(false)
  const { t, locale } = useLocale()
  const copy = t.video
  // Per-asset copy ships beside the file in src/data/media.js
  const text = {
    title: video.title[locale],
    hook: video.hook[locale],
    pacing: video.pacing[locale],
    ctr: video.ctr,
  }

  const hasEmbed = Boolean(video.embedUrl)
  const hasLocalSrc = !hasEmbed && Boolean(video.src) && !videoErrored
  const isVertical = video.orientation === 'vertical'

  // Hover preview is a convenience, not the control surface — touch devices
  // have no hover at all, so playback also has explicit buttons.
  //
  // The two must not be driven by the same flag. `playing` mirrors the
  // element's real state so the icon is always honest, but it is set by the
  // media events, which fire for the hover preview too. Gating hover on
  // `playing` therefore made the preview look like a deliberate play and the
  // button's next press read as "already playing", so pressing pause did
  // nothing. Intent is tracked separately, in a ref only the buttons touch.
  // Once the buttons have been used, hover preview stands down for good on
  // this card. Anything short of that loses a fight with itself: pressing
  // pause swaps the icon under the cursor, React replaces that SVG, the
  // pointer re-enters the card, and the hover handler restarts playback about
  // ten milliseconds later — so the button appeared completely dead while the
  // event log showed a clean `pause` immediately followed by `play`.
  // Deferring to explicit intent is also the correct behaviour on its own
  // terms: a visitor driving the controls should not be overridden by where
  // their mouse happens to rest.
  const controlled = useRef(false)

  function handleEnter() {
    if (hasLocalSrc && videoRef.current && !controlled.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  function handleLeave() {
    if (hasLocalSrc && videoRef.current && !controlled.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  function togglePlay() {
    const el = videoRef.current
    if (!el) return
    controlled.current = true
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  function toggleMute() {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
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
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {!hasEmbed && !video.src && (
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

      {hasLocalSrc && (
        <div className="absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={playing}
            aria-label={playing ? copy.controls.pause : copy.controls.play}
            className="surface flex h-11 w-11 items-center justify-center rounded-full text-ink opacity-80 transition-all duration-300 hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
          >
            {playing ? (
              <PauseCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <PlayCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={!muted}
            aria-label={muted ? copy.controls.unmute : copy.controls.mute}
            className="surface flex h-11 w-11 items-center justify-center rounded-full text-ink opacity-0 transition-all duration-300 hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
          >
            {muted ? (
              <VolumeX className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground via-ground/35 to-transparent opacity-90" />

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
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 text-[10px] font-semibold text-accent-bright">
            <TrendingUp className="h-3 w-3 rtl:-scale-x-100" aria-hidden="true" />
            <span dir="ltr">{text.ctr}</span>
          </span>
        </div>

        {/* Hook angle + pacing reveal on hover so the card stays calm at rest. */}
        <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <dl className="flex flex-col gap-2 pt-1">
              <div className="flex items-start gap-2">
                <dt className="mt-0.5 shrink-0 text-accent-bright">
                  <Crosshair className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">{copy.labels.hook}</span>
                </dt>
                <dd className="text-xs italic leading-relaxed text-ink-muted">{text.hook}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="mt-0.5 shrink-0 text-accent-bright">
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
