"use client"

import { ROADMAP_PHASES } from "@/lib/constants"
import { useEffect, useRef, useState } from "react"

export function Roadmap() {
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
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4">
        <h2
          className={`text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 ${isVisible ? "fade-in-up" : ""}`}
        >
          Roadmap
        </h2>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on md+ */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold/50 to-transparent hidden md:block" />

          <div className="space-y-6 md:space-y-8 lg:space-y-12">
            {ROADMAP_PHASES.map((phase, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ${
                  isVisible ? `fade-in-up-delay-${Math.min(idx, 3)}` : ""
                }`}
              >
                {/* Content - full width on mobile, flex-1 on desktop */}
                <div className="flex-1 w-full md:text-right">
                  <div
                    className="gold-border rounded-lg p-4 md:p-5 lg:p-6 transition-all duration-300"
                    style={{
                      boxShadow: "0 0 30px rgba(222, 157, 35, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(222, 157, 35, 0.4)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(222, 157, 35, 0.2)"
                    }}
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 md:justify-end">
                      <span className="text-xl md:text-2xl lg:text-3xl">{phase.emoji}</span>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{phase.title}</h3>
                    </div>
                    <p className="text-base md:text-base lg:text-lg text-muted leading-relaxed">{phase.description}</p>
                  </div>
                </div>

                {/* Timeline dot - hidden on mobile, visible on md+ */}
                <div className="hidden md:flex justify-center flex-shrink-0">
                  <div
                    className="w-5 h-5 md:w-6 md:h-6 bg-gold rounded-full border-4 border-black flex-shrink-0"
                    style={{
                      boxShadow: "0 0 20px rgba(222, 157, 35, 0.5)",
                    }}
                  />
                </div>

                {/* Spacer - hidden on mobile */}
                <div className="hidden md:flex flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
