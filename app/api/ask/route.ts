import { PUPUP_SYSTEM_PROMPT } from "@/lib/prompts"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: PUPUP_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("OpenAI API error:", error)
      return Response.json({ error: "Failed to get response from PUPUP" }, { status: 500 })
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content || "I'm thinking... 💭"

    return Response.json({ reply })
  } catch (error) {
    console.error("API route error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
