// EduVision AI Chat Backend Server
// Secure proxy for Gemini API — with graceful Demo Mode fallback & multi-model retry
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check both server/.env and root .env
const serverEnv = path.join(__dirname, '.env');
const rootEnv = path.join(__dirname, '..', '.env');
if (fs.existsSync(serverEnv)) {
  dotenv.config({ path: serverEnv });
} else if (fs.existsSync(rootEnv)) {
  dotenv.config({ path: rootEnv });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: true, // Allow frontend from localhost or LAN IP
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-gemini-key'],
}));

// Check default API key from environment
const defaultApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  ? process.env.GEMINI_API_KEY
  : null;

if (defaultApiKey) {
  console.log('✅  GEMINI_API_KEY loaded successfully. Live AI mode enabled.');
} else {
  console.log('ℹ️   GEMINI_API_KEY not configured. Running in EduBot Demo/Curriculum fallback mode.');
  console.log('    (To enable live Gemini generation, add your API key to server/.env)');
}

// ── Educational system prompt ──────────────────────────────────────────────────
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
- If a question is unclear, ask for clarification
- Do not assist with non-educational topics`;

// ── Educational Demo / Fallback Generator ──────────────────────────────────────
function generateDemoResponse(query, subject) {
  const q = query.toLowerCase();

  if (q.includes('heart') || q.includes('cardiac') || q.includes('circulation')) {
    return `### The Human Heart: The Ultimate Biological Pump ❤️

The **human heart** is a hollow muscular organ about the size of your clenched fist. It works continuously to pump oxygen- and nutrient-rich blood throughout your entire body.

#### 🫀 Key Anatomical Chambers:
- **Right Atrium (RA)**: Receives oxygen-depleted blood from the body via the superior and inferior vena cava.
- **Right Ventricle (RV)**: Pumps deoxygenated blood to the lungs through the pulmonary artery to pick up fresh oxygen.
- **Left Atrium (LA)**: Receives fresh, oxygen-rich blood returning from the lungs through four pulmonary veins.
- **Left Ventricle (LV)**: The thickest and strongest chamber, pumping oxygenated blood under high pressure through the **aorta** to every cell in your body.

#### 🔄 The Double Circulatory System:
1. **Pulmonary Circulation**: Heart ➡️ Lungs (oxygenation) ➡️ Heart
2. **Systemic Circulation**: Heart ➡️ Brain & Organs ➡️ Heart

*Tip: You can visualize this in real-time in the **3D Viewer** or launch **Try AR** right here in EduVision!*

