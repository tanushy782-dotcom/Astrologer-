import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

const Disclaimer = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show disclaimer once per session or use localStorage for persistence
    const hasSeen = sessionStorage.getItem('hasSeenDisclaimer');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenDisclaimer', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[1500] p-4 bg-black/80 backdrop-blur-lg border-t border-white/10"
        >
          <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-white/60 leading-relaxed">
              ⚠️ {t('disclaimer.text')}
            </p>
            <button
              onClick={handleDismiss}
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-full whitespace-nowrap transition-colors border border-white/10"
            >
              {t('disclaimer.agree')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Disclaimer;
