import { useMemo, useState } from "react";
import { images as imageUrls } from "../assets/images"; // after you add export const images = [...]

export default function HomePage() {
  const slides = useMemo(() => imageUrls, []);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* MOBILE: stacked */}
      <div className="md:hidden space-y-6">
        {slides.map((src, i) => (
          <div key={i} className="border-2 border-black bg-white">
            <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* TABLET/DESKTOP: carousel */}
      <div className="hidden md:block">
        <div className="relative border-2 border-black bg-white overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div key={i} className="w-full shrink-0">
                <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 border-2 border-black bg-white px-3 py-2 hover:bg-black hover:text-white"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 border-2 border-black bg-white px-3 py-2 hover:bg-black hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
