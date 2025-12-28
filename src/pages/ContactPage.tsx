
import React from 'react';
import { ummLogo } from '../assets/images';

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 h-full text-gray-800 animate-fadeIn">
      <div className="w-full max-w-xs md:w-1/3">
        <img 
          src={ummLogo} 
          alt="Urban Masque Media Logo" 
          className="w-full h-auto object-contain"
          style={{ clipPath: 'inset(3px 0 0 0)' }}
        />
      </div>
      <div className="max-w-md text-left md:w-2/3">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide">
          Contact Me.
        </h2>
        <p className="mb-3 text-gray-700 text-sm md:text-base leading-relaxed">
          Got an idea? A collab in mind? Something half-formed but interesting? This is the place. I work across art, sound, narrative, and emerging tech. 
        </p>
        <p className="mb-4 text-gray-700 text-sm md:text-base leading-relaxed">
          Some projects are polished, some are weird, all are intentional. If you’re reaching out with curiosity, support, or an opportunity, I’m listening.
        </p>
        <a 
          href="https://instagram.com/urbanmasque.tv" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block font-semibold text-black hover:text-gray-600 transition-colors duration-200 border-b-2 border-black hover:border-gray-600 pb-1 text-sm md:text-base"
        >
          instagram.com/urbanmasque.tv
        </a>
      </div>
    </div>
  );
};

export default ContactPage;