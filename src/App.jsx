import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import FeaturedWork from './components/sections/FeaturedWork.jsx'
import WorkIndex from './components/sections/WorkIndex.jsx'
import Results from './components/sections/Results.jsx'
import Capabilities from './components/sections/Capabilities.jsx'
import Approach from './components/sections/Approach.jsx'
import Contact from './components/sections/Contact.jsx'
import WorkViewer from './components/work/WorkViewer.jsx'
import { WorkViewerContext } from './components/work/WorkViewerContext.js'
import SceneCanvas from './scene/SceneCanvas.jsx'
import { works } from './data/works/index.js'
import { useSmoothScroll } from './motion/useSmoothScroll.js'

const ALL_IDS = works.map((work) => work.id)

export default function App() {
  useSmoothScroll()

  // The project viewer is opened from several sections, so its state lives
  // here: the list being browsed and the position within it.
  const [viewer, setViewer] = useState(null)

  const viewerApi = useMemo(
    () => ({
      open(id, ids = ALL_IDS) {
        setViewer({ ids, index: Math.max(0, ids.indexOf(id)) })
      },
    }),
    [],
  )
  const closeViewer = useCallback(() => setViewer(null), [])
  const navigateViewer = useCallback(
    (index) => setViewer((current) => (current ? { ...current, index } : current)),
    [],
  )

  return (
    <MotionConfig reducedMotion="user">
      <WorkViewerContext.Provider value={viewerApi}>
        <div className="relative min-h-svh bg-ground text-ink">
          <SceneCanvas />
          <Navbar />
          <main id="main" tabIndex={-1} className="relative z-10 outline-none">
            <Hero />
            <FeaturedWork />
            <WorkIndex />
            <Results />
            <Capabilities />
            <Approach />
            <Contact />
          </main>
          <Footer />
          <div className="grain" aria-hidden="true" />
        </div>

        <AnimatePresence>
          {viewer && (
            <WorkViewer
              key="work-viewer"
              ids={viewer.ids}
              index={viewer.index}
              onNavigate={navigateViewer}
              onClose={closeViewer}
            />
          )}
        </AnimatePresence>
      </WorkViewerContext.Provider>
    </MotionConfig>
  )
}
