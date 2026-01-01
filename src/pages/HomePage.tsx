import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { slides } from "../assets/images";

type Props = {
  resetKey?: number; // changes when UMM logo is clicked
};

export default function HomePage({ resetKey = 0 }: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const items = useMemo(() => slides, []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [resetKey]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  // MOBILE: stacked list (with spacing)
  if (isMobile) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {items.map((src, i) => (
          <div key={i} className="border-2 border-black bg-white">
            <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>
    );
  }

  // DESKTOP/TABLET: centered carousel, single slide visible
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative">
          {/* Slide frame */}
          <div className="border-2 border-black bg-white overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {items.map((src, i) => (
                <div key={i} className="w-full shrink-0">
                  <img
                    src={src}
                    alt={`slide-${i}`}
                    className="w-full h-auto block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons (grey circles) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="
              absolute left-[-56px] top-1/2 -translate-y-1/2
              h-12 w-12 rounded-full
              bg-[#cfcfcf] border-2 border-white
              flex items-center justify-center
              hover:bg-[#bdbdbd]
            "
          >
            <span className="text-[26px] leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="
              absolute right-[-56px] top-1/2 -translate-y-1/2
              h-12 w-12 rounded-full
              bg-[#cfcfcf] border-2 border-white
              flex items-center justify-center
              hover:bg-[#bdbdbd]
            "
          >
            <span className="text-[26px] leading-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
