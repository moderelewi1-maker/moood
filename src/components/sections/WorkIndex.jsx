import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import Button from '../ui/Button.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import WorkCard from '../work/WorkCard.jsx'
import { useWorkViewer } from '../work/WorkViewerContext.js'
import Reveal from '../../motion/Reveal.jsx'
import { activeCategories, works } from '../../data/works/index.js'
import { useLocale } from '../../i18n/useLocale.js'
import { EASE, SETTLE_SPRING } from '../../motion/config.js'
import { cn } from '../../lib/utils.js'

// Projects shown before "Show all". Divisible by 2 and 3, so the last row is
// complete at every breakpoint.
const INITIAL_COUNT = 6

/**
 * Work Index — every project, filterable by discipline.
 *
 * Filters are derived from the registry (only disciplines that have projects
 * appear), and cards re-flow with a layout animation when the filter changes,
 * so the grid holds together however many projects or categories are added.
 */
export default function WorkIndex() {
  const { t, tr } = useLocale()
  const { open } = useWorkViewer()
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)

  const filters = useMemo(
    () => [
      { id: 'all', label: null, count: works.length },
      ...activeCategories.map((category) => ({
        id: category.id,
        label: category.label,
        count: works.filter((work) => work.category === category.id).length,
      })),
    ],
    [],
  )

  const list = filter === 'all' ? works : works.filter((work) => work.category === filter)
  const visible = expanded ? list : list.slice(0, INITIAL_COUNT)
  const ids = list.map((work) => work.id)

  return (
    <section id="index" data-scene="index" aria-labelledby="index-title" className="relative py-24 lg:py-36">
      <div className="shell">
        <SectionHeader
          number="02"
          label={t.index.label}
          title={t.index.title}
          description={t.index.description}
          id="index-title"
        />

        <Reveal depth={false} className="mt-14 lg:mt-20">
          <div
            role="group"
            aria-label={t.index.filterAria}
            className="no-scrollbar -mx-[clamp(1.25rem,4.5vw,4rem)] flex gap-x-8 overflow-x-auto border-b border-line px-[clamp(1.25rem,4.5vw,4rem)] sm:mx-0 sm:px-0"
          >
            {filters.map((entry) => {
              const selected = filter === entry.id
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setFilter(entry.id)
                    setExpanded(false)
                  }}
                  className={cn(
                    'relative flex min-h-12 shrink-0 items-baseline gap-2 pb-4 pt-2 text-sm font-medium whitespace-nowrap transition-colors duration-300',
                    selected ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  <span>{entry.label ? tr(entry.label) : t.index.all}</span>
                  <span className={cn('text-xs tabular-nums', selected ? 'text-accent' : 'text-ink-faint')} dir="ltr">
                    {entry.count}
                  </span>
                  {selected && (
                    <motion.span
                      layoutId="index-filter-rule"
                      className="absolute inset-x-0 -bottom-px h-px bg-accent"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <p className="mt-16 text-ink-muted">{t.index.empty}</p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((work, i) => (
                <motion.li
                  key={work.id}
                  layout={reduce ? false : 'position'}
                  initial={reduce ? false : { opacity: 0, y: 56, rotateX: 14, transformPerspective: 1100 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    ...SETTLE_SPRING,
                    delay: (i % 3) * 0.09,
                    opacity: { duration: 0.8, ease: EASE, delay: (i % 3) * 0.09 },
                    layout: { duration: 0.7, ease: EASE },
                  }}
                  style={{ transformOrigin: '50% 100%' }}
                >
                  <WorkCard work={work} onOpen={() => open(work.id, ids)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {list.length > INITIAL_COUNT && (
          <div className="mt-16 flex justify-center border-t border-line pt-10 lg:mt-20">
            <Button
              variant="outline"
              icon={expanded ? Minus : Plus}
              flipIcon={false}
              aria-expanded={expanded}
              onClick={() => setExpanded((current) => !current)}
            >
              {expanded ? t.index.showLess : t.index.showAll}
              {!expanded && (
                <span className="ms-2 tabular-nums text-ink-faint" dir="ltr">
                  {list.length}
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
