import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Showcase } from "@/components/sections/Showcase"
import { DesignedBento } from "@/components/sections/DesignedBento"
import { BuildAnything } from "@/components/sections/BuildAnything"
import { BranchIntegration } from "@/components/sections/BranchIntegration"
import { Platform } from "@/components/sections/Platform"
import { FinalCta } from "@/components/sections/FinalCta"
import { Footer } from "@/components/sections/Footer"

export default function App() {
  return (
    <div className="mfy-page">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <DesignedBento />
        <BuildAnything />
        <BranchIntegration />
        <Platform />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
