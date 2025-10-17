"use client"


import { useEffect, useState } from "react"
import { GoldButton } from "./gold-button"
import Image from "next/image"

export function Hero() {
  // State for playing animation
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  // Play audio and trigger animation
  const playAudio = () => {
    if (isPlaying) return; // Prevent double play
    setIsPlaying(true)
    setShowPopup(false)
    const audio = new window.Audio('/audio/fart.ogg');
    audio.volume = 1;
    audio.play();
    audio.onended = () => {
      setIsPlaying(false)
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
    }
    audio.onerror = () => setIsPlaying(false)
  }
  const scrollToGame = () => {
    const gameSection = document.getElementById("game")
    gameSection?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom of page smoothly
  // Smooth scroll to bottom with slower animation
  const scrollToBottom = () => {
    const startY = window.scrollY
    const endY = document.body.scrollHeight - window.innerHeight
  const duration = 10000 // ms (ultra slow and smooth)
    const startTime = performance.now()
    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2 // easeInOut
      window.scrollTo(0, startY + (endY - startY) * ease)
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }
    requestAnimationFrame(animateScroll)
  }

  // Gold particles random positions and animation only on client
  const [particles, setParticles] = useState<Array<{
    left: string
    top: string
    animation: string
    animationDelay: string
  }>>([])

  useEffect(() => {
    const arr = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
    }))
    setParticles(arr)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
      {/* Dexscreener, Pumpfun, GMGN links - move to very top */}
      <div className="absolute top-4 left-0 w-full flex flex-col items-center z-20 fade-in-up px-2">
        <div className="w-full text-center">
          {/* Mobile: 3 buttons in a row, 1 below; Desktop: 4 buttons in a row */}
          <div className="flex flex-row gap-2 sm:gap-3 justify-center items-center w-full md:flex-row md:mb-0 mb-2">
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="px-2 py-2 rounded bg-black border border-gold text-gold font-semibold text-xs md:text-base hover:bg-gold hover:text-black transition-all flex flex-row items-center gap-2 w-full md:w-auto text-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20" className="inline-block"><path d="M10.75 3a.75.75 0 0 1 .75-.75h5.5A.75.75 0 0 1 17.75 3v5.5a.75.75 0 0 1-1.5 0V4.56l-9.22 9.22a.75.75 0 1 1-1.06-1.06l9.22-9.22H11.5a.75.75 0 0 1-.75-.75z"/></svg>
              <span className="w-full text-center">Dexscreener</span>
            </a>
            <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="px-2 py-2 rounded bg-black border border-gold text-gold font-semibold text-xs md:text-base hover:bg-gold hover:text-black transition-all flex flex-row items-center gap-2 w-full md:w-auto text-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20" className="inline-block"><path d="M10.75 3a.75.75 0 0 1 .75-.75h5.5A.75.75 0 0 1 17.75 3v5.5a.75.75 0 0 1-1.5 0V4.56l-9.22 9.22a.75.75 0 1 1-1.06-1.06l9.22-9.22H11.5a.75.75 0 0 1-.75-.75z"/></svg>
              <span className="w-full text-center">Pumpfun</span>
            </a>
            <a href="https://gmgn.app" target="_blank" rel="noopener noreferrer" className="px-2 py-2 rounded bg-black border border-gold text-gold font-semibold text-xs md:text-base hover:bg-gold hover:text-black transition-all flex flex-row items-center gap-2 w-full md:w-auto text-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20" className="inline-block"><path d="M10.75 3a.75.75 0 0 1 .75-.75h5.5A.75.75 0 0 1 17.75 3v5.5a.75.75 0 0 1-1.5 0V4.56l-9.22 9.22a.75.75 0 1 1-1.06-1.06l9.22-9.22H11.5a.75.75 0 0 1-.75-.75z"/></svg>
              <span className="w-full text-center">GMGN</span>
            </a>
            {/* Desktop: 4th button inline */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex px-2 py-2 rounded bg-black border border-gold text-gold font-semibold text-xs md:text-base hover:bg-gold hover:text-black transition-all flex flex-row items-center gap-2 w-full md:w-auto text-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1200 1200" fill="currentColor" className="inline-block"><path d="M918.75 225H1087.5L731.25 600L1125 1072.5H862.5L618.75 787.5L345 1072.5H176.25L555 675L187.5 225H457.5L675 487.5L918.75 225ZM870 975H960L390 322.5H300L870 975Z"/></svg>
              <span className="font-bold w-full text-center">Join X Community</span>
            </a>
          </div>
          {/* Mobile: 4th button below */}
          <div className="flex md:hidden mt-2 justify-center text-center mx-auto">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="px-2 py-2 rounded bg-black border border-gold text-gold font-semibold text-xs hover:bg-gold hover:text-black transition-all flex flex-row items-center gap-2 w-full text-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1200 1200" fill="currentColor" className="inline-block"><path d="M918.75 225H1087.5L731.25 600L1125 1072.5H862.5L618.75 787.5L345 1072.5H176.25L555 675L187.5 225H457.5L675 487.5L918.75 225ZM870 975H960L390 322.5H300L870 975Z"/></svg>
              <span className="font-bold w-full text-center">Join X Community</span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated background shimmer */}
      <div className="absolute inset-0 shimmer opacity-30" />

      {/* Gold particles background (hydration-safe) */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-20"
            style={{
              left: p.left,
              top: p.top,
              animation: p.animation,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo with TAP ME button visually attached below */}
        <div className="flex flex-col items-center mb-6 md:mb-8 fade-in-up">
          <div className="relative w-48 h-48 md:w-40 md:h-40 lg:w-56 lg:h-56 float">
            {/* Simple animated circular signal effect */}
            {isPlaying && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="circle-signal block w-full h-full rounded-full border-4 border-yellow-300 opacity-70" />
              </span>
            )}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/circle-aPakbAos26yezECcsBt5lgTsenBU7q.png"
              alt="PUPUP Mascot"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(222,157,35,0.4)] cursor-pointer"
              onClick={e => { e.stopPropagation(); playAudio(); }}
              priority
            />
            <button
              className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 px-8 py-2 rounded-full bg-gold text-black font-bold text-lg shadow hover:bg-yellow-400 transition-all active:scale-95 whitespace-nowrap min-w-[120px] text-center"
              onClick={e => { e.stopPropagation(); playAudio(); }}
            >
              TAP ME PLEASE
            </button>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="popup-glass-dark rounded-2xl border-4 border-gold shadow-2xl px-10 py-8 text-center animate-popup-fade relative">
                  <div className="absolute inset-0 rounded-2xl pointer-events-none popup-glow" />
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-extrabold mb-3 text-gold drop-shadow-lg tracking-wide">Thanks for tap me</div>
                    <div className="text-7xl mb-2 animate-bounce">💩</div>
                    <div className="text-xs text-muted mt-2 italic">Popup will close in 3 seconds</div>
                  </div>
                </div>
              </div>
            )}
          </div>