---
> 💡 *Running in EduBot Curriculum Demo Mode. Add \`GEMINI_API_KEY\` in \`server/.env\` to activate live Gemini AI.*`;
  }

  if (q.includes('photosynthesis') || q.includes('plant')) {
    return `### What is Photosynthesis? 🌿

**Photosynthesis** is the biochemical process by which green plants, algae, and cyanobacteria convert light energy into chemical energy stored in glucose (sugar).

#### 🔬 The Chemical Equation:
\`6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen)\`

#### ⚙️ The Two Main Stages:
1. **Light-Dependent Reactions** (inside the *Thylakoid membranes*):
   - **Chlorophyll** absorbs sunlight and splits water molecules ($H_2O$), releasing **oxygen ($O_2$)** as a byproduct.
   - Produces energy carriers **ATP** and **NADPH**.
2. **The Calvin Cycle (Light-Independent)** (inside the *Stroma*):
   - Uses ATP and NADPH to fix carbon dioxide ($CO_2$) into high-energy sugars like **glucose**.

---
> 💡 *Running in EduBot Curriculum Demo Mode. Add \`GEMINI_API_KEY\` in \`server/.env\` to activate live Gemini AI.*`;
  }

  if (q.includes('pythagor') || q.includes('triangle')) {
    return `### The Pythagorean Theorem 📐

The **Pythagorean Theorem** is a fundamental geometric relationship among the three sides of a **right-angled triangle** (where one angle equals 90°).

#### 📏 The Formula:
\`a² + b² = c²\`

- **a** and **b**: The lengths of the two legs adjacent to the 90° right angle.
- **c**: The length of the **hypotenuse** (the longest side, directly opposite the right angle).

#### 💡 Practical Example:
If leg $a = 3$ and leg $b = 4$:
- $3^2 + 4^2 = 9 + 16 = 25$
- $c = \\sqrt{25} = 5$
So the hypotenuse is **5**! (A classic 3-4-5 Pythagorean triple).

---
> 💡 *Running in EduBot Curriculum Demo Mode. Add \`GEMINI_API_KEY\` in \`server/.env\` to activate live Gemini AI.*`;
  }

  if (q.includes('season') || q.includes('earth') || q.includes('orbit')) {
    return `### Why Does Earth Have Seasons? 🌍☀️

Many people assume seasons happen because Earth is closer or further from the Sun — but that is a **myth**!

#### 🧭 The Real Reason: Earth's Axial Tilt
- Earth spins on an axis that is tilted at an angle of **23.5 degrees**.
- As Earth orbits the Sun over 365.25 days, the tilt causes each hemisphere to receive different amounts of direct sunlight and day length.

#### ❄️ Summer vs. Winter:
- **Summer**: When a hemisphere tilts **toward** the Sun, solar rays hit the surface almost directly, and days are longer, generating more heat.
- **Winter**: When that hemisphere tilts **away**, solar rays hit at a shallow slant, spreading energy over a larger area, resulting in colder temperatures.

---
> 💡 *Running in EduBot Curriculum Demo Mode. Add \`GEMINI_API_KEY\` in \`server/.env\` to activate live Gemini AI.*`;
  }

  if (q.includes('newton') || q.includes('motion') || q.includes('force')) {
    return `### Sir Isaac Newton's Three Laws of Motion 🚀

Sir Isaac Newton formulated three foundational laws that describe how objects move and interact with forces:

1. **First Law (Inertia)**:
   An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external net force.
2. **Second Law (F = ma)**:
   The acceleration of an object depends on the net force applied to it and its mass.
   \`Force = Mass × Acceleration (F = ma)\`
3. **Third Law (Action & Reaction)**:
   For every action, there is an equal and opposite reaction.

---
> 💡 *Running in EduBot Curriculum Demo Mode. Add \`GEMINI_API_KEY\` in \`server/.env\` to activate live Gemini AI.*`;
  }

  const subjectHeader = subject && subject !== 'all' ? ` [${subject.toUpperCase()} Specialist]` : '';

  // Default educational fallback response
  return `### Hello from EduBot! 🎓${subjectHeader}

Great question: **"${query}"**

Here is a quick learning breakdown:
- **Core Concept**: Every scientific or mathematical idea starts with careful observation and clear principles.
- **Explore in EduVision**: Check the **Subjects** and **Topics** pages for interactive 3D simulations and spatial WebAR explorations.
- **Curriculum Topics Available**: You can ask me about:
  - **Human Heart & Anatomy**
  - **Photosynthesis & Plant Biology**
  - **Pythagorean Theorem & Trigonometry**
  - **Earth's Seasons & Astronomy**
  - **Newton's Laws of Motion & Physics**

---
> 💡 *Running in EduBot Curriculum Demo Mode. To connect real-time Gemini 2.5 AI queries, configure \`GEMINI_API_KEY\` in \`server/.env\` or provide an API key in the chat settings.*`;
}

// ── POST /api/chat ─────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, history = [], subject } = req.body;
  const userKey = req.headers['x-gemini-key'] || defaultApiKey;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // If no API key is provided, use the Demo/Curriculum fallback
  if (!userKey) {
    const demoReply = generateDemoResponse(message.trim(), subject);
    return res.json({ reply: demoReply, mode: 'demo' });
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
        console.warn('503 spike encountered; retrying with gemini-2.0-flash fallback...');
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

    return res.json({ reply, mode: 'live' });
  } catch (err) {
    console.error('Gemini API error:', err?.message || err);
    // If Gemini API fails (e.g. invalid key or network issue), provide the demo fallback with error notice
    const demoReply = generateDemoResponse(message.trim(), subject);
    return res.json({
      reply: `${demoReply}\n\n*(Note: Live Gemini API call encountered: ${err?.message || 'connection issue'}, fell back to Curriculum mode)*`,
      mode: 'fallback'
    });
  }
});

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const userKey = req.headers['x-gemini-key'] || defaultApiKey;
  res.json({
    status: 'ok',
    hasKey: Boolean(userKey),
    mode: userKey ? 'live' : 'demo',
    model: userKey ? 'gemini-2.5-flash' : 'curriculum-demo',
  });
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓  EduVision AI Chat Server running at http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/api/chat`);
  console.log(`   GET  http://localhost:${PORT}/api/health\n`);
});
