import { motion } from 'framer-motion'
import { useAmbientAudio } from '../../hooks/useAmbientAudio.js'
import { useLocale } from '../../i18n/useLocale.js'

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
  const { t, isRTL } = useLocale()
  const copy = t.audio

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 z-50"
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? copy.disable : copy.enable}
        className="group surface glow-wine-hover relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 hover:border-crimson/40 sm:h-12 sm:w-12"
      >
        {/* Crimson bloom on hover, kept behind the bars. */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-crimson/0 opacity-0 blur-md transition-all duration-500 group-hover:bg-crimson/25 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span className="relative flex h-4 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((bar, i) => (
            <span
              key={i}
              data-playing={playing}
              style={{ animationDuration: bar.duration, animationDelay: bar.delay }}
              className={`eq-bar h-full w-[2.5px] rounded-full ${
                playing ? 'bg-crimson-soft' : 'bg-ink-faint group-hover:bg-ink-muted'
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
