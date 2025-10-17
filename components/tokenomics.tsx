"use client"

import { TOTAL_SUPPLY, TAX, LIQ_LOCKED, OWNERSHIP_RENOUNCED } from "@/lib/constants"

export function Tokenomics() {
  const stats = [
    {
      label: "Total Supply",
      value: TOTAL_SUPPLY,
      icon: "📊",
    },
    {
      label: "Tax",
      value: TAX,
      icon: "💸",
    },
    {
      label: "Liquidity",
      value: LIQ_LOCKED ? "Locked" : "Unlocked",
      icon: "🔒",
    },
    {
      label: "Ownership",
      value: OWNERSHIP_RENOUNCED ? "Renounced" : "Active",
      icon: "👑",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Tokenomics</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="gold-border rounded-lg p-6 transition-all duration-300 group cursor-pointer"
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
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <p className="text-muted text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Community First badge */}
        <div className="mt-12 text-center">
          <div className="inline-block gold-border rounded-full px-6 py-3">
            <p className="text-gold font-semibold">Community First • 0% Tax • Forever Locked</p>
          </div>
        </div>
      </div>
    </section>
  )
}
