import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  onClick, 
  hoverEffect = false,
  variant = 'default', // default, dark, light
  padding = 'p-md',
  ...props 
}) => {
  const baseStyles = `
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: var(--radius-lg);
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    overflow: hidden;
  `;

  const variants = {
    default: 'bg-white/10 border-white/10',
    dark: 'bg-black/20 border-white/5',
    light: 'bg-white/20 border-white/20'
  };

  const hoverStyles = hoverEffect 
    ? 'hover:scale-[1.02] hover:bg-white/15 hover:shadow-glow-purple cursor-pointer' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative ${variants[variant]} ${padding} ${hoverStyles} ${className}`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: variant === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
      {...props}
    >
      {/* Glossy shine effect */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {children}
    </motion.div>
  );
};

export default GlassCard;
