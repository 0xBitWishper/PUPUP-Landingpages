import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Roadmap } from "@/components/roadmap"
import { PupupTapGame } from "@/components/pupup-tap-game"
import { Community } from "@/components/community"
import { Footer } from "@/components/footer"
import { ContractCard } from "@/components/contract-card"
import { AskPupupSection } from "@/components/ask-pupup-section"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />

      <ContractCard />

      <SectionDivider />

      <About />

      <SectionDivider />

      <Roadmap />

      <SectionDivider />

      <section id="game" className="py-16 md:py-32 bg-black grain-overlay">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 fade-in-up">
            Tap The Pupup
          </h2>
          <div className="flex justify-center fade-in-up-delay-1">
            <div className="w-full max-w-2xl">
              <PupupTapGame />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <AskPupupSection />

      <SectionDivider />

      <Community />
      <Footer />
    </main>
  )
}
