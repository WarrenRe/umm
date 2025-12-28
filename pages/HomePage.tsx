
import React from 'react';
import { comicImage } from '../assets/images';

const VisualizerPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <img
        src={comicImage}
        alt="A futuristic cityscape with a comic-style text box"
        className="max-w-full h-auto object-contain border-2 border-black"
      />
    </div>
  );
};

export default VisualizerPage;
