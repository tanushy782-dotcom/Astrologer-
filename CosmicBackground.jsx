import React, { useEffect, useRef } from 'react';

const CosmicBackground = ({ 
  intensity = 'normal', // normal, intense, subtle
  children 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const starCount = intensity === 'intense' ? 150 : intensity === 'subtle' ? 50 : 100;

      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.05
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle
        star.alpha += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha <= 0) star.alpha = 0;
        if (star.alpha >= 1) star.alpha = 1;
      });

      requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, [intensity]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Deep Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#251760] opacity-100" />
      
      {/* Animated Nebula Blobs */}
      <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-purple-900/30 rounded-full blur-[100px] animate-[nebulaDrift_15s_infinite_alternate]" />
      <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[80px] animate-[nebulaDrift_20s_infinite_alternate-reverse]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[90px] animate-[nebulaDrift_18s_infinite_alternate]" />

      {/* Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Content wrapper ensuring z-index above bg */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default CosmicBackground;
