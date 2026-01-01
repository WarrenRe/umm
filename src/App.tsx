import React, { useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import InitializationScreen from "./components/InitializationScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [homeResetKey, setHomeResetKey] = useState(0);

  const [isInitializing, setIsInitializing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    setTimeout(() => setIsInitializing(false), 600);
  };

  const onHomeReset = () => {
    // forces HomePage to reset to slide 1
    setHomeResetKey((k) => k + 1);
  };

  if (isInitializing) {
    return (
      <InitializationScreen
        onComplete={handleInitializationComplete}
        isExiting={isExiting}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#eeeeee] text-black p-4 sm:p-6 md:p-8">
      {/* Outer shell (keep the look you had previously) */}
      <div className="bg-[#eeeeee] shadow-[8px_8px_0px_#000000] min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Header (you said it's perfect; keep your current Header.tsx) */}
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onHomeReset={onHomeReset}
        />

        {/* Main */}
        <main className="flex-grow px-6 pt-6 pb-4">
          {currentPage === Page.Contact ? (
            <ContactPage />
          ) : (
            <HomePage resetKey={homeResetKey} />
          )}
        </main>

        {/* Footer: same background as body, no border */}
        <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50 bg-transparent">
          Urban Masque Media • {new Date().getFullYear()} • Connection Established
        </footer>
      </div>
    </div>
  );
}
