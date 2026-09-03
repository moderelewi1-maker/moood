import { Languages } from 'lucide-react'
import { useLocale } from '../../i18n/useLocale.js'
import { LOCALES } from '../../i18n/translations.js'

/** EN | AR segmented switch. Swapping locale re-renders in place — no reload. */
export default function LanguageToggle({ className = '', showIcon = true }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      className={`glass flex items-center gap-0.5 rounded-full p-1 ${className}`}
      role="group"
      aria-label={t.meta.switchTo}
    >
      {showIcon && (
        <Languages className="mx-1.5 h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
      )}
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
              active
                ? 'bg-gradient-to-r from-emerald-400 to-blue-500 text-obsidian'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
