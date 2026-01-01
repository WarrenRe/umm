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
    setCurrentPage(Page.Visualizer);
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
    // OUTSIDE THE BOX: pure white
    <div className="min-h-screen bg-white text-black flex justify-center p-6 md:p-10">
      {/* BOX */}
      <div className="w-full max-w-6xl">
        <div className="bg-[#eeeeee] border-2 border-black shadow-[10px_10px_0px_#000000] min-h-[calc(100vh-3rem)] flex flex-col">
          {/* Header inside the box */}
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onHomeReset={onHomeReset}
          />

          {/* Main inside the box */}
          <main className="flex-grow px-6 md:px-10 py-6 md:py-8 bg-[#eeeeee]">
            {currentPage === Page.Contact ? (
              <ContactPage />
            ) : (
              <HomePage resetKey={homeResetKey} />
            )}
          </main>

          {/* Footer inside the box */}
          <footer className="bg-[#eeeeee] py-3 text-[9px] uppercase tracking-[0.2em] text-center opacity-60">
            Urban Masque Media • {new Date().getFullYear()} • Connection Established
          </footer>
        </div>
      </div>
    </div>
  );
}
