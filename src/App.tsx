import { Box } from "@chakra-ui/react"

import { LandingNavbar } from "@/components/layout/landing-navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CurriculaSection } from "@/components/landing/curricula-section"
import { AudiencesSection } from "@/components/landing/audiences-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

function App() {
  return (
    <Box minH="100svh" bg="page">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CurriculaSection />
      <AudiencesSection />
      <CtaSection />
      <Footer />
    </Box>
  )
}

export default App
