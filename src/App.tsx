import { useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import InitializationScreen from "./components/InitializationScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);

  // Used to force HomePage carousel to reset to slide 1 when UMM is clicked
  const [homeResetKey, setHomeResetKey] = useState(0);

  const [isInitializing, setIsInitializing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    setTimeout(() => setIsInitializing(false), 600);
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
    <div className="min-h-screen bg-white text-gray-900 animate-fadeIn selection:bg-black selection:text-white">
      <div className="bg-[#eeeeee] min-h-screen flex flex-col relative">
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onHomeReset={() => setHomeResetKey((k) => k + 1)}
        />

        <main className="flex-grow p-4 sm:p-6 md:p-8 pt-8">
          {currentPage === Page.Contact ? (
            <ContactPage />
          ) : (
            <HomePage resetKey={homeResetKey} />
          )}
        </main>

        <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50">
          Urban Masque Media • {new Date().getFullYear()} • Connection Established
        </footer>
      </div>
    </div>
  );
}
