import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are EduBot, a friendly and knowledgeable AI tutor for the EduVision AR learning platform.
Your role is to help students (ages 10–18) understand educational topics clearly and engagingly.

Guidelines:
- Give clear, accurate, age-appropriate explanations
- Use simple analogies and real-world examples to explain complex concepts
- Break down difficult topics into digestible steps
- Encourage curiosity and further learning
- Support subjects like Mathematics, Science (Physics, Chemistry, Biology), History, Geography, Literature, and Computer Science
- Keep responses concise but thorough — aim for 150–300 words unless more detail is truly needed
- Use markdown formatting: **bold** for key terms, bullet points for lists, and \`code\` for programming concepts
- Always be warm, encouraging, and patient
- If a question is unclear, ask for clarification`;

function generateDemoResponse(query, subject) {
  const q = (query || '').toLowerCase();
  if (q.includes('heart') || q.includes('cardio') || q.includes('blood') || q.includes('circulation')) {
    return `### The Human Heart & Double Circulation System
The human heart is an astonishing muscular pump roughly the size of your clenched fist, beating ~100,000 times each day.

- **Dual Pump Architecture**:
  1. **Right Atrium & Ventricle**: Receives deoxygenated blood from bodily tissues via the superior/inferior vena cava and sends it to the lungs through the pulmonary artery.
  2. **Left Atrium & Ventricle**: Receives freshly oxygenated blood from pulmonary veins and delivers it through the **aorta** to your brain and body under high pressure.
- **Unidirectional Flow**: Four fibrous valves (tricuspid, pulmonary, mitral/bicuspid, aortic) prevent dangerous backflow.
- **Electrical Rhythm**: The **Sinoatrial (SA) Node** generates spontaneous action potentials across the atria down to the AV node and Purkinje fibers.`;
  }

  if (q.includes('photo') || q.includes('plant') || q.includes('leaf') || q.includes('chloroplast')) {
    return `### Photosynthesis: Nature's Solar Energy Converter
Photosynthesis allows autotrophic plant cells to synthesize organic glucose from inorganic ambient components using solar radiation.

- **Chemical Equation**:
  \`6 CO2 + 6 H2O + Photons ? C6H12O6 + 6 O2\`
- **Two Interconnected Stages**:
  1. **Light-Dependent Reactions**: Occur inside thylakoid membranes within chloroplasts. Pigment molecules (Chlorophyll *a* and *b*) absorb photons, splitting H2O and releasing oxygen while synthesizing ATP and NADPH.
  2. **Light-Independent Reactions (Calvin Cycle)**: Occur in the stroma. The enzyme **RuBisCO** fixes atmospheric CO2 into stable glyceraldehyde-3-phosphate (G3P) carbohydrates.`;
  }

  return `### Hello from EduBot!
I am here to guide you through science, mathematics, and computer science concepts!

- **Explore in EduVision**: Check out our **3D Visualization Lab** and **WebAR Camera** for hands-on interactive models.
- **Topics**: Try exploring our modules on Human Anatomy, Solar System, Electromagnetism, Chemical Reactions, Pythagoras, or CPU Architecture!`;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, history = [], subject } = req.body || {};
  const defaultApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? process.env.GEMINI_API_KEY
    : null;
  const userKey = req.headers['x-gemini-key'] || defaultApiKey;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!userKey) {
    const demoReply = generateDemoResponse(message.trim(), subject);
    return res.status(200).json({ reply: demoReply, mode: 'demo' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: userKey });
    const chatHistory = history
      .filter(m => m.role && m.content)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    let systemInstruction = SYSTEM_PROMPT;
    if (subject && subject !== 'all') {
      systemInstruction += `\n\nAcademic Subject Focus: The student is studying ${subject}. Tailor your terminology, real-world examples, and step-by-step explanations specifically for ${subject}.`;
    }

    let reply;
    try {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history: chatHistory,
      });
      const response = await chat.sendMessage({ message: message.trim() });
      reply = response.text;
    } catch (primaryErr) {
      if (primaryErr?.status === 503 || String(primaryErr?.message).includes('503')) {
        const fallbackChat = ai.chats.create({
          model: 'gemini-2.0-flash',
          config: { systemInstruction },
          history: chatHistory,
        });
        const fallbackRes = await fallbackChat.sendMessage({ message: message.trim() });
        reply = fallbackRes.text;
      } else {
        throw primaryErr;
      }
    }

    return res.status(200).json({ reply, mode: 'live' });
  } catch (err) {
    console.error('Gemini API error in Vercel function:', err?.message || err);
    const demoReply = generateDemoResponse(message.trim(), subject);
    return res.status(200).json({
      reply: `${demoReply}\n\n*(Note: Live Gemini API encountered: ${err?.message || 'connection issue'}, fell back to Curriculum mode)*`,
      mode: 'fallback',
    });
  }
}
