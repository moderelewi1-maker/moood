import { useLocale } from '../../i18n/useLocale.js'
import { cn } from '../../lib/utils.js'

/**
 * Switches between English and Arabic in place (no reload). The button is
 * labelled with the language it switches *to*, written in that language.
 */
export default function LanguageToggle({ className }) {
  const { locale, toggleLocale, t } = useLocale()
  const nextLocale = locale === 'ar' ? 'en' : 'ar'

  return (
    <button
      type="button"
      onClick={toggleLocale}
      lang={nextLocale}
      aria-label={t.meta.switchToAria}
      className={cn(
        'inline-flex min-h-11 items-center px-2 text-[0.8125rem] font-medium text-ink-muted transition-colors duration-300 hover:text-ink',
        nextLocale === 'ar' && 'text-[0.9375rem]',
        className,
      )}
      // The label is always in the *other* script, so its font is set explicitly.
      style={{ fontFamily: nextLocale === 'ar' ? '"IBM Plex Sans Arabic", sans-serif' : '"Inter", sans-serif' }}
    >
      {t.meta.switchTo}
    </button>
  )
}
