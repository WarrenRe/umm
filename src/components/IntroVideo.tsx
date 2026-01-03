import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  desktopUrl: string;
  portraitUrl: string;
  onComplete: () => void;
};

function useIsPortrait() {
  const get = () =>
    window.matchMedia?.("(orientation: portrait)").matches ??
    window.innerHeight > window.innerWidth;

  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return get();
  });

  useEffect(() => {
    if (!window.matchMedia) {
      const onResize = () => setIsPortrait(get());
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const mq = window.matchMedia("(orientation: portrait)");
    const onChange = () => setIsPortrait(mq.matches);

    if ("addEventListener" in mq) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return isPortrait;
}

export default function IntroVideo({ desktopUrl, portraitUrl, onComplete }: Props) {
  const isPortrait = useIsPortrait();
  const videoSrc = useMemo(
    () => (isPortrait ? portraitUrl : desktopUrl),
    [isPortrait, desktopUrl, portraitUrl]
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<"video" | "toWhite">("video");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Autoplay may fail; user interaction can start it.
      }
    };

    tryPlay();
  }, [videoSrc]);

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 1.5;
  };

  const handleEnded = () => {
    setPhase("toWhite");
    window.setTimeout(() => onComplete(), 650);
  };

  return (
    <div className="introOverlay" aria-hidden>
      <video
        ref={videoRef}
        className={`introVideo ${phase === "toWhite" ? "introVideoFadeOut" : ""}`}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className={`introWhite ${phase === "toWhite" ? "introWhiteOn" : ""}`} />
    </div>
  );
}
