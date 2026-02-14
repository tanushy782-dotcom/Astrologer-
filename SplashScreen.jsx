import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import CosmicBackground from '../components/ui/CosmicBackground';
import { useLanguage } from '../hooks/useLanguage';

const SplashScreen = () => {
  const { goTo } = useNavigation();
  const { isOnboardingComplete, userProfile } = useApp();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOnboardingComplete) {
        goTo('/language');
      } else if (!userProfile) {
        goTo('/profile');
      } else {
        goTo('/home');
      }
    }, 3500); // 3.5s duration

    return () => clearTimeout(timer);
  }, [isOnboardingComplete, userProfile, goTo]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#0f0a2e]">
      <CosmicBackground intensity="intense" />

      <div className="z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-32 h-32 mb-6"
        >
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 animate-[spinSlow_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-2 border-accent-purple/30 animate-[spinSlow_8s_linear_infinite_reverse]" />
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl filter drop-shadow-[0_0_15px_rgba(0,210,255,0.6)]">
              🖐️
            </span>
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 tracking-wider mb-2 text-center"
        >
          AI Palm Reader
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-sm text-white/60 uppercase tracking-[0.2em] font-light"
        >
          {t('splash.subtitle')}
        </motion.p>
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
      >
        <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-1/2 animate-[shimmer_1.5s_infinite]" />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
