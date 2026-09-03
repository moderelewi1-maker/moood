import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/socials.js'
import { scrollToHash } from '../lib/utils.js'
import { useLocale } from '../i18n/useLocale.js'
import MagneticButton from './ui/MagneticButton.jsx'
import LanguageToggle from './ui/LanguageToggle.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleNavClick(href) {
    setOpen(false)
    scrollToHash(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 md:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#top')
          }}
          className={`glass shrink-0 rounded-full px-5 py-2.5 font-display text-sm font-semibold tracking-wide text-ink transition-all duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-90'
          }`}
        >
          {t.nav.brand}
        </a>

        <nav className="hidden lg:flex glass items-center gap-1 rounded-full px-2 py-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
            >
              {t.nav[link.id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:flex" />

          <div className="hidden lg:block">
            <MagneticButton
              variant="secondary"
              onClick={() => handleNavClick('#contact')}
              className="!px-5 !py-2.5 !text-xs"
            >
              {t.nav.cta}
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass-strong mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="rounded-xl px-4 py-3 text-start text-base font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {t.nav[link.id]}
              </button>
            ))}
            <LanguageToggle className="mt-2 self-start sm:hidden" />
            <button
              onClick={() => handleNavClick('#contact')}
              className="mt-1 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 px-4 py-3 text-center text-base font-semibold text-obsidian"
            >
              {t.nav.cta}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
