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

  function engage() {
    setDismissed(true)
    toggle()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: EASE_AUTHORITY }}
      className="fixed bottom-6 left-6 z-50"
    >
      {/* Invitation, shown until the visitor engages.
          It is a real button, not a label: a prompt that says "click here"
          and then ignores the click is worse than no prompt. Pressing it does
          exactly what pressing the toggle does.

          Dismissal is on the press rather than on playback starting, because
          autoplay policy can refuse that press — which would leave the prompt
          on screen after someone had already acted on it.

          Enter/exit and the float loop live on different elements. Sharing
          one element means the exit's y fights the loop's y mid-flight, which
          is exactly the jitter this is meant to avoid. */}
      <AnimatePresence>
        {!playing && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.5, ease: EASE_AUTHORITY } }}
            transition={{ duration: 0.5, ease: EASE_AUTHORITY }}
            /* Physical left, not logical start. The toggle is pinned to the
               physical bottom-left in both locales, so `start-0` under RTL
               anchored the pill's right edge to the button and grew it
               leftward — off the screen at x -108. Placement here follows the
               empty space beside a left-pinned control, not reading order;
               only the text inside flips. Same rule as the tooltip below. */
            className="absolute bottom-full left-0 mb-3"
          >
            <motion.button
              type="button"
              onClick={engage}
              aria-label={copy.enable}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center gap-2 whitespace-nowrap rounded-full border border-accent/25 bg-[#0D0F14]/95 px-3.5 py-2 shadow-[0_10px_34px_-14px_rgba(240,169,60,0.5)] backdrop-blur-md transition-colors duration-300 hover:border-accent/50"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-ink-muted">{copy.prompt}</span>

              {/* Caret, sitting over the button's centre (22px in from the
                  container edge on a 44px control). A rotated square showing
                  only its two lower edges, so it reads as one shape with the
                  pill rather than a box stuck underneath it. */}
              <span
                className="absolute -bottom-[5px] left-[17px] h-2.5 w-2.5 rotate-45 border-b border-r border-accent/25 bg-[#0D0F14]/95"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={engage}
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
