import { ArrowUp } from 'lucide-react'
import { scrollToHash } from '../lib/utils.js'
import { useLocale } from '../i18n/useLocale.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLocale()

  return (
    <footer className="relative border-t border-hairline py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row md:px-10">
        <p className="text-center text-xs text-ink-faint sm:text-start">
          &copy; {year} {t.footer.rights}
        </p>
        <button
          onClick={() => scrollToHash('#top')}
          className="surface flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:text-ice-soft"
        >
          {t.footer.backToTop}
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
