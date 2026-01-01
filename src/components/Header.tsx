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

export default function Header({
  currentPage,
  setCurrentPage,
  onHomeReset,
}: Props) {
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
    "uppercase tracking-[0.25em] text-[14px] bg-transparent text-black " +
    "border-0 outline-none p-0";

  const menuItemBase =
    "w-full text-left px-5 py-4 uppercase tracking-[0.25em] text-[13px] bg-white " +
    "hover:bg-black hover:text-white";

  const separator = "border-t border-black";

  const ExternalItem = ({ label, href }: { label: string; href: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={menuItemBase}
        role="menuitem"
        onClick={() => setOpen(false)}
      >
        {label}
      </a>
    );
  };

  const InternalItem = ({ label, page }: { label: string; page: Page }) => {
    const active = currentPage === page;
    return (
      <button
        type="button"
        className={[
          menuItemBase,
          active ? "bg-black text-white" : "",
        ].join(" ")}
        onClick={() => {
          setOpen(false);
          requestAnimationFrame(() => setCurrentPage(page));
        }}
        role="menuitem"
      >
        {label}
      </button>
    );
  };

  return (
    <header className="relative z-[1000] bg-transparent">
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
            requestAnimationFrame(() => {
              setCurrentPage(Page.Visualizer);
              onHomeReset();
            });
          }}
          aria-label="Go home"
        >
          UMM
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute bg-white border border-black min-w-[240px] shadow-[6px_6px_0px_#000]"
          style={{ top: pos.top, left: pos.left }}
          role="menu"
        >
          <ExternalItem label="Visualizer" href={LINKS.Visualizer} />
          <div className={separator} />
          <ExternalItem label="Profiler" href={LINKS.Profiler} />
          <div className={separator} />
          <ExternalItem label="Lens" href={LINKS.Lens} />
          <div className={separator} />
          <ExternalItem label="Imagine" href={LINKS.Imagine} />

          <div className={separator} />
          <InternalItem label="Contact" page={Page.Contact} />
        </div>
      )}
    </header>
  );
}
