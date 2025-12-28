
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const menuItems = [
  { name: 'Visualizer', type: 'external', url: 'https://warrenre.github.io/Visualizer/' },
  { name: 'Profiler', type: 'external', url: 'https://warrenre.github.io/dogwatch/' },
  { name: 'Lens', type: 'external', url: 'https://www.tiktok.com/t/ZTHKnpT219VwK-q3GRd/' },
  { name: 'Imagine', type: 'external', url: 'https://www.midjourney.com/@urbz_?tab=spotlight' },
  { name: Page.ContactMe, type: 'internal', page: Page.ContactMe },
];

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.type === 'external' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'internal' && item.page) {
      setCurrentPage(item.page);
    }
    setIsMenuOpen(false);
  };
  
  const handleHomeNavigation = () => {
    setCurrentPage(Page.Visualizer);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleHomeNavigation();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="p-2 sm:p-3 flex justify-between items-center relative border-b-2 border-black">
      <div ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 a 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#eeeeee] border-2 border-black shadow-[4px_4px_0px_#000000] z-10">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  currentPage === item.name && item.type === 'internal'
                    ? 'bg-black text-white'
                    : 'text-gray-800 hover:bg-black hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div 
        onClick={handleHomeNavigation}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Go to homepage"
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        <h1 className="text-2xl font-bold tracking-wider">
          UMM
        </h1>
      </div>
    </header>
  );
};

export default Header;