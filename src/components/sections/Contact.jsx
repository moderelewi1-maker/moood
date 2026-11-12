import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import AssetImage from '../ui/AssetImage.jsx'
import Button from '../ui/Button.jsx'
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from '../ui/BrandIcons.jsx'
import Reveal from '../../motion/Reveal.jsx'
import RevealText from '../../motion/RevealText.jsx'
import { contact, socials } from '../../data/site.js'
import { useLocale } from '../../i18n/useLocale.js'

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GithubIcon, whatsapp: WhatsAppIcon }

// Only profiles with a real address are shown (see data/site.js).
const liveSocials = socials.filter((social) => /^https?:\/\//.test(social.href))

function Detail({ label, children }) {
  return (
    <div className="border-t border-line pt-5">
      <dt className="label text-ink-faint">{label}</dt>
      <dd className="mt-3 text-ink">{children}</dd>
    </div>
  )
}

export default function Contact() {
  const { t } = useLocale()
  const copy = t.contact
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <section
      id="contact"
      data-scene="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col justify-center py-24 lg:py-36"
    >
      <div className="shell">
        <div className="border-t border-line pt-6">
          <Reveal depth={false} className="flex items-baseline gap-4">
            <span className="label text-accent tabular-nums" dir="ltr">
              06
            </span>
            <span className="label text-ink-muted">{copy.label}</span>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <RevealText
                as="h2"
                id="contact-title"
                text={copy.title}
                className="display display-1 mt-10 max-w-[15ch] text-ink lg:mt-14"
              />

              <Reveal depth={false} delay={0.2} className="mt-8 max-w-xl lg:mt-10">
                <p className="prose-lead">{copy.description}</p>
              </Reveal>
            </div>

            {/* Portrait: a plate standing in front of the instrument. */}
            {contact.portrait && (
              <Reveal delay={0.15} className="lg:col-span-4">
                <AssetImage
                  src={contact.portrait}
                  alt={copy.portraitAlt}
                  className="aspect-[3/4] w-40 rounded-[2px] border border-line object-cover object-top sm:w-52 lg:ms-auto lg:w-full lg:max-w-[19rem]"
                />
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="mt-12 lg:mt-16">
            <a
              href={`mailto:${contact.email}`}
              dir="ltr"
              className="group/mail inline-flex max-w-full items-center gap-3 text-ink sm:gap-5"
            >
              <span className="link-draw display min-w-0 pb-1 text-[clamp(1.25rem,3.4vw+0.5rem,3.1rem)] leading-tight break-all">
                {contact.email}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.25}
                className="h-6 w-6 shrink-0 text-accent transition-transform duration-500 ease-expo group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1 sm:h-9 sm:w-9"
              />
            </a>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${contact.email}`} icon={ArrowUpRight}>
                {copy.sendEmail}
              </Button>
              <Button variant="outline" icon={copied ? Check : Copy} flipIcon={false} onClick={handleCopy}>
                <span aria-live="polite">{copied ? copy.copied : copy.copy}</span>
              </Button>
            </div>
          </Reveal>

          <Reveal depth={false} delay={0.15} className="mt-16 lg:mt-24">
            <dl className="grid max-w-4xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
              <Detail label={copy.locationLabel}>{copy.location}</Detail>
              <Detail label={copy.availabilityLabel}>{copy.availability}</Detail>
              {liveSocials.length > 0 && (
                <Detail label={copy.profilesLabel}>
                  <ul className="flex items-center gap-2">
                    {liveSocials.map((social) => {
                      const Icon = SOCIAL_ICONS[social.id]
                      return (
                        <li key={social.id}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={copy.socials[social.id]}
                            title={copy.socials[social.id]}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent-soft"
                          >
                            {Icon && <Icon aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" />}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </Detail>
              )}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
