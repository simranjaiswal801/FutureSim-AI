function fallback(answers) {
  const skills = String(answers.skills || '').split(',').filter(Boolean).length;
  const risk = answers.risk === 'Low' ? 6 : answers.risk === 'Medium' ? 3 : 0;
  const successProbability = Math.min(96, 70 + skills * 3 + risk);
  return { successProbability, riskLevel: answers.risk || 'Medium', expectedTime: '8 months', summary: `A focused route towards ${answers.goal || 'your goal'}.`, recommendation: ['Strengthen core skills', 'Build 3 practical projects', 'Review progress every 4 weeks'], skillGaps: ['TypeScript', 'Problem solving', 'Portfolio projects', 'Communication'], timeline: [{ period: 'Month 1', milestone: 'Set foundations' }, { period: 'Month 3', milestone: 'Build proof of work' }, { period: 'Month 6', milestone: 'Apply consistently' }], scenarios: { best: Math.min(98, successProbability + 5), likely: successProbability, challenge: Math.max(45, successProbability - 20) }, source: 'rules-engine' };
}

const geminiModel = () => process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function generateGemini(body) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') throw new Error('Gemini API key is not configured on the server.');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel()}:generateContent?key=${apiKey}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const raw = await response.text();
  let payload;
  try { payload = raw ? JSON.parse(raw) : {}; }
  catch { throw new Error(`Gemini returned an invalid response (${response.status}).`); }
  if (!response.ok) throw new Error(payload.error?.message || `Gemini request failed (${response.status}).`);
  return payload;
}

export async function runSimulation(category, answers) {
  const base = fallback(answers);
  if (!process.env.GEMINI_API_KEY) return base;
  const prompt = `Return only JSON with summary, recommendation (array), skillGaps (array), timeline (array objects) for this ${category} decision: ${JSON.stringify(answers)}`;
  try {
    const payload = await generateGemini({ contents: [{ parts: [{ text: prompt }] }] });
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    return { ...base, ...JSON.parse(text.replace(/^```json\s*|\s*```$/g, '')), source: 'gemini' };
  } catch { return { ...base, source: 'rules-engine-fallback' }; }
}

export async function askAssistant(message, context = {}) {
  const prompt = `You are FutureSim AI, a practical, supportive decision coach. Give a concise, useful answer in plain text: aim for 3–5 short bullet points, with one clear next action. Only add more detail if the user explicitly asks for it. Do not claim certainty or make guarantees. The user may be making a career, education, business, finance, health, or personal decision.\n\nConversation so far: ${JSON.stringify(context.conversation || [])}\n\nUser context: ${JSON.stringify({ recentSimulations: context.recentSimulations || [] })}\n\nLatest user question: ${message}`;
  const payload = await generateGemini({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.65, maxOutputTokens: 350 } });
  const reply = payload.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!reply) throw new Error('Gemini returned an empty response.');
  return reply;
}
