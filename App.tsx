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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsInitializing(false);
    }, 600);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  if (isInitializing) {
    return <InitializationScreen onComplete={handleInitializationComplete} isExiting={isExiting} />;
  }

  return (
    <div className="h-screen w-screen text-gray-900 animate-fadeIn bg-white selection:bg-black selection:text-white flex flex-col overflow-hidden">
      <div className="relative flex-grow flex flex-col overflow-hidden">
        
        {/* Absolute Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Header 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <main className="flex-grow flex items-center justify-center overflow-hidden bg-[#eeeeee]">
          {currentPage === Page.Visualizer ? (
            <HomePage onToggleMenu={toggleMenu} />
          ) : (
            <ContactPage />
          )}
        </main>
        
        {/* Minimal Footer overlay */}
        <footer className="absolute bottom-4 left-0 right-0 pointer-events-none z-10">
          <div className="text-[8px] uppercase tracking-[0.4em] text-center text-black/40">
            Urban Masque Media • Established 2025
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;