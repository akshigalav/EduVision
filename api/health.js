export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const defaultApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    ? process.env.GEMINI_API_KEY
    : null;
  const userKey = req.headers['x-gemini-key'] || defaultApiKey;

  res.status(200).json({
    status: 'ok',
    hasKey: Boolean(userKey),
    mode: userKey ? 'live' : 'demo',
    model: userKey ? 'gemini-2.5-flash' : 'curriculum-demo',
  });
}
