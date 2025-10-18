export default function TestPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Test Page</h1>
        <p className="text-gold text-xl">If you see this, the cache issue is resolved.</p>
        <button className="mt-8 px-6 py-3 rounded-full border border-gold/20 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(222,157,35,0.4)] hover:border-gold/60 active:scale-95">
          Test Button
        </button>
      </div>
    </div>
  )
}
