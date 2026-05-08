import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const Editor = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 mt-16 p-gutter flex h-[calc(100vh-64px)] overflow-hidden gap-gutter">
        {/* Left Side: Form */}
        <div className="w-[45%] flex flex-col h-full">
          <ResumeForm activeTab={activeTab} />
        </div>

        {/* Right Side: Live Preview */}
        <div className="w-[55%] h-full flex flex-col relative">
          <ResumePreview />
        </div>
      </main>
    </>
  );
};

export default Editor;
