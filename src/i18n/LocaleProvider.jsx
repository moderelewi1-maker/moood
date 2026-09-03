import { useCallback, useEffect, useMemo, useState } from 'react'
import { LocaleContext } from './LocaleContext.js'
import { translations, LOCALES, DEFAULT_LOCALE, RTL_LOCALES } from './translations.js'

const STORAGE_KEY = 'portfolio-locale'

function readStoredLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && LOCALES.includes(stored)) return stored
  } catch {
    /* storage unavailable (private mode, blocked cookies) — fall through */
  }
  // Fall back to the browser's language when it's one we speak.
  const browser = window.navigator?.language?.slice(0, 2)
  return LOCALES.includes(browser) ? browser : DEFAULT_LOCALE
}

export default function LocaleProvider({ children }) {
  // Resolved during the first render so there is no locale flash and no
  // setState-in-effect cascade.
  const [locale, setLocale] = useState(readStoredLocale)

  const isRTL = RTL_LOCALES.includes(locale)
  const dir = isRTL ? 'rtl' : 'ltr'
  const t = translations[locale] ?? translations[DEFAULT_LOCALE]

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
    document.title = t.meta.title
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* persistence is best-effort */
    }
  }, [locale, dir, t])

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'ar' ? 'en' : 'ar'))
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t, dir, isRTL }),
    [locale, toggleLocale, t, dir, isRTL]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
