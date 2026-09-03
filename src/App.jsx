import { useLenis } from './hooks/useLenis.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Narrative from './components/Narrative.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import Timeline from './components/Timeline.jsx'
import OperatingSystem from './components/OperatingSystem.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-obsidian text-ink">
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Narrative />
        <VideoShowcase />
        <Timeline />
        <OperatingSystem />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
