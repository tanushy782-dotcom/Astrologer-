import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScreenTransition = ({ children }) => {
  const location = useLocation();

  // Define transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 10
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    out: {
      opacity: 0,
      scale: 1.02,
      y: -10
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenTransition;
