import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';

const LanguageSelectScreen = () => {
  const { goTo } = useNavigation();
  const { changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ko', label: '한국어 (Korean)', flag: '🇰🇷' },
  ];

  const handleSelect = (langCode) => {
    changeLanguage(langCode);
    goTo('/onboarding');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative">
      <CosmicBackground intensity="normal" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <h1 className="text-3xl font-display font-bold text-white text-center mb-2">
          Language
        </h1>
        <p className="text-white/60 text-center mb-8 text-sm">
          Select your preferred language
        </p>

        <div className="grid grid-cols-1 gap-3">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(lang.code)}
            >
              <GlassCard 
                hoverEffect 
                className="flex items-center gap-4 p-4 cursor-pointer active:scale-95 transition-transform"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-lg font-medium text-white/90">{lang.label}</span>
                <div className="flex-1" />
                <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelectScreen;
