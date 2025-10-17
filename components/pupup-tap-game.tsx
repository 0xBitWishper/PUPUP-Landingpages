"use client"

import { useEffect, useRef, useState } from "react"

export function PupupTapGame() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("pupup-tap-best-score")
    if (saved) setBestScore(Number.parseInt(saved))
  }, [])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)

    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > bestScore) {
            setBestScore(score)
            localStorage.setItem("pupup-tap-best-score", score.toString())
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleTap = () => {
    if (gameActive) {
      setScore((prev) => prev + 1)
    }
  }

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8">
      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-md">
        <div className="gold-border rounded-lg p-3 md:p-4 text-center">
          <div className="text-xs md:text-sm text-muted mb-1">Score</div>
          <div className="text-2xl md:text-3xl font-bold text-gold">{score}</div>
        </div>
        <div className="gold-border rounded-lg p-3 md:p-4 text-center">
          <div className="text-xs md:text-sm text-muted mb-1">Time</div>
          <div className="text-2xl md:text-3xl font-bold text-gold">{timeLeft}s</div>
        </div>
        <div className="gold-border rounded-lg p-3 md:p-4 text-center">
          <div className="text-xs md:text-sm text-muted mb-1">Best</div>
          <div className="text-2xl md:text-3xl font-bold text-gold">{bestScore}</div>
        </div>
      </div>

      {/* Tap Button */}
      <button
        onClick={gameActive ? handleTap : startGame}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-gold to-yellow-600 border-4 border-gold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center text-5xl md:text-6xl font-bold"
      >
        {gameActive ? "💩" : "TAP"}
      </button>

      {/* Instructions */}
      <div className="text-center text-muted text-xs md:text-sm">
        {gameActive ? (
          <p>Tap as fast as you can! 🚀</p>
        ) : (
          <p>{score > 0 ? "Game Over! Tap to play again" : "Tap the poop to start!"}</p>
        )}
      </div>
    </div>
  )
}
