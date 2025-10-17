"use client"

import { NFT_COLLECTION } from "@/lib/constants"

export function NftGallery() {
  return (
    <section className="py-20 md:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">NFT Collection</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {NFT_COLLECTION.map((nft, idx) => (
            <div
              key={idx}
              className="gold-border rounded-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer group"
              style={{
                boxShadow: "0 0 30px rgba(222, 157, 35, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(222, 157, 35, 0.5)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(222, 157, 35, 0.3)"
              }}
            >
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{nft.emoji}</div>
              <h3 className="text-xl font-bold text-center">{nft.name}</h3>
              <p className="text-muted text-sm mt-2 text-center">Exclusive holder benefits</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
