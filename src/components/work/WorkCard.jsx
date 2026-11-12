import WorkCover from './WorkCover.jsx'
import TiltCard from '../../motion/TiltCard.jsx'
import { useLocale } from '../../i18n/useLocale.js'

/** A project in the Work Index: tilting cover plate, then title and summary. */
export default function WorkCard({ work, onOpen }) {
  const { t, tr } = useLocale()
  const title = tr(work.title)

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t.index.openAria}: ${title}`}
      className="group flex h-full w-full flex-col text-start"
    >
      <TiltCard className="aspect-[4/3] w-full" max={4}>
        <WorkCover work={work} />
      </TiltCard>
      <span className="mt-5 block">
        <span className="display display-4 block text-ink transition-colors duration-300 group-hover:text-accent-soft">
          {title}
        </span>
        {work.summary && (
          <span className="mt-2.5 line-clamp-2 block text-[0.9375rem] leading-relaxed text-ink-muted">
            {tr(work.summary)}
          </span>
        )}
      </span>
    </button>
  )
}
