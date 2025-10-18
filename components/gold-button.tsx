"use client"

import React from "react"

export function GoldButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={
          "inline-block px-6 py-2 rounded-full bg-gold text-black font-bold shadow hover:bg-yellow-400 transition-all active:scale-95 text-center " +
          (props.className || "")
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
  return (
    <button
      {...props}
      className={
        "px-6 py-2 rounded-full bg-gold text-black font-bold shadow hover:bg-yellow-400 transition-all active:scale-95 " +
        (props.className || "")
      }
    >
      {children}
    </button>
  )
}
