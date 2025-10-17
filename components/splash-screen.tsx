"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number
    let start = Date.now()
    const duration = 800 // ms, fast loading
    const animate = () => {
      const elapsed = Date.now() - start
      const percent = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(percent)
      if (percent < 100) {
        frame = requestAnimationFrame(animate)
      } else {
        setTimeout(() => setIsVisible(false), 100)
      }
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20 md:w-32 md:h-32">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/circle-aPakbAos26yezECcsBt5lgTsenBU7q.png"
            alt="PUPUP Loading"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gold text-sm md:text-base font-bold">Loading PUPUP...</p>
        {/* Loading bar with animated progress */}
        <div className="w-40 h-2 bg-gold/20 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
