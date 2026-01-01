import { useEffect, useMemo, useState } from "react";
import { slides } from "../assets/images";

type Props = {
  resetKey?: number;
};

export default function HomePage({ resetKey = 0 }: Props) {
  // Keep a stable array reference
  const items = useMemo(() => slides, []);
  const [idx, setIdx] = useState(0);

  // Reset to slide 1 when requested
  useEffect(() => {
    setIdx(0);
  }, [resetKey]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  return (
    <div className="w-full">
      {/* MOBILE: stacked */}
      <div className="md:hidden space-y-6">
        {items.map((src, i) => (
          <div key={i} className="w-full flex justify-center">
            <img
              src={src}
              alt={`slide-${i + 1}`}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>

      {/* DESKTOP/TABLET: single slide + arrows */}
      <div className="hidden md:block">
        {/* 100px padding left/right on desktop */}
        <div className="px-[100px]">
          {/* Provide breathing room below header */}
          <div className="relative flex items-center justify-center pt-6">
            {/* Current slide (one at a time) */}
            <div className="w-full flex justify-center">
              <img
                src={items[idx]}
                alt={`slide-${idx + 1}`}
                className="block max-w-full h-auto object-contain"
                // Keeps it from hugging header; avoids needing page scroll in most cases
                style={{ maxHeight: "calc(100vh - 260px)" }}
              />
            </div>

            {/* Left arrow */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#d0d0d0]/70 hover:bg-[#d0d0d0] flex items-center justify-center"
            >
              <span className="text-[22px] leading-none select-none">‹</span>
            </button>

            {/* Right arrow */}
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
    </div>
  );
}
