import React from 'react';

const Loader = ({ text = "Consulting the stars...", fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-accent-cyan border-r-accent-purple rounded-full animate-spin"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 border-4 border-transparent border-t-accent-pink border-l-accent-blue rounded-full animate-spin-reverse" style={{ animationDuration: '1.5s' }}></div>
        
        {/* Center Orb */}
        <div className="absolute inset-[30%] bg-white/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute inset-[40%] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse"></div>
      </div>
      
      {text && (
        <p className="text-white/80 font-display tracking-widest text-sm uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0f0a2e]/90 backdrop-blur-xl flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full h-48 flex items-center justify-center">
      {content}
    </div>
  );
};

export default Loader;
