import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Button from '../ui/Button.jsx'
import LanguageToggle from '../ui/LanguageToggle.jsx'
import { contact, navLinks } from '../../data/site.js'
import { useLocale } from '../../i18n/useLocale.js'
import { EASE, SCROLL_SPRING } from '../../motion/config.js'
import { cn, lockScroll, scrollToHash } from '../../lib/utils.js'

const SECTION_IDS = navLinks.flatMap((link) => link.sections)

/** Id of the section currently crossing the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive((current) => (current === entry.target.id ? null : current))
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return active
}

export default function Navbar() {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const release = lockScroll()
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      release()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function go(hash) {
    setOpen(false)
    // Wait a frame so the menu's scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToHash(hash))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="absolute start-4 top-3 z-10 -translate-y-20 rounded-[2px] bg-ink px-4 py-2 text-sm font-medium text-ground transition-transform focus:translate-y-0"
      >
        {t.nav.skip}
      </a>

      <div
        className={cn(
          'relative border-b transition-colors duration-500',
          scrolled || open ? 'border-line bg-ground/85 backdrop-blur-md' : 'border-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a
            href="#top"
            aria-label={t.nav.homeAria}
            onClick={(event) => {
              event.preventDefault()
              go('#top')
            }}
            className="display shrink-0 text-[1.375rem] leading-none whitespace-nowrap text-ink rtl:text-[1.7rem]"
          >
            {t.nav.brand}
          </a>

          <nav aria-label={t.nav.primaryAria} className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const current = link.sections.includes(active)
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={current ? 'location' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    go(link.href)
                  }}
                  className={cn(
                    'relative py-2 text-[0.8125rem] font-medium transition-colors duration-300 rtl:text-[0.9375rem]',
                    current ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {t.nav[link.id]}
                  {current && (
                    <motion.span
                      layoutId="nav-current"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageToggle />
            <div className="hidden sm:block">
              <Button variant="outline" size="sm" onClick={() => go('#contact')}>
                {t.nav.cta}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-me-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    'absolute inset-x-0 top-0 h-px bg-ink transition-transform duration-500 ease-expo',
                    open && 'translate-y-[5.5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500 ease-expo',
                    open && '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress: a brass hairline drawn along the bar's lower edge. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent rtl:origin-right"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ground lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label={t.nav.primaryAria} className="shell flex min-h-full flex-col justify-between pt-8 pb-10">
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.06 + i * 0.06 }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault()
                        go(link.href)
                      }}
                      className="flex items-baseline gap-5 py-6"
                    >
                      <span className="label text-accent tabular-nums" dir="ltr">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="display display-3 text-ink">{t.nav[link.id]}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href={`mailto:${contact.email}`} dir="ltr" className="mt-10 block text-sm text-ink-muted">
                {contact.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
