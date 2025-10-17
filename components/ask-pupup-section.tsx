"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { PUPUP_KNOWLEDGE_SNIPPETS } from "@/lib/prompts"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AskPupupSection() {
  // Hydration-safe random snippet
  const [snippet, setSnippet] = useState(PUPUP_KNOWLEDGE_SNIPPETS[0])
  useEffect(() => {
    setSnippet(PUPUP_KNOWLEDGE_SNIPPETS[Math.floor(Math.random() * PUPUP_KNOWLEDGE_SNIPPETS.length)])
  }, [])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput("")
  setMessages((prev: Message[]) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
  setMessages((prev: Message[]) => [...prev, { role: "assistant", content: data.reply }])
    } catch (error) {
      setMessages((prev: Message[]) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble thinking right now. Try again later! 💩" },
      ])
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = ["What's $PUP?", "Tell me about the roadmap", "How do I play the game?"]

  return (
    <section id="ask-pupup" className="py-20 md:py-32 bg-black grain-overlay">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Ask PUPUP</h2>
        <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
          Have questions about PUPUP? Ask our AI-powered mascot anything!
        </p>

        <div className="max-w-2xl mx-auto bg-black border-2 border-gold/30 rounded-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gold/5 to-transparent">
            {messages.length === 0 ? (
              <div className="space-y-4 h-full flex flex-col justify-center">
                <p className="text-muted text-center">Ask me anything about PUPUP! 👑</p>
                <div className="space-y-2">
                  {examplePrompts.map((prompt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="w-full text-left text-sm p-3 rounded border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all text-muted hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted/50 mt-4 text-center">
                  💡 Did you know? PUPUP is a fun meme coin project with a friendly community and cool games!
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg: Message, idx: number) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-gold/20 border border-gold/40 text-white"
                          : "bg-gold/10 border border-gold/30 text-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gold/10 border border-gold/30 px-4 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gold rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gold rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gold/20 p-4 flex gap-2 bg-black">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Ask PUPUP..."
              className="flex-1 bg-black border border-gold/30 rounded px-3 py-2 text-white placeholder-muted/50 focus:outline-none focus:border-gold/60"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gold text-black rounded font-semibold hover:shadow-[0_0_20px_rgba(222,157,35,0.5)] transition-all disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
