import { ArrowUpRight, FileText, Film, Image as ImageIcon, Images } from 'lucide-react'
import AssetImage from '../ui/AssetImage.jsx'
import CategoryMotif from './CategoryMotif.jsx'
import { getCategory, getCover, getFormat, getMedia, getMotif, getNumber } from '../../data/works/index.js'
import { useLocale } from '../../i18n/useLocale.js'
import { cn } from '../../lib/utils.js'

const FORMAT_ICONS = { caseStudy: FileText, film: Film, collection: Images, image: ImageIcon }

/**
 * The plate that represents a project everywhere it appears: catalogue
 * number and discipline on top, format and an "open" mark below, over the
 * project's cover image — or over its category motif when there is none.
 * `size="feature"` is the large variant used in the Selected Work sequence.
 */
export default function WorkCover({ work, size = 'card', className }) {
  const { t, tr } = useLocale()
  const category = getCategory(work)
  const format = getFormat(work)
  const FormatIcon = FORMAT_ICONS[format] ?? FileText
  const media = getMedia(work)
  const feature = size === 'feature'
  const duration = media.length === 1 ? media[0].duration : null

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[2px] border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong',
        className,
      )}
    >
      <AssetImage
        src={getCover(work)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.035]"
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <CategoryMotif
              {...getMotif(work)}
              className={cn(
                'transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]',
                feature ? 'h-[70%] w-[70%]' : 'h-[66%] w-[66%]',
              )}
            />
          </div>
        }
      />

      {/* Scrims keep the labels legible over any photograph. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ground/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ground/70 to-transparent" />

      <div className={cn('absolute inset-0 flex flex-col justify-between', feature ? 'p-5 sm:p-7' : 'p-4 sm:p-5')}>
        <div className="flex items-start justify-between gap-4">
          <span className="label text-accent tabular-nums" dir="ltr">
            {getNumber(work)}
          </span>
          <span className="label text-end text-ink-muted">{tr(category.label)}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="label inline-flex items-center gap-2 text-ink-muted">
            <FormatIcon aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5 shrink-0" />
            <span>{t.work.formats[format]}</span>
            {media.length > 1 && (
              <span className="tabular-nums text-ink-faint" dir="ltr">
                {media.length}
              </span>
            )}
            {duration && (
              <span className="tabular-nums text-ink-faint" dir="ltr">
                {duration}
              </span>
            )}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'flex shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-500 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-ground',
              feature ? 'h-11 w-11' : 'h-9 w-9',
            )}
          >
            <ArrowUpRight strokeWidth={1.5} className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </div>
  )
}
