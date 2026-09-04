import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import VideoCard from './ui/VideoCard.jsx'
import { videoItems, videoFormats } from '../data/media.js'
import { useLocale } from '../i18n/useLocale.js'

export default function VideoShowcase() {
  const [active, setActive] = useState('all')
  const { t } = useLocale()
  const copy = t.video

  const { landscape, vertical } = useMemo(() => {
    const pool = active === 'all' ? videoItems : videoItems.filter((v) => v.orientation === active)
    return {
      landscape: pool.filter((v) => v.orientation === 'landscape'),
      vertical: pool.filter((v) => v.orientation === 'vertical'),
    }
  }, [active])

  return (
    <section id="video" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {videoFormats.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                  active === key ? 'bg-crimson text-ink' : 'surface text-ink-muted hover:text-ink'
                }`}
              >
                {copy.formats[key]}
              </button>
            ))}
          </Reveal>
        </div>

        {landscape.length > 0 && (
          <motion.div layout className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {landscape.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {vertical.length > 0 && (
          <motion.div
            layout
            className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {vertical.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
