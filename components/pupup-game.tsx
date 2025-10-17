"use client"

import { useEffect, useRef, useState } from "react"

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  type: "coin" | "toilet"
}

export function PupupGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameActive, setGameActive] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("pupup-best-score")
    if (saved) setBestScore(Number.parseInt(saved))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Game state
    let playerX = canvas.width / 2 - 20
    let playerVel = 0
    let gameScore = 0
    let gameLives = 3
    let gameObjects: GameObject[] = []
    let spawnRate = 0
    let gameRunning = gameActive

    // Input handling
    const keys: { [key: string]: boolean } = {}
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (!gameRunning) {
        // Draw start screen
        ctx.fillStyle = "#DE9D23"
        ctx.font = "bold 32px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Click to Start", canvas.width / 2, canvas.height / 2)
        ctx.font = "16px sans-serif"
        ctx.fillText("Use ← → or A/D to move", canvas.width / 2, canvas.height / 2 + 40)
        requestAnimationFrame(gameLoop)
        return
      }

      // Player movement
      if (keys["arrowleft"] || keys["a"]) playerVel = -5
      else if (keys["arrowright"] || keys["d"]) playerVel = 5
      else playerVel *= 0.8

      playerX += playerVel
      playerX = Math.max(0, Math.min(playerX, canvas.width - 40))

      // Draw player (Pupup)
      ctx.fillStyle = "#DE9D23"
      ctx.fillRect(playerX, canvas.height - 50, 40, 40)
      ctx.fillStyle = "#000000"
      ctx.font = "24px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("💩", playerX + 20, canvas.height - 30)

      // Spawn objects
      spawnRate++
      if (spawnRate > Math.max(30 - gameScore / 5, 15)) {
        const type = Math.random() > 0.8 ? "toilet" : "coin"
        gameObjects.push({
          x: Math.random() * (canvas.width - 30),
          y: -30,
          width: 30,
          height: 30,
          type,
        })
        spawnRate = 0
      }

      // Update and draw objects
      gameObjects = gameObjects.filter((obj) => {
        obj.y += 3 + gameScore / 50

        // Draw object
        ctx.fillStyle = obj.type === "coin" ? "#DE9D23" : "#8B4513"
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        ctx.fillStyle = "#000000"
        ctx.font = "20px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(obj.type === "coin" ? "💰" : "🚽", obj.x + 15, obj.y + 22)

        // Collision detection
        if (
          playerX < obj.x + obj.width &&
          playerX + 40 > obj.x &&
          canvas.height - 50 < obj.y + obj.height &&
          canvas.height > obj.y
        ) {
          if (obj.type === "coin") {
            gameScore++
            setScore(gameScore)
          } else {
            gameLives--
            setLives(gameLives)
            if (gameLives <= 0) {
              gameRunning = false
              if (gameScore > bestScore) {
                setBestScore(gameScore)
                localStorage.setItem("pupup-best-score", gameScore.toString())
              }
            }
          }
          return false
        }

        return obj.y < canvas.height
      })

      // Draw UI
      ctx.fillStyle = "#DE9D23"
      ctx.font = "bold 20px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(`Score: ${gameScore}`, 10, 30)
      ctx.fillText(`Lives: ${gameLives}`, 10, 60)
      ctx.textAlign = "right"
      ctx.fillText(`Best: ${bestScore}`, canvas.width - 10, 30)

      requestAnimationFrame(gameLoop)
    }

    const handleCanvasClick = () => {
      if (!gameRunning) {
        gameRunning = true
        gameScore = 0
        gameLives = 3
        gameObjects = []
        setScore(0)
        setLives(3)
        setGameActive(true)
      }
    }

    canvas.addEventListener("click", handleCanvasClick)
    gameLoop()

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [gameActive, bestScore])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={720}
        height={420}
        className="border-2 border-gold rounded-lg bg-black w-full max-w-2xl"
      />
      <div className="text-center text-muted">
        <p className="text-sm">Use Arrow Keys or A/D to move • Collect 💰 coins • Avoid 🚽 toilets</p>
      </div>
    </div>
  )
}
