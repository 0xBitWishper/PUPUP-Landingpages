import Image from "next/image"

export function SectionDivider() {
  return (
    <div className="flex justify-center py-8 md:py-12">
      <div className="relative w-16 h-16 md:w-20 md:h-20 float">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/circle-aPakbAos26yezECcsBt5lgTsenBU7q.png"
          alt="PUPUP Divider"
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(222,157,35,0.3)]"
        />
      </div>
    </div>
  )
}
