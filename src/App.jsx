import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Editor from './pages/Editor';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import SavedResumes from './pages/SavedResumes';

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <BrowserRouter>
          <div className="bg-background dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary/30 min-h-screen font-sans transition-colors duration-300">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/saved" element={<SavedResumes />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
