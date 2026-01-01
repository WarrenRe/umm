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
    // OUTSIDE BOX: pure white background
    <div className="min-h-screen bg-white text-black flex justify-center p-4 sm:p-6 md:p-10">
      {/* BOXED LAYOUT */}
      <div className="w-full max-w-6xl">
        <div className="bg-[#eeeeee] shadow-[8px_8px_0px_#000000] min-h-[calc(100vh-2rem)] flex flex-col">
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onHomeReset={onHomeReset}
          />

          <main className="flex-grow px-6 pt-6 pb-4">
            {currentPage === Page.Contact ? (
              <ContactPage />
            ) : (
              <HomePage resetKey={homeResetKey} />
            )}
          </main>

          <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50 bg-transparent">
            Urban Masque Media • {new Date().getFullYear()} • Connection Established
          </footer>
        </div>
      </div>
    </div>
  );
}
