import { useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [slideIndex, setSlideIndex] = useState(0);

  const goHomeSlide1 = () => {
    setCurrentPage(Page.Visualizer);
    setSlideIndex(0);
  };

  return (
    // STAGE: center the poster within the white page
    <div className="min-h-screen bg-white px-6 sm:px-8 lg:px-12 py-12 flex items-center justify-center">
      {/* POSTER */}
      <div
        className="
          w-[92%] sm:w-[90%] md:w-[85%] lg:w-[80%]
          max-w-6xl
          bg-[#eeeeee]
          border-2 border-black
          shadow-[10px_10px_0px_#000000]
          flex flex-col
          pt-14 px-6 pb-12
        "
      >
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          goHomeSlide1={goHomeSlide1}
        />

        <main className="flex-1 min-h-0 px-[15px] mt-6 mb-10">
          {currentPage === Page.Visualizer && (
            <HomePage slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
          )}
          {currentPage === Page.Contact && <ContactPage />}
        </main>

        <footer className="bg-[#eeeeee] border-0 shadow-none h-10 flex items-center justify-center text-xs text-black/60">
          URBAN MASQUE MEDIA • 2026 • CONNECTION ESTABLISHED
        </footer>
      </div>
    </div>
  );
}
