import React, { useState } from 'react';
import { comicImage, stuffImage, image22 } from '../assets/images';

interface HomePageProps {
  onToggleMenu: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onToggleMenu }) => {
  const images = [
    { src: comicImage, alt: 'A futuristic cityscape with a comic-style text box' },
    { src: stuffImage, alt: 'A collage of various artistic and technical items' },
    { src: image22, alt: 'Abstract art piece with number 22' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full h-full relative group bg-[#eeeeee]">
      {/* Mobile View */}
      <div className="md:hidden h-full overflow-y-auto pt-24 pb-12 px-4 space-y-6">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={index === 2 ? onToggleMenu : undefined}
            className={`w-full h-auto object-contain border-2 border-black ${
              index === 2 
                ? 'shadow-[8px_8px_0px_#000000] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000000] transition-all' 
                : 'shadow-[6px_6px_0px_#00000020]'
            }`}
          />
        ))}
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:flex relative w-full h-full items-center justify-center">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              onClick={index === 2 ? onToggleMenu : undefined}
              className={`w-auto h-auto max-w-[95%] max-h-[95%] object-contain border-4 border-black transition-all ${
                index === 2 
                  ? 'shadow-[12px_12px_0px_#000000] cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[16px_16px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0px_#000000]' 
                  : 'shadow-[20px_20px_40px_rgba(0,0,0,0.15)]'
              }`}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-10 top-1/2 -translate-y-1/2 bg-black/5 hover:bg-black text-black hover:text-white border-2 border-black/10 hover:border-black p-5 backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-10 top-1/2 -translate-y-1/2 bg-black/5 hover:bg-black text-black hover:text-white border-2 border-black/10 hover:border-black p-5 backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;