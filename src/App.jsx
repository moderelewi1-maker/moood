import { useLenis } from './hooks/useLenis.js'
import Navbar from './components/Navbar.jsx'
import ScrollStoryCanvas from './components/ScrollStoryCanvas.jsx'
import Hero from './components/Hero.jsx'
import Narrative from './components/Narrative.jsx'
import Timeline from './components/Timeline.jsx'
import DesignShowcase from './components/DesignShowcase.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import CampaignVault from './components/CampaignVault.jsx'
import OperatingSystem from './components/OperatingSystem.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import SoundToggle from './components/ui/SoundToggle.jsx'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-carbon text-ink">
      <ScrollStoryCanvas />
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Narrative />
        <Timeline />
        <DesignShowcase />
        <VideoShowcase />
        <CampaignVault />
        <OperatingSystem />
        <Contact />
      </main>
      <Footer />
      <SoundToggle />
    </div>
  )
}
