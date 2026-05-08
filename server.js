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
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.post('/api/generate-resume', async (req, res) => {
  try {
    const { prompt } = req.body;
    const groqApiKey = process.env.VITE_GROQ_API_KEY?.trim();
    const geminiApiKey = process.env.VITE_GEMINI_API_KEY?.trim();

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    let text = "";
    let groqSuccess = false;

    if (groqApiKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
          })
        });

        if (response.ok) {
          const data = await response.json();
          text = data.choices[0].message.content;
          groqSuccess = true;
        } else {
          console.warn("Groq API failed, falling back to Gemini...");
        }
      } catch (e) {
        console.warn("Groq API error, falling back to Gemini...", e);
      }
    }

    if (!groqSuccess) {
      if (!geminiApiKey) {
        return res.status(500).json({ error: "No valid API keys found on the server. Please check your .env file." });
      }
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
    }

    res.json({ text });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate resume" });
  }
});

app.post('/api/find-jobs', async (req, res) => {
  try {
    const { prompt } = req.body;
    const groqApiKey = process.env.VITE_GROQ_API_KEY?.trim();
    const geminiApiKey = process.env.VITE_GEMINI_API_KEY?.trim();

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    let text = "";
    let groqSuccess = false;

    if (groqApiKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
          })
        });

        if (response.ok) {
          const data = await response.json();
          text = data.choices[0].message.content;
          groqSuccess = true;
        } else {
          console.warn("Groq API failed, falling back to Gemini...");
        }
      } catch (e) {
        console.warn("Groq API error, falling back to Gemini...", e);
      }
    }

    if (!groqSuccess) {
      if (!geminiApiKey) {
        return res.status(500).json({ error: "No valid API keys found on the server. Please check your .env file." });
      }
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
    }

    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedJobs = JSON.parse(text);
    
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
