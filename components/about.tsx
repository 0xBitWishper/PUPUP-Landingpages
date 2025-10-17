"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4">
        {/* Section divider */}
        <div className={`flex items-center justify-center mb-12 md:mb-16 ${isVisible ? "fade-in-up" : ""}`}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold px-6 md:px-8 text-center">Meet Pupup</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Story text */}
          <div className={`space-y-4 md:space-y-6 ${isVisible ? "fade-in-up-delay-1" : ""}`}>
            <p className="text-sm md:text-base lg:text-lg text-muted leading-relaxed">
              Born from the blockchain sewers, Pupup was flushed into chaos, pressure, and pure luck. He crawled out
              glittering gold, found a throne, and crowned himself the ruler of meme royalty.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted leading-relaxed">
              Pupup isn't here to whisper; he's here to flex — black suit, gold trim, and a smirk that says "number go
              up."
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted leading-relaxed">
              In the Pupup Universe, humor funds ambition. Holders don't just watch charts; they spark culture, mint
              legendary moments, and play to climb a golden leaderboard.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted leading-relaxed">
              The rules are simple: laugh loud, play hard, and keep it classy. This is where the internet's silliest
              idea meets its richest energy.
            </p>

            {/* Pupup's Pledge */}
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gold/20">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Pupup's Pledge:</h3>
              <ul className="space-y-2 text-sm md:text-base text-muted">
                <li className="flex items-center gap-3">
                  <span className="text-gold">→</span>
                  "I don't need rockets — I already have a throne." 🚽👑
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">→</span>
                  "Stay poopy. Stay rich." 💩💰
                </li>
              </ul>
            </div>
          </div>

          {/* Pupup illustration */}
          <div className={`flex justify-center ${isVisible ? "scale-in" : ""}`}>
            <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Oct%2017%2C%202025%2C%2010_29_23%20PM-Photoroom-A62OJg2Eh9PZykcuT2euNwZfpLE3GG.png"
                alt="PUPUP Character"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(222,157,35,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
