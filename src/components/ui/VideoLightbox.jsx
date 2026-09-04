import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import Modal from './Modal.jsx'
import { EASE_AUTHORITY } from '../../lib/motion.js'
import { useLocale } from '../../i18n/useLocale.js'

function clock(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Cinema view for a reel: the video at full size on a deep obsidian ground,
 * with a real transport rather than the browser's default chrome.
 *
 * Controls are custom because the native ones cannot be themed and drop a
 * light grey bar across a page built on near-black. They also let a video be
 * held silent as a property of the asset: an item flagged `forceMuted` has no
 * volume control at all and is re-muted on every play, so a reel that must
 * not compete with the ambient bed cannot be un-muted by accident.
 *
 * Playback stops and rewinds on close. A modal that unmounts while its audio
 * carries on is the classic version of this bug.
 */
export default function VideoLightbox({ video, onClose }) {
  const { t, locale } = useLocale()
  const copy = t.video.cinema
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const shellRef = useRef(null)

  const silent = Boolean(video?.forceMuted)

  // Autoplay on open. Browsers only grant that reliably while muted, so the
  // video starts muted and the viewer raises volume deliberately — except
  // where the asset is permanently silent, in which case it simply stays so.
  useEffect(() => {
    const el = videoRef.current
    if (!video || !el) return undefined
    el.muted = true
    setMuted(true)
    el.currentTime = 0
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    return () => {
      el.pause()
      el.currentTime = 0
    }
  }, [video])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const el = videoRef.current
    if (!el || silent) return
    const next = !el.muted
    el.muted = next
    if (!next && el.volume === 0) {
      el.volume = 0.8
      setVolume(0.8)
    }
    setMuted(next)
  }, [silent])

  function onVolume(e) {
    const el = videoRef.current
    const v = Number(e.target.value)
    setVolume(v)
    if (!el || silent) return
    el.volume = v
    el.muted = v === 0
    setMuted(v === 0)
  }

  function onScrub(e) {
    const el = videoRef.current
    if (!el || !Number.isFinite(el.duration)) return
    el.currentTime = Number(e.target.value)
    setTime(el.currentTime)
  }

  async function toggleFullscreen() {
    const shell = shellRef.current
    if (!shell) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await shell.requestFullscreen()
    } catch {
      /* denied or unsupported — leave the modal as-is */
    }
  }

  // Space and arrows, the shortcuts a viewer expects from a player. Escape is
  // Modal's, so it is not duplicated here.
  useEffect(() => {
    if (!video) return undefined
    const onKey = (e) => {
      const el = videoRef.current
      if (!el) return
      if (e.code === 'Space') { e.preventDefault(); togglePlay() }
      if (e.key === 'ArrowRight') el.currentTime = Math.min(el.currentTime + 5, el.duration || 0)
      if (e.key === 'ArrowLeft') el.currentTime = Math.max(el.currentTime - 5, 0)
      if (e.key.toLowerCase() === 'm') toggleMute()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [video, togglePlay, toggleMute])

  const pct = duration > 0 ? (time / duration) * 100 : 0

  return (
    <AnimatePresence>
      {video && (
        <Modal
          open={Boolean(video)}
          onClose={onClose}
          label={video.title[locale]}
          backdropClassName="bg-black/90 backdrop-blur-2xl"
          className="flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={onClose}
            aria-label={copy.close}
            className="surface absolute end-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent sm:end-6 sm:top-6"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <motion.div
            ref={shellRef}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_AUTHORITY }}
            className={`relative flex w-full flex-col overflow-hidden rounded-sm bg-black ${
              video.orientation === 'vertical' ? 'max-w-[min(26rem,92vw)]' : 'max-w-5xl'
            }`}
          >
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              playsInline
              loop
              muted={silent || muted}
              onClick={togglePlay}
              onPlay={() => { if (silent && videoRef.current) videoRef.current.muted = true; setPlaying(true) }}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              className={`w-full cursor-pointer bg-black ${
                video.orientation === 'vertical' ? 'max-h-[78vh] object-contain' : 'max-h-[76vh] object-contain'
              }`}
            />

            {/* Transport */}
            <div className="flex flex-col gap-3 border-t border-hairline bg-surface/80 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="mono-meta shrink-0 text-ink-faint" dir="ltr">{clock(time)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={time}
                  onChange={onScrub}
                  aria-label={copy.scrub}
                  className="video-range h-1 w-full"
                  style={{ '--fill': `${pct}%` }}
                  dir="ltr"
                />
                <span className="mono-meta shrink-0 text-ink-faint" dir="ltr">{clock(duration)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-pressed={playing}
                  aria-label={playing ? copy.pause : copy.play}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ground transition-colors duration-300 hover:bg-accent-bright"
                >
                  {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 ms-0.5" aria-hidden="true" />}
                </button>

                {silent ? (
                  <span className="mono-meta flex items-center gap-1.5 text-ink-faint">
                    <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
                    {copy.silent}
                  </span>
                ) : (
                  <>
                    <button
                      onClick={toggleMute}
                      aria-pressed={!muted}
                      aria-label={muted ? copy.unmute : copy.mute}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-accent"
                    >
                      {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={muted ? 0 : volume}
                      onChange={onVolume}
                      aria-label={copy.volume}
                      className="video-range h-1 w-20 sm:w-28"
                      style={{ '--fill': `${(muted ? 0 : volume) * 100}%` }}
                      dir="ltr"
                    />
                  </>
                )}

                <span className="mono-meta ms-auto hidden truncate text-ink-muted sm:block">
                  {video.title[locale]}
                </span>

                <button
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? copy.exitFullscreen : copy.fullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-accent"
                >
                  {fullscreen ? <Minimize className="h-4 w-4" aria-hidden="true" /> : <Maximize className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </motion.div>

          <span className="mono-meta absolute inset-x-0 bottom-2 text-center text-ink-faint" aria-hidden="true">
            {copy.hint}
          </span>
        </Modal>
      )}
    </AnimatePresence>
  )
}
