
import React from 'react';
import { stuffImage, image22 } from '../assets/images';

const StuffPage: React.FC = () => {
  const images = [
    { src: stuffImage, alt: 'A collage of various artistic and technical items' },
    { src: image22, alt: 'Abstract art piece with number 22' },
  ];

  return (
    <div className="flex flex-col items-center justify-start h-full space-y-8 animate-fadeIn">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className="max-w-full h-auto object-contain border-2 border-black"
        />
      ))}
    </div>
  );
};

export default StuffPage;
