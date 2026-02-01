import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 35, 
  className = "",
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    indexRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const typeChar = () => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
        // Randomize speed slightly for human feel
        const randomSpeed = speed + (Math.random() * 20 - 10);
        timeoutRef.current = window.setTimeout(typeChar, randomSpeed);
      } else {
        if (onComplete) onComplete();
      }
    };

    // Start typing
    timeoutRef.current = window.setTimeout(typeChar, 500); // Initial delay

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, onComplete]);

  return (
    <div className={`${className} whitespace-pre-wrap leading-relaxed`}>
      {displayedText}
      <span className="animate-pulse inline-block w-0.5 h-6 bg-rose-400 ml-1 align-middle opacity-70"></span>
    </div>
  );
};

export default TypewriterText;