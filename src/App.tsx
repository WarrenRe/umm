import { useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import InitializationScreen from "./components/InitializationScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [slideIndex, setSlideIndex] = useState(0);

  const [isInitializing, setIsInitializing] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleInitializationComplete = () => {
    setIsExiting(true);
    setTimeout(() => setIsInitializing(false), 600);
  };

  const goHomeSlide1 = () => {
    setCurrentPage(Page.Visualizer);
    setSlideIndex(0);
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
          onLogoClick={goHomeSlide1}
        />

        {/* Add a little space between header and content like your refs */}
        <main className="flex-grow px-5 pb-6 pt-8 overflow-hidden">
          {(currentPage === Page.Visualizer ||
            currentPage === Page.Profiler ||
            currentPage === Page.Lens ||
            currentPage === Page.Imagine) && (
            <HomePage idx={slideIndex} setIdx={setSlideIndex} />
          )}

          {currentPage === Page.Contact && <ContactPage />}
        </main>

        {/* Footer: smaller, no border */}
        <footer className="py-2 text-[9px] uppercase tracking-[0.2em] text-center opacity-50">
          Urban Masque Media • {new Date().getFullYear()} • Connection Established
        </footer>
      </div>
    </div>
  );
}

