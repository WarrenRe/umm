import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

export default function Header({
  currentPage,
  setCurrentPage,
  onLogoClick,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onLogoClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ top: 84, left: 16 });

  useLayoutEffect(() => {
    if (!open) return;
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ top: r.bottom + 10, left: r.left });
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (p: Page) => {
    setCurrentPage(p);
    setOpen(false);
  };

  const Item = ({ label, page }: { label: string; page: Page }) => {
    const active = currentPage === page;
    return (
      <button
        type="button"
        onClick={() => go(page)}
        className={`w-full flex items-center justify-between px-4 py-3 uppercase tracking-[0.22em] text-[11px]
          ${active ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
      >
        <span>{label}</span>
        <span className="opacity-70 text-[12px]">↗</span>
      </button>
    );
  };

  return (
    <header className="bg-[#f3f3f3]">
      <div className="flex items-center justify-between px-5 py-3">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 bg-transparent uppercase tracking-[0.22em] text-[11px] opacity-80 hover:opacity-100"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className="text-[18px] leading-none">☰</span>
          <span>Menu</span>
        </button>

        {/* UMM “logo” text top-right; click returns to Homepage slide 1 */}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onLogoClick();
          }}
          className="font-bold tracking-[0.5em] text-[16px] md:text-[18px]"
          aria-label="UMM Home"
        >
          UMM
        </button>
      </div>

      {/* Thin divider line under header like your refs */}
      <div className="h-px bg-black opacity-80 mx-5" />

      {open && (
        <div
          role="menu"
          className="fixed z-[999999] w-44 border-2 border-black bg-white shadow-[6px_6px_0px_#000000]"
          style={{ top: pos.top, left: pos.left }}
        >
          {/* Black bar header like screenshot */}
          <div className="bg-black text-white px-4 py-3 uppercase tracking-[0.22em] text-[11px]">
            Home
          </div>

          <Item label="Visualizer" page={Page.Visualizer} />
          <Item label="Profiler" page={Page.Profiler} />
          <Item label="Lens" page={Page.Lens} />
          <Item label="Imagine" page={Page.Imagine} />

          <div className="h-px bg-black opacity-80" />
          <button
            type="button"
            onClick={() => go(Page.Contact)}
            className={`w-full text-left px-4 py-3 uppercase tracking-[0.22em] text-[11px]
              ${currentPage === Page.Contact ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}

