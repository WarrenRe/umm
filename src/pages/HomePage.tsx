import { useEffect, useMemo, useState } from "react";
import { slides } from "../assets/images";

type Props = {
  resetKey?: number;
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return isDesktop;
}

export default function HomePage({ resetKey = 0 }: Props) {
  const items = useMemo(() => slides, []);
  const [idx, setIdx] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => setIdx(0), [resetKey]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  // MOBILE: stacked
  if (!isDesktop) {
    return (
      <div className="w-full space-y-6">
        {items.map((src, i) => (
          <div key={i} className="w-full flex justify-center">
            <img src={src} alt={`slide-${i + 1}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>
    );
  }

  /**
   * DESKTOP/TABLET:
   * - No 100vh. This allows App.tsx spacing to actually work.
   * - Stage uses available space inside <main> (which is flex-1).
   * - Centering remains identical.
   */
  return (
    <div className="w-full h-full">
      <div className="px-[100px] h-full">
        <div className="relative h-full">
          {/* Stage fills available height of the poster's main area */}
          <div className="w-full h-full flex items-center justify-center">
<img
  src={items[idx]}
  alt={`slide-${idx + 1}`}
  className="block max-w-full"
  style={{
    maxHeight: "100%",
    objectFit: "contain",
    transform: "scale(0.85)",
    transformOrigin: "center",
  }}
/>

          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#d0d0d0]/70 hover:bg-[#d0d0d0] flex items-center justify-center"
          >
            <span className="text-[22px] leading-none select-none">‹</span>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#d0d0d0]/70 hover:bg-[#d0d0d0] flex items-center justify-center"
          >
            <span className="text-[22px] leading-none select-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
