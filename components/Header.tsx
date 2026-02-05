import React, { useRef, useEffect } from 'react';
import { Page } from '../types';

interface MenuItem {
  name: string;
  type: 'internal' | 'external';
  page?: Page;
  url?: string;
}

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const menuItems: MenuItem[] = [
  { name: 'Home', type: 'internal', page: Page.Visualizer },
  { name: 'Visualizer', type: 'external', url: 'https://warrenre.github.io/Visualizer/' },
  { name: 'Profiler', type: 'external', url: 'https://warrenre.github.io/dogwatch/' },
  { name: 'Lens', type: 'external', url: 'https://www.tiktok.com/t/ZTHKnpT219VwK-q3GRd/' },
  { name: 'Imagine', type: 'external', url: 'https://www.midjourney.com/@urbz_?tab=spotlight' },
  { name: 'VIBE', type: 'external', url: 'https://suno.com/@urbz' },
  { name: 'Contact', type: 'internal', page: Page.ContactMe },
];

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e: any) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleItemClick = (item: MenuItem): void => {
    if (item.type === 'internal' && item.page) {
      setCurrentPage(item.page);
    } else if (item.type === 'external' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsMenuOpen]);

  return (
    <header className="p-4 sm:p-6 flex justify-between items-start">
      <div ref={menuRef} className="relative">
        <button
          onClick={toggleMenu}
          className="p-3 bg-[#eeeeee] border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000000] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

{isMenuOpen && (
  <div className="absolute top-full left-0 mt-3 w-48 bg-[#eeeeee] border-2 border-black shadow-[6px_6px_0px_#000000] z-50 overflow-hidden">
    {menuItems.map((item: MenuItem) => (
      <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`block w-full text-left px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b border-black last:border-b-0 ${
                  item.type === 'internal' && currentPage === item.page
                    ? 'bg-black text-white'
                    : 'text-black hover:bg-black hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {item.type === 'external' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleFullscreen}
          className="p-3 bg-[#eeeeee] border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000000] transition-all"
          title="Toggle Fullscreen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <div className="p-3 bg-[#eeeeee] border-2 border-black shadow-[4px_4px_0px_#000000]">
          <h1 className="text-xs font-bold tracking-[0.3em] uppercase">UMM</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;