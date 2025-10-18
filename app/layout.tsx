import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Sour_Gummy } from "next/font/google"
import "./globals.css"
import { SplashScreen } from "@/components/splash-screen"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })
const sourGummy = Sour_Gummy({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "💩 PUPUP — The Richest Poop in the Metaverse",
  description: "Where Poop Meets Profit — The Golden Throne Awaits! Join the PUPUP community and play to earn.",
  openGraph: {
    title: "💩 PUPUP — The Richest Poop in the Metaverse",
    description: "Where Poop Meets Profit — The Golden Throne Awaits!",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/circle-aPakbAos26yezECcsBt5lgTsenBU7q.png",
        width: 1200,
        height: 630,
        alt: "PUPUP Meme Coin",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${sourGummy.className} bg-black text-white`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  )
}
