
import React from 'react';
import { comicImage, stuffImage, image22 } from '../assets/images';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-8 py-4">
      <img 
        src={comicImage} 
        alt="A futuristic cityscape with a comic-style text box" 
        className="max-w-full h-auto object-contain rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      />
      <img 
        src={stuffImage} 
        alt="An artistic collage of various elements" 
        className="max-w-full h-auto object-contain rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] transform scale-y-90"
      />
      <div className="p-[20px] bg-gradient-to-br from-[#f07167] via-[#8f2d56] to-[#203040] rounded-lg">
        <img 
          src={image22} 
          alt="Abstract digital art" 
          className="max-w-full h-auto object-contain rounded-lg block shadow-[5px_5px_0px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
  );
};

export default HomePage;