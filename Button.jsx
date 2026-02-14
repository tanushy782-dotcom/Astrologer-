import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  icon,
  ...props
}) => {
  // Styles based on variant
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-900/20 border border-white/10 hover:shadow-purple-600/40',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md',
    outline: 'bg-transparent border border-white/30 text-white hover:border-white/60',
    ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30'
  };

  // Styles based on size
  const sizes = {
    sm: 'py-2 px-3 text-sm rounded-lg',
    md: 'py-3 px-5 text-base rounded-xl',
    lg: 'py-4 px-6 text-lg font-semibold rounded-2xl'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative flex items-center justify-center gap-2 font-medium transition-all duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </>
      )}

      {/* Glow effect for primary buttons */}
      {variant === 'primary' && !disabled && !loading && (
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20 pointer-events-none" />
      )}
    </motion.button>
  );
};

export default Button;
