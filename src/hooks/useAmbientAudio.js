import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-ambient-sound'
const SRC = '/assets/ambient.mp3'
/** Present in the room, never competing with the page. */
const TARGET_VOLUME = 0.18
const FADE_MS = 900

function readStoredPreference() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    /* storage unavailable (private mode, blocked cookies) */
    return false
  }
}

function writePreference(on) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    /* persistence is best-effort */
  }
}

/**
 * Looping ambient bed with a volume fade on both edges.
 *
 * Two pieces of state, deliberately: `wanted` is what the visitor asked for
 * and is what gets persisted, `playing` is what the browser actually granted.
 * They diverge whenever autoplay policy blocks a resume — a returning visitor
 * with sound saved as on gets no audio until they interact with the page, and
 * the button must show muted during that gap rather than claiming to play.
 * The pending resume is armed on the next real gesture instead.
 */
export function useAmbientAudio() {
  const [wanted, setWanted] = useState(readStoredPreference)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const audioRef = useRef(null)
  const frameRef = useRef(0)
  const timeoutRef = useRef(0)

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current
    // Built on demand so visitors who never enable sound never fetch the file.
    const audio = new Audio(SRC)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio
    return audio
  }, [])

  const cancelFade = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    clearTimeout(timeoutRef.current)
  }, [])

  const fadeTo = useCallback(
    (target, onDone) => {
      const audio = audioRef.current
      if (!audio) return
      cancelFade()
      const from = audio.volume
      const start = performance.now()

      const settle = () => {
        cancelFade()
        audio.volume = target
        if (onDone) onDone()
      }

      const step = (now) => {
        const progress = Math.min((now - start) / FADE_MS, 1)
        audio.volume = from + (target - from) * progress
        if (progress < 1) frameRef.current = requestAnimationFrame(step)
        else settle()
      }
      frameRef.current = requestAnimationFrame(step)

      // requestAnimationFrame stalls whenever the tab is hidden or the main
      // thread is busy (WebGL warm-up, image decode), which would otherwise
      // strand the volume mid-ramp. This guarantees it lands on target.
      timeoutRef.current = setTimeout(settle, FADE_MS + 120)
    },
    [cancelFade]
  )

  useEffect(() => {
    if (!wanted) return undefined

    const audio = ensureAudio()
    let cancelled = false

    function attempt() {
      audio
        .play()
        .then(() => {
          if (cancelled) return
          setPlaying(true)
          setBlocked(false)
          fadeTo(TARGET_VOLUME)
        })
        .catch(() => {
          // Autoplay policy, not a broken file. Wait for a real gesture.
          if (cancelled) return
          setBlocked(true)
          window.addEventListener('pointerdown', attempt, { once: true })
          window.addEventListener('keydown', attempt, { once: true })
        })
    }

    attempt()

    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', attempt)
      window.removeEventListener('keydown', attempt)
    }
  }, [wanted, ensureAudio, fadeTo])

  useEffect(() => {
    if (wanted) return undefined
    const audio = audioRef.current
    if (!audio || audio.paused) return undefined
    // Fade out first so the bed never cuts off mid-phrase.
    fadeTo(0, () => audio.pause())
    return undefined
  }, [wanted, fadeTo])

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current)
      clearTimeout(timeoutRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    },
    []
  )

  const toggle = useCallback(() => {
    setWanted((current) => {
      const next = !current
      writePreference(next)
      if (!next) setPlaying(false)
      return next
    })
  }, [])

  return { playing, blocked, toggle }
}
