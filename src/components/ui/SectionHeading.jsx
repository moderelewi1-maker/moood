import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import KineticText from './KineticText.jsx'
import { maskParentInView } from '../../lib/motion.js'

/**
 * Section header. The eyebrow is set as production metadata — a chapter
 * number against a rule — and the title reveals word by word, so each
 * section opens like a new slate rather than fading in as a block.
 */
export default function SectionHeading({ eyebrow, title, description, index, align = 'left' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start'
  return (
    <div className={`flex max-w-2xl flex-col gap-5 ${alignClass}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-3">
            {index && <span className="mono-meta text-accent">{index}</span>}
            <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
            <span className="mono-meta text-ink-muted">{eyebrow}</span>
          </span>
        </Reveal>
      )}

      <motion.h2
        {...maskParentInView(0.04)}
        className="display-xl font-display font-semibold text-ink"
      >
        <KineticText as="span" segments={[{ text: title }]} />
      </motion.h2>

      {description && (
        <Reveal delay={0.16}>
          <p className="text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
