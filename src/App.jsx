import { useLenis } from './hooks/useLenis.js'
import Navbar from './components/Navbar.jsx'
import ScrollStoryCanvas from './components/ScrollStoryCanvas.jsx'
import Hero from './components/Hero.jsx'
import Narrative from './components/Narrative.jsx'
import Timeline from './components/Timeline.jsx'
import DesignShowcase from './components/DesignShowcase.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import SystemsArchitecture from './components/SystemsArchitecture.jsx'
import PerformanceAudit from './components/PerformanceAudit.jsx'
import CampaignVault from './components/CampaignVault.jsx'
import OperatingSystem from './components/OperatingSystem.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import SoundToggle from './components/ui/SoundToggle.jsx'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-ground text-ink">
      <ScrollStoryCanvas />
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <VideoShowcase />
        <DesignShowcase />
        <SystemsArchitecture />
        <PerformanceAudit />
        <Narrative />
        <Timeline />
        <CampaignVault />
        <OperatingSystem />
        <Contact />
      </main>
      <Footer />
      <SoundToggle />
    </div>
  )
}
