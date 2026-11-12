import Reveal from '../../motion/Reveal.jsx'
import RevealText from '../../motion/RevealText.jsx'
import { cn } from '../../lib/utils.js'

/**
 * Standard section opening: a hairline, a numbered label in the margin
 * column, then the serif title and an optional lead paragraph.
 */
export default function SectionHeader({ number, label, title, description, id, className }) {
  return (
    <header className={cn('grid grid-cols-1 gap-x-12 gap-y-7 border-t border-line pt-6 lg:grid-cols-12', className)}>
      <Reveal depth={false} className="flex items-baseline gap-4 lg:col-span-3">
        <span className="label text-accent tabular-nums" dir="ltr">
          {number}
        </span>
        <span className="label text-ink-muted">{label}</span>
      </Reveal>

      <div className="lg:col-span-9">
        <RevealText as="h2" id={id} text={title} className="display display-2 max-w-[20ch] text-ink" />
        {description && (
          <Reveal depth={false} delay={0.25} className="mt-7 max-w-2xl">
            <p className="prose-lead">{description}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
