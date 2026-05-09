import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Provider Helpers ---
const callGemini = async (prompt, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

const callOpenAI = async (prompt, apiKey) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(`OpenAI API error: ${response.status} - ${err?.error?.message}`);
  }
  const data = await response.json();
  return data.choices[0].message.content;
};

const callGroq = async (prompt, apiKey) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Groq API error: ${response.status} - ${err?.error?.message}`);
  }
  const data = await response.json();
  return data.choices[0].message.content;
};

const generateWithFallback = async (prompt) => {
  const geminiApiKey = process.env.VITE_GEMINI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim();
  const openAiApiKey = process.env.VITE_OPENAI_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim();
  const groqApiKey = process.env.VITE_GROQ_API_KEY?.trim() || process.env.GROQ_API_KEY?.trim();

  // Provider chain: Gemini -> OpenAI -> Groq
  const providers = [
    { name: 'Gemini', key: geminiApiKey, call: callGemini },
    { name: 'ChatGPT', key: openAiApiKey, call: callOpenAI },
    { name: 'Groq', key: groqApiKey, call: callGroq },
  ];

  let text;
  let errors = [];

  for (const provider of providers) {
    if (!provider.key) continue;
    try {
      text = await provider.call(prompt, provider.key);
      console.log(`✅ Generation completed using ${provider.name}`);
      return text;
    } catch (err) {
      console.warn(`⚠️ ${provider.name} failed: ${err.message}`);
      errors.push(`${provider.name}: ${err.message}`);
    }
  }

  const configured = providers.filter(p => p.key).map(p => p.name);
  if (configured.length === 0) {
    throw new Error('No API keys configured. Add VITE_GEMINI_API_KEY, VITE_OPENAI_API_KEY, or VITE_GROQ_API_KEY to your .env file.');
  }
  throw new Error(`All AI providers failed (${configured.join(', ')}). Details: ${errors.join(' | ')}`);
};

// API Endpoints
app.post('/api/generate-resume', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const text = await generateWithFallback(prompt);
    res.json({ text });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate resume" });
  }
});

app.post('/api/find-jobs', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const text = await generateWithFallback(prompt);
    
    // Clean and parse JSON
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedJobs = JSON.parse(cleanedText);
    
    res.json({ jobs: parsedJobs });
  } catch (error) {
    console.error("Find Jobs Error:", error);
    res.status(500).json({ error: error.message || "Failed to find jobs" });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
