// EduVision AI Chat Backend Server
// Secure proxy for Gemini API — API key never leaves the server
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ── Gemini client (API key from env, never exposed to browser) ─────────────────
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌  GEMINI_API_KEY is not set. Please add it to server/.env');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

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

// ── POST /api/chat ─────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, history = [], subject } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Build conversation history for multi-turn context
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

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: { systemInstruction },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message: message.trim() });
    const reply = response.text;

    return res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err?.message || err);
    const status = err?.status || err?.code || 500;
const message = status === 429
  ? 'Rate limit reached. Please wait a moment and try again.'
  : status === 503
    ? 'The AI is temporarily busy. Please wait a few seconds and try again.'
    : status === 400
      ? 'Invalid request. Please rephrase your question.'
      : 'An error occurred while contacting the AI. Please try again.';

return res.status(status).json({ error: message });
  }
});

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: 'gemini-3.5-flash' });
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓  EduVision AI Chat Server running at http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/api/chat`);
  console.log(`   GET  http://localhost:${PORT}/api/health\n`);
});

