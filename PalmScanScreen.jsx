import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { visionService } from '../services/visionService';
import { storageService } from '../services/storageService';
import CosmicBackground from '../components/ui/CosmicBackground';
import HandSelector from '../components/palm/HandSelector';
import ImageUploader from '../components/ui/ImageUploader';
import PalmGuide from '../components/palm/PalmGuide';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

const PalmScanScreen = () => {
  const { goTo } = useNavigation();
  const { userProfile, showSnackbar } = useApp();
  const { t, language } = useLanguage();

  const [step, setStep] = useState(1); // 1: Hand Select, 2: Upload/Scan
  const [selectedHand, setSelectedHand] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setStep(2);
  };

  const handleImageSelect = async (file, base64) => {
    if (!file || !base64) return;

    setIsAnalyzing(true);

    try {
      const context = {
        name: userProfile?.name || 'User',
        language: language
      };

      // Call Vision AI
      const result = await visionService.analyzePalm(base64, selectedHand, context);

      if (result.error) {
        showSnackbar(result.error);
        setIsAnalyzing(false);
        return;
      }

      // Save result and navigate
      const fullResult = {
        ...result,
        hand: selectedHand,
        image: base64, // Caution: Large string in localStorage
        timestamp: new Date().toISOString()
      };

      // We might want to avoid saving the full image in localStorage to prevent quota limits
      // saving only the analysis
      storageService.savePalmResult({
        ...result,
        hand: selectedHand,
        timestamp: new Date().toISOString()
      });

      goTo('/palm/result');

    } catch (error) {
      console.error(error);
      showSnackbar(t('common.error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-24">
      <CosmicBackground intensity="normal" />

      {/* Loading Overlay */}
      {isAnalyzing && (
        <Loader fullScreen text={t('palm.analyzing_title')} />
      )}

      <div className="relative z-10 p-4 pt-6 max-w-md mx-auto">
        
        {/* Step 1: Hand Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-cyan/20 mx-auto flex items-center justify-center text-3xl mb-4 border border-accent-cyan/30">
                🖐️
              </div>
              <h1 className="text-2xl font-display font-bold text-white mb-2">
                {t('palm.title')}
              </h1>
              <p className="text-white/60 text-sm">
                Unlock the secrets written in your hands.
              </p>
            </div>

            <HandSelector 
              selectedHand={selectedHand} 
              onSelect={handleHandSelect} 
            />
          </div>
        )}

        {/* Step 2: Image Upload */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-right">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => setStep(1)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70"
              >
                ←
              </button>
              <h2 className="text-xl font-bold text-white">
                {selectedHand === 'left' ? t('palm.left_hand') : t('palm.right_hand')}
              </h2>
            </div>

            <ImageUploader 
              onImageSelect={handleImageSelect} 
              isLoading={isAnalyzing} 
            />

            <PalmGuide />

            <div className="mt-4">
              <p className="text-xs text-center text-white/30 italic">
                {t('disclaimer.text')}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PalmScanScreen;
