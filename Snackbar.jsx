import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Snackbar = () => {
  const { snackbarMessage } = useApp();

  return (
    <AnimatePresence>
      {snackbarMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-[calc(var(--bottom-nav-height)+20px)] left-4 right-4 z-[1000] flex justify-center pointer-events-none"
        >
          <div className="bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-3">
            <span className="text-accent-cyan">✨</span>
            <p className="text-sm font-medium tracking-wide">
              {snackbarMessage.text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
