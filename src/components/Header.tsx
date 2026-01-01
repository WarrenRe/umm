import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "../types";

type Props = {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onHomeReset: () => void;
};

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
    const onClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const headerBtn =
    "px-6 py-4 uppercase tracking-[0.25em] text-[14px] bg-transparent border-0 outline-none";

  const itemBase =
    "w-full text-left px-5 py-4 uppercase tracking-[0.25em] text-[13px] border-b border-black";

  const Item = ({ label, page }: { label: string; page: Page }) => (
    <button
      type="button"
      onClick={() => {
        setCurrentPage(page);
        setOpen(false);
      }}
      className={[
        itemBase,
        currentPage === page
          ? "bg-black text-white"
          : "bg-white hover:bg-black hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <header className="relative z-[1000] bg-[#eeeeee]">
      <div className="flex items-center justify-between px-8 py-6">
        <button
          ref={btnRef}
          className={headerBtn}
          onClick={() => setOpen((v) => !v)}
        >
          MENU
        </button>

        <button
          className={headerBtn}
          onClick={() => {
            setCurrentPage(Page.Visualizer);
            onHomeReset();
          }}
        >
          UMM
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute bg-white border border-black min-w-[240px] shadow-[6px_6px_0px_#000]"
          style={{ top: pos.top, left: pos.left }}
        >
          <Item label="Visualizer" page={Page.Visualizer} />
          <Item label="Profiler" page={Page.Profiler} />
          <Item label="Lens" page={Page.Lens} />
          <Item label="Imagine" page={Page.Imagine} />
          <Item label="Contact" page={Page.Contact} />
        </div>
      )}
    </header>
  );
}
