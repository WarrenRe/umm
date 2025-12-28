import { useMemo, useState } from "react";
import { slides } from "../assets/images";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function HomePage() {
  const isDesktopOrTablet = useMediaQuery("(min-width: 768px)");
  const items = useMemo(() => slides, []);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  // MOBILE: stacked
  if (!isDesktopOrTablet) {
    return (
      <div className="w-full space-y-6">
        {items.map((src, i) => (
          <div key={i} className="border-2 border-black bg-white">
            <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>
    );
  }

  // DESKTOP/TABLET: carousel (1 visible)
  return (
    <div className="w-full">
      <div className="relative border-2 border-black bg-white overflow-hidden">
        <div className="w-full aspect-[16/9] max-h-[70vh]">
          <div
            className="h-full flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((src, i) => (
              <div key={i} className="w-full h-full shrink-0">
                <img
                  src={src}
                  alt={`slide-${i}`}
                  className="w-full h-full object-contain block"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white px-4 py-3 text-2xl hover:bg-black hover:text-white"
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white px-4 py-3 text-2xl hover:bg-black hover:text-white"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
