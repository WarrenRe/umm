import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import InitializationScreen from './components/InitializationScreen';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    // Smooth transition from terminal to UI
    setTimeout(() => {
      setIsInitializing(false);
    }, 600);
  };

  if (isInitializing) {
    return <InitializationScreen onComplete={handleInitializationComplete} isExiting={isExiting} />;
  }

  return (
    <div className="min-h-screen text-gray-900 p-4 sm:p-6 md:p-8 animate-fadeIn bg-white selection:bg-black selection:text-white">
      <div className="bg-[#eeeeee] border-2 border-black p-2 shadow-[8px_8px_0px_#000000] min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] flex flex-col relative">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {currentPage === Page.Visualizer ? (
            <HomePage />
          ) : (
            <ContactPage />
          )}
        </main>
        <footer className="p-3 border-t-2 border-black text-[10px] uppercase tracking-[0.2em] text-center opacity-60">
          Urban Masque Media • {new Date().getFullYear()} • Terminal Connection Established
        </footer>
      </div>
    </div>
  );
}

export default App;
