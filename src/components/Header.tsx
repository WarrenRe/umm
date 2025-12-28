import { Page } from "../types";

export default function Header({
  currentPage,
  setCurrentPage,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}) {
  const isHome = currentPage === Page.Visualizer;

  return (
    <header className="bg-[#f3f3f3]">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Menu</div>

        <nav className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(Page.Visualizer)}
            className={`px-3 py-2 border-2 border-black uppercase text-[11px] tracking-[0.2em]
              ${isHome ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(Page.Contact)}
            className={`px-3 py-2 border-2 border-black uppercase text-[11px] tracking-[0.2em]
              ${!isHome ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
          >
            Contact
          </button>
        </nav>

        <div className="font-bold tracking-[0.45em] text-[16px] md:text-[18px]">UMM</div>
      </div>
    </header>
  );
}
