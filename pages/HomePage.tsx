
import React, { useState } from 'react';
import { comicImage, stuffImage, image22 } from '../assets/images';

const VisualizerPage: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Mobile View: Stacked Images */}
      <div className="md:hidden flex flex-col items-center space-y-8 w-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="max-w-full h-auto object-contain border-2 border-black"
          />
        ))}
      </div>

      {/* Desktop/Tablet View: Carousel */}
      <div className="hidden md:flex relative w-full h-full items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute transition-opacity duration-700 ease-in-out max-w-full max-h-[calc(100vh-250px)] h-auto object-contain border-2 border-black ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white z-10"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white z-10"
          aria-label="Next image"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VisualizerPage;
