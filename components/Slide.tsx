import React from 'react';
import { SlideData } from '../types';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface SlideProps {
  data: SlideData;
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const Slide: React.FC<SlideProps> = ({ data, isActive, onNext, onPrev, isFirst, isLast }) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#85203b] relative animate-fadeIn">
      
      {/* Navigation Arrows - Fixed to viewport center */}
      
      {/* Previous Button - LEFT Side */}
      <button 
        onClick={onPrev}
        disabled={isFirst}
        className={`fixed top-1/2 -translate-y-1/2 left-4 md:left-8 z-50 p-4 rounded-full bg-rose-400 text-white shadow-[0_0_15px_rgba(251,113,133,0.6)] border-2 border-rose-200 transition-all duration-300 hover:bg-rose-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(251,113,133,0.8)] ${
          isFirst ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} strokeWidth={3} />
      </button>

      {/* Next Button - RIGHT Side */}
      <button 
        onClick={onNext}
        className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-50 p-4 rounded-full bg-rose-400 text-white shadow-[0_0_15px_rgba(251,113,133,0.6)] border-2 border-rose-200 transition-all duration-300 hover:bg-rose-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(251,113,133,0.8)] group"
        aria-label={isLast ? "Finish" : "Next Slide"}
      >
        {isLast ? (
          <Heart size={32} className="fill-white text-white animate-pulse group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronRight size={32} strokeWidth={3} />
        )}
      </button>

      {/* Image Section - Fits image without cropping */}
      <div className="relative h-[75vh] w-full z-0 shadow-xl shadow-rose-950/20 overflow-hidden bg-black/20">
        
        {/* Blurred Background Layer to fill space nicely */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        ></div>

        {/* Gradient Overlay for text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#85203b] z-10 pointer-events-none"></div>
        
        {/* Heart Decoration */}
        <div className="absolute top-8 right-8 z-20 text-rose-200/80 animate-pulse">
          <Heart size={36} fill="currentColor" className="text-rose-100" />
        </div>
        
        {/* Main Image - Uses object-contain to fit fully inside */}
        <img 
          src={data.imageUrl} 
          alt="Memory" 
          className="relative z-0 w-full h-full object-contain object-center drop-shadow-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="w-full flex flex-col items-center relative z-20 px-6 py-12 md:py-16">
        
        {/* Floating Hearts Decorations */}
        <div className="absolute top-0 right-10 text-rose-300/30 animate-float-slow">
           <Heart size={28} fill="currentColor" />
        </div>
        <div className="absolute top-20 left-6 text-rose-300/30 animate-float-slow" style={{ animationDelay: '1s' }}>
           <Heart size={36} fill="currentColor" />
        </div>
        <div className="absolute bottom-10 right-12 text-rose-300/30 animate-pulse" style={{ animationDelay: '2s' }}>
           <Heart size={24} fill="currentColor" />
        </div>
        <div className="absolute bottom-20 left-10 text-rose-300/20 animate-float-slow" style={{ animationDelay: '1.5s' }}>
           <Heart size={20} fill="currentColor" />
        </div>

        {/* Content Container */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          {data.title && (
            <h2 className="font-serif-display text-rose-100 text-3xl md:text-5xl mb-8 text-center z-10 animate-[fadeIn_0.8s_ease-out_forwards] drop-shadow-md">
              {data.title}
            </h2>
          )}
          
          <div className="relative w-full">
            {/* Decorative bracket/line */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-transparent via-rose-300/60 to-transparent"></div>
            
            {/* Standard Text */}
            <div className="font-body text-xl md:text-2xl text-rose-50 text-center leading-loose w-full pb-8 px-4 drop-shadow-sm whitespace-pre-wrap animate-[fadeIn_1.5s_ease-out_forwards]">
              {data.text}
            </div>
          </div>
          
          {/* Bottom decorations */}
          <div className="mt-8 opacity-80 flex gap-3">
            <Heart size={22} className="text-rose-200 fill-rose-300 animate-bounce" style={{ animationDelay: '0s' }} />
            <Heart size={28} className="text-rose-200 fill-rose-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Heart size={22} className="text-rose-200 fill-rose-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;