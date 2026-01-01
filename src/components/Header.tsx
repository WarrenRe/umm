import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

type Props = {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onHomeReset: () => void;
};

const LINKS = {
  Visualizer: "http://urbanmasque.media/",
  Profiler: "https://warrenre.github.io/dogwatch/",
  Lens: "https://www.tiktok.com/effect/DedSecMask-2421054",
  Imagine: "https://www.midjourney.com/@urbz_?tab=spotlight",
} as const;

export default function Header({ currentPage, setCurrentPage, onHomeReset }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 10, left: r.left });
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;

      if (btnRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;

      setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const headerBtn =
    "uppercase tracking-[0.25em] text-[14px] md:text-[16px] bg-transparent text-black " +
    "border-0 outline-none p-0 hover:opacity-70";

  const menuItem =
    "w-full text-left px-5 py-3 uppercase tracking-[0.25em] text-[12px] bg-[#eeeeee] " +
    "text-black hover:bg-black hover:text-white";

  const activeMenuItem =
    "w-full text-left px-5 py-3 uppercase tracking-[0.25em] text-[12px] bg-black text-white";

  const sep = "border-t border-black";

  const ExternalItem = ({ label, href }: { label: string; href: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={menuItem}
      role="menuitem"
      onClick={() => setOpen(false)}
    >
      {label}
    </a>
  );

  const InternalItem = ({ label, page }: { label: string; page: Page }) => {
    const active = currentPage === page;
    return (
      <button
        type="button"
        role="menuitem"
        className={active ? activeMenuItem : menuItem}
        onClick={() => {
          // close menu, then route (prevents "close only" behavior)
          setOpen(false);
          requestAnimationFrame(() => setCurrentPage(page));
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="relative z-[1000] bg-[#eeeeee]">
      <div className="flex items-center justify-between px-8 py-6">
        <button
          ref={btnRef}
          type="button"
          className={headerBtn}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          MENU
        </button>

        <button
          type="button"
          className={headerBtn}
          onClick={() => {
            setOpen(false);
            requestAnimationFrame(() => onHomeReset());
          }}
          aria-label="Go to homepage slide 1"
        >
          UMM
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute z-[2000] min-w-[240px] border-2 border-black bg-[#eeeeee] shadow-[8px_8px_0px_#000000]"
          style={{ top: pos.top, left: pos.left }}
          role="menu"
        >
          <ExternalItem label="Visualizer" href={LINKS.Visualizer} />
          <div className={sep} />
          <ExternalItem label="Profiler" href={LINKS.Profiler} />
          <div className={sep} />
          <ExternalItem label="Lens" href={LINKS.Lens} />
          <div className={sep} />
          <ExternalItem label="Imagine" href={LINKS.Imagine} />
          <div className={sep} />
          <InternalItem label="Contact" page={Page.Contact} />
        </div>
      )}
    </header>
  );
}
