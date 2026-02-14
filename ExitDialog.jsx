import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../hooks/useLanguage';
import Button from './Button';
import GlassCard from '../layout/GlassCard';

const ExitDialog = () => {
  const { showExitDialog, setShowExitDialog } = useApp();
  const { t } = useLanguage();

  const handleExit = () => {
    // Attempt to close the window (works in PWA standalone mostly)
    window.close();
    // Fallback: If window.close() is blocked, show instruction or redirect
    // For PWA, history.back() usually minimizes if at root
    if (window.navigator.app && window.navigator.app.exitApp) {
      window.navigator.app.exitApp();
    }
  };

  const handleStay = () => {
    setShowExitDialog(false);
  };

  return (
    <AnimatePresence>
      {showExitDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleStay} // Click outside to close
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            className="w-full max-w-sm"
          >
            <GlassCard variant="dark" className="p-6 text-center border-white/20">
              <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4 text-3xl">
                🌌
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {t('exit.title')}
              </h3>
              
              <p className="text-white/60 mb-6 text-sm">
                {t('exit.message')}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={handleStay}>
                  {t('exit.no')}
                </Button>
                <Button variant="danger" onClick={handleExit}>
                  {t('exit.yes')}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitDialog;
