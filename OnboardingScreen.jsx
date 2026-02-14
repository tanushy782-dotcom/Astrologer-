import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { slides } from '../data/onboardingSlides';
import Button from '../components/ui/Button';
import CosmicBackground from '../components/ui/CosmicBackground';

const OnboardingScreen = () => {
  const { goTo } = useNavigation();
  const { completeOnboarding } = useApp();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeOnboarding();
      goTo('/profile');
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <CosmicBackground intensity="subtle" />

      {/* Image Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0a2e]/60 to-[#0f0a2e] z-10" />
            <img 
              src={currentSlide.image} 
              alt="Onboarding" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="relative z-20 px-6 pb-10 pt-4 bg-[#0f0a2e] rounded-t-[3rem] -mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-accent-cyan' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center mb-8"
          >
            <div className="text-4xl mb-4 animate-bounce">
              {currentSlide.icon}
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              {t(`onboarding.${currentSlide.titleKey}`)}
            </h2>
            <p className="text-white/60 leading-relaxed">
              {t(`onboarding.${currentSlide.descKey}`)}
            </p>
          </motion.div>
        </AnimatePresence>

        <Button 
          variant="primary" 
          fullWidth 
          size="lg"
          onClick={handleNext}
        >
          {currentIndex === slides.length - 1 ? t('common.start') : t('common.next')}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
