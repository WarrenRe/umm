import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

export default function Header({
  currentPage,
  setCurrentPage,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ top: 64, left: 16 });

  // Position dropdown under the button (desktop + mobile)
  useLayoutEffect(() => {
    if (!open) return;
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ top: r.bottom + 8, left: r.left });
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Item = ({ label, page }: { label: string; page: Page }) => {
    const active = currentPage === page;
    return (
      <button
        type="button"
        onClick={() => {
          setCurrentPage(page);
          setOpen(false);
        }}
        className={`w-full text-left px-5 py-4 uppercase tracking-[0.22em] text-[13px]
          ${active ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="bg-[#f3f3f3]">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="bg-white px-5 py-4 uppercase tracking-[0.22em] text-[13px] hover:bg-black hover:text-white"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          Menu
        </button>

        <div className="font-bold tracking-[0.5em] text-[18px] md:text-[20px]">
          UMM
        </div>
      </div>

      {open && (
        <div
          role="menu"
          className="fixed z-[999999] w-72 border-2 border-black bg-white shadow-[8px_8px_0px_#000000]"
          style={{ top: pos.top, left: pos.left }}
        >
          <Item label="Visualizer" page={Page.Visualizer} />
          <Item label="Profiler" page={Page.Profiler} />
          <Item label="Lens" page={Page.Lens} />
          <Item label="Imagine" page={Page.Imagine} />
          <div className="border-t-2 border-black" />
          <Item label="Contact" page={Page.Contact} />
        </div>
      )}
    </header>
  );
}
