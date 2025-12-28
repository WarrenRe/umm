
import React, { useState, useEffect } from 'react';
import { glitchImage } from '../assets/images.ts';

interface InitializationScreenProps {
  onComplete: () => void;
  isExiting: boolean;
}

const scriptLines = [
  'INITIALIZING UMM.CORE v1.0.0...',
  'CONNECTING TO NEURAL INTERFACE... [OK]',
  'LOADING VISUAL ASSETS... [OK]',
  'DECRYPTING NARRATIVE STREAMS... [OK]',
  'CALIBRATING REALITY ENGINE... [OK]',
  'AWAKENING CREATIVE CONSTRUCT...',
  '',
  'LAUNCHING...',
];

const InitializationScreen: React.FC<InitializationScreenProps> = ({ onComplete, isExiting }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const lineInterval = setInterval(() => {
      if (currentIndex < scriptLines.length) {
        setLines(prev => [...prev, scriptLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(lineInterval);
        setTimeout(onComplete, 750);
      }
    }, 300);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(lineInterval);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <>
      <div 
        className="flex items-center justify-center min-h-screen bg-black text-green-400 p-4" 
        style={{ 
          fontFamily: "'Syne Mono', monospace", 
          opacity: isExiting ? 0 : 1, 
          transition: 'opacity 0.3s ease-out' 
        }}
      >
        <div className="w-full max-w-2xl">
          {lines.map((line, index) => (
            <p key={index} className="whitespace-pre-wrap text-sm sm:text-base">{`> ${line}`}</p>
          ))}
          {lines.length < scriptLines.length && showCursor && (
            <span className="inline-block w-2 h-4 sm:h-5 bg-green-400 ml-2"></span>
          )}
        </div>
      </div>
      {isExiting && (
        <div 
          className="animate-glitch-flash"
          style={{
            backgroundImage: `url(${glitchImage})`,
          }}
        />
      )}
    </>
  );
};

export default InitializationScreen;