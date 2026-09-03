import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Images, ChevronDown } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import AssetImage from './ui/AssetImage.jsx'
import { portfolioAssets, assetCategories } from '../data/portfolioAssets.js'

const GALLERY_CATEGORIES = assetCategories.filter((c) => c.key !== 'hero')
const GALLERY_ASSETS = portfolioAssets.filter((a) => a.category !== 'hero')
const INITIAL_COUNT = 12

export default function MediaGallery() {
  const [active, setActive] = useState('all')
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(
    () => (active === 'all' ? GALLERY_ASSETS : GALLERY_ASSETS.filter((a) => a.category === active)),
    [active]
  )
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)

  return (
    <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-28 md:px-10">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
          <Images className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          Creative &amp; Proof of Performance
        </span>

        <div className="flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActive(cat.key)
                setExpanded(false)
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                active === cat.key
                  ? 'bg-gradient-to-r from-emerald-400 to-blue-500 text-obsidian'
                  : 'glass text-ink-muted hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((asset) => (
          <motion.div
            key={asset.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <AssetImage
              src={asset.url}
              alt={`${asset.category} work sample`}
              category={asset.category}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              iconClassName="h-8 w-8"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 rounded-full glass px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {asset.category}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:text-emerald-300 sm:text-sm"
          >
            {expanded ? 'Show Less' : `View Full Gallery (${filtered.length})`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
