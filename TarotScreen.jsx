import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useApp } from '../context/AppContext';
import { getRandomCard } from '../data/tarotCards';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import CosmicBackground from '../components/ui/CosmicBackground';
import TarotCard from '../components/tarot/TarotCard';
import TarotCategoryPicker from '../components/tarot/TarotCategoryPicker';
import Loader from '../components/ui/Loader';

const TarotScreen = () => {
  const { goTo } = useNavigation();
  const { userProfile, showSnackbar } = useApp();
  const { t, language } = useLanguage();

  const [step, setStep] = useState(1); // 1: Category, 2: Reveal
  const [category, setCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    // Pick a random card immediately but don't interpret yet
    const card = getRandomCard();
    setSelectedCard(card);
    setStep(2);
  };

  const handleReveal = async () => {
    setIsRevealed(true);
    setIsLoading(true);

    try {
      const context = {
        name: userProfile?.name || 'Seeker',
        language: language
      };

      // Call AI for interpretation
      const interpretation = await aiService.getTarotReading(
        selectedCard.name, 
        t(`tarot.cat_${category}`), // Pass localized category name
        context
      );

      // Save result locally to pass to result screen
      const resultData = {
        card: selectedCard,
        category: category,
        interpretation: interpretation,
        timestamp: new Date().toISOString()
      };
      
      // We use sessionStorage to pass data between screens without persisting forever
      sessionStorage.setItem('tarot_latest_reading', JSON.stringify(resultData));

      // Small delay to let user see the card flip animation
      setTimeout(() => {
        goTo('/tarot/result');
      }, 1500);

    } catch (error) {
      console.error(error);
      showSnackbar(t('common.error'));
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-24 flex flex-col items-center">
      <CosmicBackground intensity="normal" />

      <div className="relative z-10 w-full max-w-md px-4 pt-6 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {t('tarot.title')}
          </h1>
          <p className="text-white/60 text-sm">
            {step === 1 ? t('tarot.pick_category') : t('tarot.instruction')}
          </p>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="animate-fade-in-up w-full">
            <TarotCategoryPicker onSelect={handleCategorySelect} />
          </div>
        )}

        {/* Step 2: Card Reveal */}
        {step === 2 && selectedCard && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up pb-10">
            <div className="mb-8 scale-110">
              <TarotCard 
                card={selectedCard} 
                isRevealed={isRevealed} 
                onClick={handleReveal} 
              />
            </div>

            {isLoading && (
              <div className="mt-8">
                <Loader text={t('tarot.revealing')} />
              </div>
            )}
            
            {!isRevealed && !isLoading && (
              <p className="text-white/50 text-xs animate-pulse mt-4">
                Tap card to reveal
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotScreen;
