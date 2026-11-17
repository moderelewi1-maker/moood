import SectionHeading from './ui/SectionHeading.jsx'
import MetaAdsLedger from './ui/MetaAdsLedger.jsx'
import { useLocale } from '../i18n/useLocale.js'

/**
 * Performance marketing, promoted out of the Systems section into its own
 * tier. Media buying and workflow engineering are different disciplines, and
 * folding the account audit under an automation heading undersold it.
 */
export default function PerformanceAudit() {
  const { t } = useLocale()
  const copy = t.audit

  return (
    <section id="ads" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="04"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div className="mt-14">
          <MetaAdsLedger />
        </div>
      </div>
    </section>
  )
}
