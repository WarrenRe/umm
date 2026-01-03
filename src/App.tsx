import { useEffect, useState } from "react";
import { Page } from "./types";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import IntroVideo from "./components/IntroVideo";

const DESKTOP_MP4 =
  "https://rawcdn.githack.com/WarrenRe/Model/516c107470d9cd405f1b1a4a3c9681003e077519/DESKTOPLINK.mp4";

const PORTRAIT_MP4 =
  "https://rawcdn.githack.com/WarrenRe/Model/516c107470d9cd405f1b1a4a3c9681003e077519/PORTRAITLINK.mp4";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);
  const [slideIndex, setSlideIndex] = useState(0);
  const [homeResetKey, setHomeResetKey] = useState(0);

  const [introDone, setIntroDone] = useState(false);
  const [revealOn, setRevealOn] = useState(false);

  const goHomeSlide1 = () => {
    setCurrentPage(Page.Visualizer);
    setSlideIndex(0);
    setHomeResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (!introDone) return;
    const t = window.setTimeout(() => setRevealOn(true), 30);
    return () => window.clearTimeout(t);
  }, [introDone]);

  return (
    <>
      {!introDone && (
        <IntroVideo
          desktopUrl={DESKTOP_MP4}
          portraitUrl={PORTRAIT_MP4}
          onComplete={() => setIntroDone(true)}
        />
      )}

      <div className={`appReveal ${revealOn ? "appRevealOn" : ""}`}>
        <div className="pageShell">
          <div className="posterOuter">
            <div className="posterShell">
              <Header
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onGoHome={goHomeSlide1}
              />

              <main className="posterBody">
                {currentPage === Page.Visualizer ? (
                  <HomePage
                    key={homeResetKey}
                    slideIndex={slideIndex}
                    setSlideIndex={setSlideIndex}
                  />
                ) : (
                  <ContactPage />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
