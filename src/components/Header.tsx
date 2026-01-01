import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

type Props = {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onHomeReset: () => void;
};

export default function Header({ currentPage, setCurrentPage, onHomeReset }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
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
      if (!open) return;
      const t = e.target as Node;

      // Click on Menu button: ignore (button handler toggles)
      if (btnRef.current && btnRef.current.contains(t)) return;

      // Click inside menu: ignore (menu item handlers handle closing)
      if (menuRef.current && menuRef.current.contains(t)) return;

      // Otherwise close
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
    "px-4 py-2 uppercase tracking-[0.22em] text-[12px] bg-transparent text-black " +
    "hover:bg-transparent hover:text-black border-0 outline-none";

  const menuItemBase =
    "w-full text-left px-4 py-3 uppercase tracking-[0.22em] text-[12px] border-b border-black";

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
          menuItemBase,
          active ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white",
        ].join(" ")}
        role="menuitem"
      >
        {label}
      </button>
    );
  };

  return (
    <header className="bg-[#f3f3f3] relative z-[1000]">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={headerBtn}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          Menu
        </button>

        <button
          type="button"
          className={headerBtn}
          onClick={() => {
            setCurrentPage(Page.Visualizer);
            setOpen(false);
            onHomeReset();
          }}
        >
          UMM
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute bg-white border border-black z-[2000] min-w-[220px]"
          style={{ top: pos.top, left: pos.left }}
          role="menu"
        >
          <Item label="Visualizer" page={Page.Visualizer} />
          <Item label="Editor" page={Page.Editor} />
          <Item label="Contact" page={Page.Contact} />
        </div>
      )}
    </header>
  );
}