<style jsx global>{`
@keyframes popupFade {
  0% { opacity: 0; transform: scale(0.7); }
  60% { opacity: 1; transform: scale(1.12); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-popup-fade {
  animation: popupFade 0.7s cubic-bezier(0.4,0,0.2,1);
}
.popup-glass-dark {
  background: linear-gradient(135deg, #181818 60%, #222 100%);
  backdrop-filter: blur(18px) saturate(180%);
  box-shadow: 0 8px 40px 0 rgba(222,157,35,0.25), 0 0 0 4px #FFD70044;
  position: relative;
}
.popup-glow {
  background: radial-gradient(circle, #FFD70055 0%, transparent 70%);
  filter: blur(16px);
  z-index: 1;
}
@keyframes circleSignal {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0; transform: scale(2.2); }
}
.circle-signal {
  animation: circleSignal 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
}
`}</style>
        </div>

        {/* Main headline split for desktop */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 mt-4 md:mt-8 text-balance fade-in-up-delay-1">
          PUPUP The Richest
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 text-balance fade-in-up-delay-1">
          Poop in the Metaverse
        </h2>
        {/* Subheadline */}
        <p className="text-sm md:text-base lg:text-lg text-muted mb-8 md:mb-12 text-balance fade-in-up-delay-2">
          Where Poop Meets Profit — The Golden Throne Awaits!
        </p>

        <div className="flex flex-row gap-3 md:gap-4 justify-center items-center fade-in-up-delay-3 px-4 md:px-0">
          <GoldButton href="https://pump.fun" className="text-base md:text-lg w-full max-w-xs px-4">
            Buy $PUP
          </GoldButton>
          <GoldButton onClick={scrollToGame} className="text-base md:text-lg w-full max-w-xs px-4">
            Play Game
          </GoldButton>
        </div>
        {/* Ask PUPUP Button */}
        <div className="flex justify-center mt-4 fade-in-up-delay-4">
          <button
            onClick={() => {
              const askSection = document.getElementById("ask-pupup")
              askSection?.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-base md:text-lg w-full max-w-xs px-4 py-2 rounded-full font-bold bg-black border border-gold text-gold hover:bg-gold hover:text-black transition-all"
          >
            Ask PUPUP
          </button>
        </div>

        {/* Scroll indicator with click handler */}
        <div
          className="absolute bottom-[-8rem] md:bottom-[-12rem] left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer select-none"
          onClick={scrollToBottom}
        >
          <div className="text-gold text-lg md:text-xl font-bold">Scroll to explore</div>
          <div className="text-3xl md:text-4xl">↓</div>
        </div>
      </div>
    </section>
  )
}
