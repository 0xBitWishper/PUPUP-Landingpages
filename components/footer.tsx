"use client"

import { LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 py-12 grain-overlay">
      <div className="container mx-auto px-4">
        {/* Main slogan */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">💩 Stay Poopy. Stay Rich. #PUPUPtoTheMoon</h3>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8" />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-muted text-sm mb-8">
          <a href="#about" className="hover:text-gold transition-colors">About</a>
          <span className="text-gold/30">•</span>
          <a href="#community" className="hover:text-gold transition-colors">Community</a>
          <span className="text-gold/30">•</span>
          <a href="#roadmap" className="hover:text-gold transition-colors">Roadmap</a>
          <span className="text-gold/30">•</span>
          <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted text-xs">
          <p>© 2025 PUPUP. All rights reserved. Built with 💩 and 👑</p>
        </div>
      </div>
    </footer>
  )
}
