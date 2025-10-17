"use client"

import { LINKS } from "@/lib/constants"
import { useState } from "react"

export function ContractCard() {
  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxpump"
  const [showToast, setShowToast] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      alert('Failed to copy address. Silakan copy manual.')
    }
  }

  return (
    <section className="py-12 md:py-16 bg-black grain-overlay border-t border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Contract Address Card */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <h3 className="text-lg font-bold text-gold">Contract Address</h3>
            </div>
            <p className="text-sm text-muted mb-4 break-all font-mono">{contractAddress}</p>
            <button
              onClick={() => copyToClipboard(contractAddress)}
              className="w-full px-4 py-2 bg-gold/20 hover:bg-gold/30 border border-gold/40 rounded text-gold font-semibold transition-all"
            >
              Copy Address
            </button>
            {showToast && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gold text-black px-6 py-3 rounded-lg shadow-lg font-bold text-base z-50 animate-toast">
                Address copied!
              </div>
            )}
<style jsx>{`
@keyframes toast {
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  50% { opacity: 1; transform: translateY(0) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-toast {
  animation: toast 0.5s cubic-bezier(0.4,0,0.2,1);
}
`}</style>
          </div>

          {/* Pump.fun Link Card */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30 rounded-lg p-6 hover:border-gold/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gold">Buy on Pump.fun</h3>
            </div>
            <p className="text-sm text-muted mb-4">Get $PUP tokens on Pump.fun</p>
            <a
              href={LINKS.pumpfun}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-gold text-black rounded font-semibold hover:shadow-[0_0_20px_rgba(222,157,35,0.5)] transition-all inline-block text-center"
            >
              Open Pump.fun
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
