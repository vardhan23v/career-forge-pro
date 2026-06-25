# 💼 CareerForge Pro

**CareerForge Pro** is an AI-powered resume builder and career toolkit that helps job seekers create professional, ATS-optimized resumes in minutes. Powered by Google Gemini AI, it generates tailored content, suggests improvements, and exports polished resumes ready for any application.

## 🚀 Features

- **AI Resume Generation**: Describe your experience and let Gemini AI craft compelling resume content tailored to your target role.
- **Template Gallery**: Choose from multiple professionally designed resume templates to match your style.
- **Live Editor**: Real-time resume editing with instant preview — see changes as you type.
- **Saved Resumes**: Save multiple resume versions and switch between them effortlessly.
- **PDF Export**: Download your finished resume as a high-quality PDF with one click.
- **Multi-Provider AI**: Backend supports Google Gemini and OpenAI for flexible AI-powered content generation.
- **Dashboard Overview**: A centralized dashboard to manage all your resumes and career documents.

## 🛠️ Technology Stack

- **Frontend**: React 19 (Vite), Tailwind CSS, Lucide Icons, React Router
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini 1.5 Pro, OpenAI GPT-4o Mini
- **PDF Generation**: html2canvas, jsPDF
- **Build Tool**: Vite

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- API Key for Google Gemini and/or OpenAI

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
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```
   This runs both the frontend (Vite) and backend (Express) concurrently.

5. **Open in Browser**

   Navigate to `http://localhost:5173` to start building your resume!

## 📁 Project Structure

```
career-forge-pro/
├── server.js                 # Express backend with AI API routes
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/              # React context providers
│   ├── pages/
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   ├── Editor.jsx        # Resume editor
│   │   ├── Templates.jsx     # Template gallery
│   │   └── SavedResumes.jsx  # Saved resumes manager
│   ├── assets/               # Static assets
│   ├── App.jsx               # Root component with routing
│   └── main.jsx              # Entry point
├── public/                   # Public assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/career-forge-pro/issues).

## 📄 License

This project is licensed under the MIT License.
