import { useAmbientAudio } from '../../hooks/useAmbientAudio.js'
import { useLocale } from '../../i18n/useLocale.js'
import { cn } from '../../lib/utils.js'

const BARS = [
  { height: '45%', duration: '1.05s', delay: '0s' },
  { height: '100%', duration: '0.72s', delay: '0.18s' },
  { height: '65%', duration: '1.28s', delay: '0.07s' },
  { height: '85%', duration: '0.88s', delay: '0.26s' },
]

/**
 * Ambient sound switch. Off by default; the audio file is only fetched the
 * first time a visitor turns it on, and the choice is remembered. The bars
 * stand still while it is off and move, in brass, while sound is playing.
 */
export default function SoundToggle({ className }) {
  const { playing, toggle } = useAmbientAudio()
  const { t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? t.audio.disable : t.audio.enable}
      title={playing ? t.audio.disable : t.audio.enable}
      className={cn(
        'group flex h-11 w-11 shrink-0 items-center justify-center text-ink-muted transition-colors duration-300 hover:text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="flex h-3.5 items-end gap-[3px]" dir="ltr">
        {BARS.map((bar, i) => (
          <span
            key={i}
            className={cn('w-px origin-bottom bg-current', playing && 'sound-bar text-accent')}
            style={{ height: bar.height, animationDuration: bar.duration, animationDelay: bar.delay }}
          />
        ))}
      </span>
    </button>
  )
}
