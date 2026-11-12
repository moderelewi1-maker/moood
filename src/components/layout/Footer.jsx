import { ArrowUp } from 'lucide-react'
import { useLocale } from '../../i18n/useLocale.js'
import { scrollToHash } from '../../lib/utils.js'

export default function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="shell flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center">
        <p className="text-[0.8125rem] text-ink-faint">
          &copy; <span dir="ltr">{year}</span> {t.footer.rights}
        </p>
        <button
          type="button"
          onClick={() => scrollToHash('#top')}
          className="label group inline-flex min-h-11 items-center gap-3 text-ink-muted transition-colors duration-300 hover:text-ink"
        >
          {t.footer.backToTop}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent">
            <ArrowUp aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </footer>
  )
}
