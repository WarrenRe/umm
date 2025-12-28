import { useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import InitializationScreen from "./components/InitializationScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsInitializing(false);
    }, 600);
  };

  // Boot / terminal screen
  if (isInitializing) {
    return (
      <InitializationScreen
        onComplete={handleInitializationComplete}
        isExiting={isExiting}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 animate-fadeIn selection:bg-black selection:text-white">
      {/* App shell */}
      <div className="bg-[#eeeeee] min-h-screen flex flex-col relative">
        {/* Header */}
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Main content */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 pt-10 overflow-hidden">
          {(currentPage === Page.Visualizer ||
            currentPage === Page.Profiler ||
            currentPage === Page.Lens ||
            currentPage === Page.Imagine) && <HomePage />}

          {currentPage === Page.Contact && <ContactPage />}
        </main>

        {/* Footer (minimal, no border) */}
        <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50">
          Urban Masque Media • {new Date().getFullYear()} • Connection Established
        </footer>
      </div>
    </div>
  );
}
