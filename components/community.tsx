"use client"

import { LINKS } from "@/lib/constants"
import { GoldButton } from "./gold-button"

export function Community() {
  return (
    <section className="py-20 md:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Join The Pupup Club 💩</h2>
        <p className="text-muted text-base md:text-sm mb-12 max-w-2xl mx-auto">
          Connect with thousands of PUPUP holders, share memes, and build the richest community in crypto.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <GoldButton href={LINKS.twitter}>
            <span className="mr-2">𝕏</span> Profile
          </GoldButton>
          <GoldButton href={LINKS.telegram}>
            <span className="mr-2">💬</span> Community
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
