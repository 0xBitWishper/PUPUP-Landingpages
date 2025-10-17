"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { PUPUP_KNOWLEDGE_SNIPPETS } from "@/lib/prompts"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AskPupup() {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble thinking right now. Try again later! 💩" },
      ])
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = ["What's $PUP?", "Tell me about the roadmap", "How do I play the game?"]

  return (
    <>
      {/* Floating button */}
      <button
        data-chat-trigger
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold text-black rounded-full flex items-center justify-center font-bold text-xl hover:shadow-[0_0_30px_rgba(222,157,35,0.6)] transition-all z-40 hover:scale-110"
      >
        💩
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] bg-black border-2 border-gold rounded-lg shadow-[0_0_40px_rgba(222,157,35,0.3)] flex flex-col z-40 max-h-96">
          {/* Header */}
          <div className="bg-gold text-black p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Ask PUPUP 💩</h3>
            <button onClick={() => setIsOpen(false)} className="text-xl hover:scale-125 transition-transform">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-muted text-sm">Ask me anything about PUPUP! 👑</p>
                <div className="space-y-2">
                  {examplePrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(prompt)
                      }}
                      className="w-full text-left text-sm p-2 rounded border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all text-muted hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted/50 mt-4">
                  💡 {PUPUP_KNOWLEDGE_SNIPPETS[Math.floor(Math.random() * PUPUP_KNOWLEDGE_SNIPPETS.length)]}
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
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
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gold/10 border border-gold/30 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gold/20 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
      )}
    </>
  )
}
