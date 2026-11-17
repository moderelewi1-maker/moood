import { motion } from 'framer-motion'
import { maskChild } from '../../lib/motion.js'

/**
 * Word-by-word mask reveal. Each word sits in its own clipping box and is
 * pushed up into place, so the headline appears to be set rather than faded
 * in.
 *
 * Splitting is on whitespace only, never on characters: Arabic letters join
 * within a word, and wrapping individual glyphs would sever those joins and
 * render the text as disconnected letterforms. Word boundaries are the one
 * safe split point in both scripts, and because the spans are emitted in
 * logical source order the browser's bidi algorithm lays them out correctly
 * under RTL with no per-locale branching.
 *
 * `segments` lets a headline mix plain and accented runs while keeping one
 * continuous stagger across the whole line — the emphasis is a paint
 * treatment, not a separate animation.
 */
export default function KineticText({ segments, className = '', as: Tag = 'span' }) {
  const words = segments.flatMap((segment) =>
    String(segment.text)
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: Boolean(segment.accent) }))
  )

  return (
    <Tag className={className}>
      {words.map(({ word, accent }, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
          <motion.span
            variants={maskChild}
            className={`inline-block ${accent ? 'text-accent' : ''}`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
