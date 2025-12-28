
import React from 'react';
import { ummLogo } from '../assets/images';

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-end md:flex-row md:justify-center md:items-center gap-8 md:gap-12 h-full text-gray-800 px-4 pb-8 md:pb-0">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden">
        <img 
          src={ummLogo} 
          alt="Urban Masque Media Logo" 
          className="w-full h-auto object-contain -mt-[5px]"
        />
      </div>
      <div className="max-w-lg text-left">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 tracking-wide">
          Hit me up.
        </h2>
        <p className="mb-4 text-gray-700 text-base leading-relaxed">
          Got an idea? A collab in mind? Something half-formed but interesting? This is the place. I work across art, sound, narrative, and emerging tech.
        </p>
        <p className="mb-6 text-gray-700 text-base leading-relaxed">
          Some projects are polished, some are weird, all are intentional. If you’re reaching out with curiosity, support, or an opportunity, I’m listening.
        </p>
        <a 
          href="https://instagram.com/urbanmasque.tv" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block font-semibold text-pink-500 hover:text-pink-400 transition-colors duration-200 border-b-2 border-transparent hover:border-pink-500 pb-1"
        >
          instagram.com/urbanmasque.tv
        </a>
      </div>
    </div>
  );
};

export default ContactPage;