# 💼 CareerForge Pro

**CareerForge Pro** is an AI-powered resume builder and career toolkit that helps job seekers create professional, ATS-optimized resumes in minutes. Powered by a multi-provider AI fallback chain (Gemini → OpenAI → Groq), it generates tailored content, scores your resume against 500+ ATS systems, and exports polished, ready-to-submit documents.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Gemini-1.5_Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3-f97316?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)

---

## 🚀 Features

### 🤖 AI-Powered Content Generation
- **Multi-Provider Fallback Chain**: Gemini 1.5 Pro → OpenAI GPT-4o Mini → Groq Llama 3.3 70B. If one provider fails, the next one takes over automatically — your resume generation never stops.
- **AI Content Forge**: Describe your experience in plain English and let the AI craft compelling, keyword-optimized bullet points tailored to your target role.
- **AI Rewrite Button**: Select any section and instantly rewrite it with AI for better impact, clarity, or ATS optimization.
- **Job Description Matching**: Paste a job description and let the AI tailor your resume content to match the specific role requirements.

### 📊 ATS Optimization & Scoring
- **ATS Strength Score (0–100)**: Real-time scoring that simulates how well your resume would perform against 500+ global Applicant Tracking Systems.
- **Keyword Injection**: AI identifies missing keywords from your target job description and injects them naturally into your resume.
- **Deep Scan**: Run a comprehensive analysis to identify formatting issues, missing sections, and keyword gaps.

### 🎨 Professional Templates
- **Template Gallery**: Choose from 4+ professionally designed templates — The Vanguard (Executive), Neural Grid (Technical), Prism Flux (Creative), Orbit One (Minimalist).
- **Live Preview**: See changes in real-time as you edit — a split-screen editor with instant visual feedback.
- **Dark/Light Mode**: Full theme support with a sleek glass-morphism design system.

### ✍️ Resume Editor
- **8-Section Form Wizard**: Personal Info, Summary, Experience, Education, Skills, Projects, Certifications, and Languages.
- **Real-Time Validation**: Instant feedback on required fields and formatting.
- **Drag & Drop**: Reorder experience entries, skills, and projects with intuitive drag-and-drop.

### 💾 Resume Management
- **Save Multiple Versions**: Create and manage multiple resumes tailored to different roles or industries.
- **Auto-Save**: Your progress is automatically persisted — never lose work.
- **Resume History**: Track all modifications with a timestamped audit log.
- **PDF Export**: Download your finished resume as a high-quality, print-ready PDF.

### 🏠 Dashboard
- **System Overview**: Centralized dashboard showing your ATS score, recent activity, and recommended templates.
- **Activity Feed**: Real-time log of AI optimizations, keyword injections, and template migrations.
- **Quick Actions**: Create new resumes, run deep scans, and access templates from one place.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS 4, React Router |
| **Backend** | Node.js, Express |
| **AI Providers** | Google Gemini 1.5 Pro, OpenAI GPT-4o Mini, Groq Llama 3.3 70B |
| **State Management** | React Context API |
| **PDF Generation** | html2canvas, jsPDF |
| **Icons** | Material Symbols, Lucide Icons |
| **Styling** | Glass-morphism design system, dark/light mode, Framer Motion-like transitions |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- API key for at least one AI provider (Gemini, OpenAI, or Groq)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vardhan23v/career-forge-pro.git
   cd career-forge-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=5001
   GEMINI_API_KEY=your_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key    # optional fallback
   GROQ_API_KEY=your_groq_api_key        # optional fallback
   ```

   > **💡 Tip**: You only need ONE key to get started. The fallback chain ensures your app works even if one provider is down. Groq offers a generous free tier — [get your key here](https://console.groq.com/keys).

4. **Start the application**
   ```bash
   npm run dev
   ```
   This runs both the frontend (Vite on port 5173) and backend (Express on port 5001) concurrently.

5. **Open in Browser**

   Navigate to `http://localhost:5173` to start building your resume!

---

## 📖 How to Use

1. **Dashboard** — Start from the dashboard. Click "Create New Resume" or choose a template.
2. **Editor** — Fill in your details across 8 sections in the left panel. See the live preview update on the right.
3. **AI Rewrite** — Click the sparkle icon on any section to have AI rewrite or enhance the content.
4. **Job Matching** — Paste a job description and let AI tailor your resume to match.
5. **ATS Scan** — Check your ATS score and run a deep scan for optimization suggestions.
6. **Templates** — Browse and switch between professional templates anytime.
7. **Export** — Download your finished resume as a PDF with one click.
8. **Saved Resumes** — Manage multiple versions, track changes in the audit log, and switch between them.

---

## 📁 Project Structure

```
career-forge-pro/
├── server.js                          # Express backend with AI fallback chain
├── src/
│   ├── components/
│   │   ├── AIRewriteButton.jsx        # AI-powered content rewrite trigger
│   │   ├── ATSScore.jsx               # ATS compatibility score display
│   │   ├── JobDescriptionInput.jsx    # Job description paste & match
│   │   ├── Navbar.jsx                 # Top navigation bar
│   │   ├── ResumeForm.jsx             # 8-section resume form wizard
│   │   ├── ResumePreview.jsx          # Live resume preview panel
│   │   └── Sidebar.jsx                # Editor section navigation
│   ├── context/
│   │   ├── ResumeContext.jsx          # Resume state management & persistence
│   │   └── ThemeContext.jsx           # Dark/light theme provider
│   ├── pages/
│   │   ├── Dashboard.jsx              # System overview & quick actions
│   │   ├── Editor.jsx                 # Split-screen resume editor
│   │   ├── Templates.jsx              # Template gallery & AI feature spotlight
│   │   └── SavedResumes.jsx           # Multi-resume manager with audit log
│   ├── App.jsx                        # Root component with routing
│   └── main.jsx                       # React entry point
├── public/                            # Static assets & template images
├── stitch_screens/                    # App screenshots
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🔄 AI Fallback Chain

The backend implements a resilient provider chain that tries each AI service in order:

```
Gemini 1.5 Pro → OpenAI GPT-4o Mini → Groq Llama 3.3 70B
```

If Gemini fails (rate limit, downtime, etc.), it automatically falls back to OpenAI, then Groq. This means:
- **Zero downtime** for AI features
- **Cost optimization** — use cheaper providers as fallbacks
- **Flexibility** — configure only the keys you have; the chain skips unconfigured providers

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate-resume` | POST | Generate or enhance resume content with AI |
| `/api/find-jobs` | POST | Find matching job listings based on resume content |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/career-forge-pro/issues).

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Sree Vardhan V](https://github.com/vardhan23v)
