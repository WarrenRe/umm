import { useEffect, useMemo, useState } from "react";
import { slides } from "../assets/images";

type Props = {
  resetKey?: number;
};

export default function HomePage({ resetKey = 0 }: Props) {
  const items = useMemo(() => slides, []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [resetKey]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  const isSlide3 = idx === 2; // third slide special handling

  return (
    <div className="w-full">
      {/* MOBILE: stacked with spacing */}
      <div className="md:hidden space-y-6">
        {items.map((src, i) => (
          <div
            key={i}
            className="bg-white border-2 border-black shadow-[6px_6px_0px_#000000] overflow-hidden"
          >
            <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* DESKTOP/TABLET: single slide + arrows */}
      <div className="hidden md:flex w-full justify-center">
        {/* 100px padding left/right via maxWidth calc(100vw - 200px) */}
        <div className="relative w-full" style={{ maxWidth: "calc(100vw - 200px)" }}>
          {/* Frame restores your old look (border/padding/shadow) */}
          <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#000000] overflow-hidden">
            {/* Slide 1 & 2: fit remaining viewport height (no scroll) */}
            {!isSlide3 && (
              <div style={{ height: "calc(100vh - 260px)" }} className="flex items-center justify-center">
                <img
                  src={items[idx]}
                  alt={`slide-${idx}`}
                  className="h-full w-auto max-w-full object-contain block"
                />
              </div>
            )}

            {/* Slide 3: “floating” centered, with breathing room from header */}
            {isSlide3 && (
              <div className="flex justify-center pt-10 pb-10">
                <img
                  src={items[idx]}
                  alt={`slide-${idx}`}
                  className="w-auto max-w-[calc(100%-200px)] object-contain block"
                />
              </div>
            )}
          </div>

          {/* Arrows (always visible) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50
                       w-12 h-12 rounded-full bg-gray-300/80 hover:bg-gray-300
                       flex items-center justify-center text-2xl select-none"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50
                       w-12 h-12 rounded-full bg-gray-300/80 hover:bg-gray-300
                       flex items-center justify-center text-2xl select-none"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
