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

  // DESKTOP/TABLET: centered stage
  // Adjust this number if needed; it accounts for header + footer + app padding.
  const stageHeight = "calc(100vh - 240px)";

  return (
    <div className="w-full">
      <div className="px-[100px]">
        <div className="relative">
          <div className="w-full flex items-center justify-center" style={{ height: stageHeight }}>
            <img
              src={items[idx]}
              alt={`slide-${idx + 1}`}
              className="block max-w-full"
              style={{ maxHeight: "100%", objectFit: "contain" }}
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
