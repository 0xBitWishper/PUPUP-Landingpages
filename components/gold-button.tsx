"use client"

import type React from "react"

interface GoldButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: "primary" | "secondary"
}

export function GoldButton({ children, onClick, href, className = "", variant = "primary" }: GoldButtonProps) {
  const baseClass =
    variant === "primary"
      ? "px-6 py-3 rounded-full border border-gold/20 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(222,157,35,0.4)] hover:border-gold/60 active:scale-95"
      : "px-6 py-3 rounded-full border border-gold/40 text-gold font-semibold transition-all duration-300 hover:bg-gold/10 hover:border-gold/80"

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClass} ${className} inline-block`}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  )
}
