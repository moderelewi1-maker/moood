import { ArrowUpRight, FileText, Film, Image as ImageIcon, Images, Workflow } from 'lucide-react'
import AssetImage from '../ui/AssetImage.jsx'
import CategoryMotif from './CategoryMotif.jsx'
import { previewOf } from '../../data/works/helpers.js'
import { getCategory, getCover, getFormat, getMedia, getMotif, getNumber } from '../../data/works/index.js'
import { useLocale } from '../../i18n/useLocale.js'
import { backdropClass, cn } from '../../lib/utils.js'

const FORMAT_ICONS = { caseStudy: FileText, film: Film, collection: Images, image: ImageIcon, system: Workflow }

/**
 * The plate that represents a project everywhere it appears, built like a
 * catalogue card: a header band (catalogue number, discipline), the cover
 * image, and a footer band (format, "open" mark). Keeping the text on the
 * bands rather than over the picture means it reads the same on a white
 * logo sheet as on a dark film still.
 *
 * A project without an image shows its discipline's line-art instead.
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
  const cover = getCover(work)
  // Diagrams and marks are shown whole on the plate; photographs fill it.
  const contain = work.coverFit === 'contain'
  const coverItem = media.find((item) => item.src === cover)
  const band = cn('flex shrink-0 items-center justify-between gap-4', feature ? 'h-14 px-5 sm:px-6' : 'h-12 px-4')

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-[2px] border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong',
        className,
      )}
    >
      <div className={cn(band, 'border-b border-line')}>
        <span className="label text-accent tabular-nums" dir="ltr">
          {getNumber(work)}
        </span>
        <span className="label truncate text-ink-muted">{tr(category.label)}</span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-ground-2">
        <AssetImage
          src={previewOf(cover) ?? cover}
          fallbackSrc={cover}
          alt=""
          className={cn(
            'absolute transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.035]',
            contain ? 'inset-[8%] h-[84%] w-[84%] rounded-[2px] object-contain' : 'inset-0 h-full w-full object-cover',
            backdropClass(coverItem),
          )}
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <CategoryMotif
                {...getMotif(work)}
                className="h-[78%] w-[78%] transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]"
              />
            </div>
          }
        />
      </div>

      <div className={cn(band, 'border-t border-line')}>
        <span className="label inline-flex min-w-0 items-center gap-2 text-ink-muted">
          <FormatIcon aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{t.work.formats[format]}</span>
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
            feature ? 'h-9 w-9' : 'h-8 w-8',
          )}
        >
          <ArrowUpRight strokeWidth={1.5} className="h-3.5 w-3.5 rtl:-scale-x-100" />
        </span>
      </div>
    </div>
  )
}
