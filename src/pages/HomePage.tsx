import { slides } from "../assets/images";

export default function HomePage({
  idx,
  setIdx,
}: {
  idx: number;
  setIdx: (n: number) => void;
}) {
  const count = slides.length;
  const prev = () => setIdx((idx - 1 + count) % count);
  const next = () => setIdx((idx + 1) % count);

  return (
    <div className="w-full">
      {/* MOBILE: stacked images, full width with spacing */}
      <div className="md:hidden space-y-6">
        {slides.map((src, i) => (
          <div key={i} className="mx-auto w-full max-w-[960px] bg-white border border-black">
            <img src={src} alt={`slide-${i}`} className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* DESKTOP/TABLET: single centered carousel */}
      <div className="hidden md:flex w-full justify-center">
        <div className="relative w-full max-w-[980px]">
          {/* Image frame */}
          <div className="bg-white border border-black overflow-hidden">
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
          </div>

          {/* Grey circular arrows like your refs */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 -translate-y-1/2 -left-16
              w-12 h-12 rounded-full bg-[#bdbdbd] opacity-70 hover:opacity-90
              flex items-center justify-center text-2xl"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 -translate-y-1/2 -right-16
              w-12 h-12 rounded-full bg-[#bdbdbd] opacity-70 hover:opacity-90
              flex items-center justify-center text-2xl"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

