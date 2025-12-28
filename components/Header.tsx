
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types.ts';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
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

  const navLink = currentPage === Page.Home ? Page.Contact : Page.Home;

  return (
    <header className="p-2 sm:p-3 flex justify-between items-center relative">
      <div ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f07167" />
                <stop offset="50%" stopColor="#8f2d56" />
                <stop offset="100%" stopColor="#203040" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#menuGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-full left-2 sm:left-3 mt-2 w-48 bg-[#F0F0F0]/95 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg z-10">
            <a
              href="https://warrenre.github.io/Visualizer/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Visualizer
            </a>
            <a
              href="https://warrenre.github.io/dogwatch/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Profiler
            </a>
            <a
              href="https://www.tiktok.com/t/ZTHKnpT219VwK-q3GRd/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Lens
            </a>
            <a
              href="https://www.midjourney.com/@urbz_?tab=spotlight"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Imagine
            </a>
            <button
              onClick={() => handleNavigation(navLink)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              {navLink === Page.Contact ? 'Contact Me' : 'Home'}
            </button>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-[#f07167] via-[#8f2d56] to-[#203040]">
        UMM
      </h1>
    </header>
  );
};

export default Header;