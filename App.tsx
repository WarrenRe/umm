
import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import InitializationScreen from './components/InitializationScreen';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isExitingInit, setIsExitingInit] = useState(false);

  const handleInitComplete = () => {
    setIsExitingInit(true);
    setTimeout(() => {
      setIsInitialized(true);
    }, 700); // Duration should match the new glitch animation in index.html
  };

  if (!isInitialized) {
    return <InitializationScreen onComplete={handleInitComplete} isExiting={isExitingInit} />;
  }

  return (
    <div className="min-h-screen text-gray-900 p-4 sm:p-6 md:p-8 animate-fadeIn bg-gradient-to-br from-[#f07167] via-[#8f2d56] to-[#203040]">
      <div className="bg-[#F0F0F0] rounded-lg shadow-2xl shadow-purple-500/20 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] flex flex-col">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {currentPage === Page.Home ? <HomePage /> : <ContactPage />}
        </main>
      </div>
    </div>
  );
}

export default App;