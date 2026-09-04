import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useAmbientAudio } from '../../hooks/useAmbientAudio.js'
import { useLocale } from '../../i18n/useLocale.js'
import { EASE_AUTHORITY } from '../../lib/motion.js'

// Uneven durations keep the four bars from marching in lockstep.
const BARS = [
  { duration: '1.05s', delay: '0s' },
  { duration: '0.72s', delay: '0.18s' },
  { duration: '1.28s', delay: '0.07s' },
  { duration: '0.88s', delay: '0.26s' },
]

/**
 * Ambient sound switch, pinned bottom-left. Stays physically left in both
 * locales — it is page chrome rather than reading-flow content.
 *
 * The tooltip therefore always opens to the right, in RTL too: placement
 * follows the empty space next to a left-pinned button, not reading order.
 * Mirroring it under RTL pushed it off the left edge of the viewport. Only
 * the text inside it flips, via dir.
 */
export default function SoundToggle() {
  const { playing, toggle } = useAmbientAudio()
  const [dismissed, setDismissed] = useState(false)
  const { t, isRTL } = useLocale()
  const copy = t.audio

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: EASE_AUTHORITY }}
      className="fixed bottom-6 left-6 z-50"
    >
      {/* Invitation, shown until the visitor engages. It is dismissed on the
          first press rather than on playback starting, because autoplay
          policy can refuse that press — leaving the prompt on screen after
          someone has already acted on it. */}
      <AnimatePresence>
        {!playing && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35, ease: EASE_AUTHORITY } }}
            transition={{
              opacity: { duration: 0.5, ease: EASE_AUTHORITY },
              scale: { duration: 0.5, ease: EASE_AUTHORITY },
              y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="pointer-events-none absolute bottom-full start-0 mb-3 whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="flex items-center gap-2 rounded-full border border-accent/30 bg-[#12141A]/90 px-3.5 py-2 shadow-[0_8px_30px_-12px_rgba(240,169,60,0.45)] backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-medium text-ink">{copy.prompt}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setDismissed(true)
          toggle()
        }}
        aria-pressed={playing}
        aria-label={playing ? copy.disable : copy.enable}
        className="group surface glow-ember-hover relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 hover:border-accent/40 sm:h-12 sm:w-12"
      >
        {/* Crimson bloom on hover, kept behind the bars. */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-accent/0 opacity-0 blur-md transition-all duration-500 group-hover:bg-accent/25 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span className="relative flex h-4 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((bar, i) => (
            <span
              key={i}
              data-playing={playing}
              style={{ animationDuration: bar.duration, animationDelay: bar.delay }}
              className={`eq-bar h-full w-[2.5px] rounded-full ${
                playing ? 'bg-accent-bright' : 'bg-ink-faint group-hover:bg-ink-muted'
              }`}
            />
          ))}
        </span>

        <span
          role="tooltip"
          dir={isRTL ? 'rtl' : 'ltr'}
          className="surface-raised pointer-events-none absolute bottom-1/2 left-full ml-3 -translate-x-1 translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-ink-muted opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          {playing ? copy.on : copy.off}
        </span>
      </button>
    </motion.div>
  )
}
