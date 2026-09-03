import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import VideoCard from './ui/VideoCard.jsx'
import MediaGallery from './MediaGallery.jsx'
import { videos, videoCategoryKeys } from '../data/videos.js'
import { useLocale } from '../i18n/useLocale.js'

export default function VideoShowcase() {
  const [active, setActive] = useState('all')
  const { t } = useLocale()
  const copy = t.work

  const filtered = useMemo(
    () => (active === 'all' ? videos : videos.filter((v) => v.category === active)),
    [active]
  )

  return (
    <section id="work" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {videoCategoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                  active === key
                    ? 'bg-gradient-to-r from-emerald-400 to-blue-500 text-obsidian'
                    : 'glass text-ink-muted hover:text-ink'
                }`}
              >
                {copy.categories[key]}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <VideoCard video={video} categoryLabel={copy.categories[video.category]} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <MediaGallery />
    </section>
  )
}
