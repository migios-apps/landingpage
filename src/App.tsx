import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { DesignedBento } from "@/components/sections/DesignedBento"
import { BuildAnything } from "@/components/sections/BuildAnything"
import { BranchIntegration } from "@/components/sections/BranchIntegration"
import { Platform } from "@/components/sections/Platform"
import { FinalCta } from "@/components/sections/FinalCta"
import { Footer } from "@/components/sections/Footer"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { AgenforceV2 } from "@/v2/AgenforceV2"

export default function App() {
  if (window.location.pathname.startsWith("/v2")) {
    return <AgenforceV2 />
  }

  return (
    <div className="mfy-page">
      <Navbar />
      <main>
        <Hero />
        <ScrollReveal>
          <DesignedBento />
        </ScrollReveal>
        <ScrollReveal>
          <BuildAnything />
        </ScrollReveal>
        <ScrollReveal>
          <BranchIntegration />
        </ScrollReveal>
        <ScrollReveal>
          <Platform />
        </ScrollReveal>
        <ScrollReveal>
          <FinalCta />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
