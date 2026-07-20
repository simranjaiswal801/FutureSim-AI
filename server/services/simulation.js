import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function fallback(answers) {
  const skills = String(answers.skills || "")
    .split(",")
    .filter(Boolean).length;
  const risk = answers.risk === "Low" ? 6 : answers.risk === "Medium" ? 3 : 0;
  const successProbability = Math.min(96, 70 + skills * 3 + risk);
  return {
    successProbability,
    riskLevel: answers.risk || "Medium",
    expectedTime: "8 months",
    summary: `A focused route towards ${answers.goal || "your goal"}.`,
    recommendation: [
      "Strengthen core skills",
      "Build 3 practical projects",
      "Review progress every 4 weeks",
    ],
    skillGaps: [
      "TypeScript",
      "Problem solving",
      "Portfolio projects",
      "Communication",
    ],
    timeline: [
      { period: "Month 1", milestone: "Set foundations" },
      { period: "Month 3", milestone: "Build proof of work" },
      { period: "Month 6", milestone: "Apply consistently" },
    ],
    scenarios: {
      best: Math.min(98, successProbability + 5),
      likely: successProbability,
      challenge: Math.max(45, successProbability - 20),
    },
    source: "rules-engine",
  };
}

// const geminiModel = () => process.env.GEMINI_MODEL || "gemini-2.5-flash";

// async function generateGemini(body) {
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey || apiKey === "your_gemini_api_key_here")
//     throw new Error("Gemini API key is not configured on the server.");
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/${geminiModel()}:generateContent?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     },
//   );
//   const raw = await response.text();

//   let payload;
//   const raw = await response.text();
//   let payload;
//   try {
//     payload = raw ? JSON.parse(raw) : {};
//   } catch {
//     throw new Error(
//       `Gemini returned an invalid response (${response.status}).`,
//     );
//   }
//   if (!response.ok)
//     throw new Error(
//       payload.error?.message || `Gemini request failed (${response.status}).`,
//     );
//   return payload;
// }

export async function runSimulation(category, answers) {
  const base = fallback(answers);
  if (!process.env.GEMINI_API_KEY) return base;
  const prompt = `Return only JSON with summary, recommendation (array), skillGaps (array), timeline (array objects) for this ${category} decision: ${JSON.stringify(answers)}`;
  try {
    const payload = await generateGemini({
      contents: [{ parts: [{ text: prompt }] }],
    });
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return {
      ...base,
      ...JSON.parse(text.replace(/^```json\s*|\s*```$/g, "")),
      source: "gemini",
    };
  } catch {
    return { ...base, source: "rules-engine-fallback" };
  }
}
export async function askAssistant(message, context = {}) {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are FutureSim AI, a practical and supportive decision coach. Give concise, actionable answers.",
      },
      ...(context.conversation || []).map((m) => ({
        role: m.role,
        content: m.text,
      })),
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
}