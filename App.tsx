import React, { useState, useEffect } from 'react';
import { SLIDES } from './constants';
import Slide from './components/Slide';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Scroll to top when slide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlideIndex, showFinalMessage]);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setShowFinalMessage(true);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  if (showFinalMessage) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#85203b] relative overflow-hidden animate-fadeIn py-20">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        {/* Decorative background hearts - Increased count and randomness */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-rose-300/20 animate-float-slow"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          >
             <Heart size={20 + Math.random() * 50} fill="currentColor" />
          </div>
        ))}
        
        <div className="z-10 flex flex-col items-center p-8 text-center max-w-lg w-full relative">
          
          <div className="mb-10 relative group">
             <div className="absolute inset-0 bg-rose-400/30 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
             {/* Removed Sparkles, just big cute heart */}
             <Heart size={110} className="text-rose-200 fill-rose-500 relative z-10 animate-bounce drop-shadow-2xl" strokeWidth={1.5} />
          </div>
          
          <div className="font-serif-display text-5xl md:text-7xl text-rose-50 mb-12 drop-shadow-lg tracking-wide animate-fade-in-up">
            Celine
          </div>
          
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
             <div className="absolute -inset-4 bg-rose-900/20 blur-xl rounded-full"></div>
             <p className="relative font-body text-2xl md:text-4xl text-rose-100 leading-relaxed italic border-y-2 border-rose-300/40 py-6 px-8">
               Will you be my valentine?
             </p>
          </div>

          <div className="mt-16 flex gap-6 text-rose-300/60">
             <Heart size={28} fill="currentColor" className="animate-pulse" />
             <Heart size={32} fill="currentColor" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
             <Heart size={28} fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#85203b] text-rose-50 relative">
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`transition-opacity duration-700 ease-in-out ${
            index === currentSlideIndex 
              ? 'relative opacity-100 z-10' 
              : 'absolute top-0 left-0 w-full h-full opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Slide 
            data={slide} 
            isActive={index === currentSlideIndex} 
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={index === 0}
            isLast={index === SLIDES.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default App;