import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

export default function Header({
  currentPage,
  setCurrentPage,
  onHomeReset,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onHomeReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ top: 64, left: 16 });

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
    const onClick = (e: MouseEvent) => {
      // close if clicking outside
      const t = e.target as Node;
      if (!open) return;
      if (btnRef.current && btnRef.current.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const Item = ({ label, page }: { label: string; page: Page }) => {
    const active = currentPage === page;
    return (
      <button
        type="button"
        onClick={() => {
          setCurrentPage(page);
          setOpen(false);
        }}
        className={[
          "w-full text-left px-4 py-3 uppercase tracking-[0.22em] text-[12px]",
          "border-b border-black",
          active ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white",
        ].join(" ")}
      >
        {label}
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
          className="bg-white px-4 py-2 uppercase tracking-[0.22em] text-[12px] hover:bg-black hover:text-white"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          ☰ Menu
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(Page.Visualizer);
            onHomeReset();
            setOpen(false);
          }}
          className="font-bold tracking-[0.5em] text-[18px] md:text-[20px]"
          aria-label="Go to home"
        >
          UMM
        </button>
      </div>

      {open && (
        <div
          role="menu"
          className="fixed z-[999999] w-56 border-2 border-black bg-white shadow-[8px_8px_0px_#000000]"
          style={{ top: pos.top, left: pos.left }}
        >
          <Item label="Home" page={Page.Visualizer} />
          <Item label="Visualizer" page={Page.Visualizer} />
          <Item label="Profiler" page={Page.Profiler} />
          <Item label="Lens" page={Page.Lens} />
          <Item label="Imagine" page={Page.Imagine} />
          <div className="border-b border-black" />
          <button
            type="button"
            onClick={() => {
              setCurrentPage(Page.Contact);
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 uppercase tracking-[0.22em] text-[12px] bg-white hover:bg-black hover:text-white"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
