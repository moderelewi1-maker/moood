import { useState } from 'react'
import { Mail, MapPin, Copy, Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import GlassCard from './ui/GlassCard.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { LinkedInIcon, GithubIcon, WhatsAppIcon } from './ui/BrandIcons.jsx'
import { contactInfo, socials } from '../data/socials.js'

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GithubIcon, whatsapp: WhatsAppIcon }

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — mailto link below still works */
    }
  }

  return (
    <section id="contact" className="relative py-28 sm:py-32">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading
          align="center"
          eyebrow="Contact & Global Connect"
          title="Let's Build Your Growth Engine"
          description="Available for full-time growth roles, media buying partnerships, and direct-response video production."
        />

        <Reveal delay={0.1} className="mx-auto mt-14">
          <GlassCard className="glow-emerald flex flex-col items-center gap-6 p-8 text-center sm:p-12">
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-display text-2xl font-semibold text-ink transition-colors hover:text-emerald-300 sm:text-3xl md:text-4xl"
            >
              {contactInfo.email}
            </a>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton as="a" href={`mailto:${contactInfo.email}`} variant="primary">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Send an Email
              </MagneticButton>
              <MagneticButton variant="secondary" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy Address'}
              </MagneticButton>
            </div>

            <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <MapPin className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {contactInfo.location}
            </span>

            <div className="mt-2 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon]
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:text-emerald-300"
                  >
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </a>
                )
              })}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
