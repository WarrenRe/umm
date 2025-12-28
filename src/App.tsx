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
      <div className="bg-[#eeeeee] p-2 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] flex flex-col relative">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow p-4 sm:p-6 md:p-8 pt-8">
  {(currentPage === Page.Visualizer ||
    currentPage === Page.Profiler ||
    currentPage === Page.Lens ||
    currentPage === Page.Imagine) && <HomePage />}

  {currentPage === Page.Contact && <ContactPage />}
</main>

        <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50">
          Urban Masque Media • {new Date().getFullYear()} • Connection Established
        </footer>
      </div>
    </div>
  );
}

export default App;
