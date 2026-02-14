import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';
import Loader from '../components/ui/Loader';
import ShareButton from '../components/ui/ShareButton';

const DailyGuidanceScreen = () => {
  const { userProfile, showSnackbar } = useApp();
  const { t, language } = useLanguage();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Check local cache first
      const cached = storageService.getDailyReading();
      if (cached) {
        setData(cached);
        setIsLoading(false);
        return;
      }

      // 2. Fetch from AI if no cache
      try {
        const context = {
          name: userProfile?.name || 'Soul',
          language: language
        };

        const response = await aiService.getDailyGuidance(context);
        
        // Simple text parsing (AI returns structured text)
        // We'll store the raw text for now, or parse if structured JSON
        const result = { text: response, timestamp: Date.now() };
        
        storageService.saveDailyReading(result);
        setData(result);
      } catch (error) {
        console.error(error);
        showSnackbar(t('common.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userProfile, language, showSnackbar, t]);

  if (isLoading) return <Loader fullScreen text={t('common.loading')} />;

  return (
    <div className="w-full min-h-screen relative pb-28">
      <CosmicBackground intensity="normal" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
           <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
             {t('daily.title')}
           </h1>
           <p className="text-white/60 text-xs uppercase tracking-widest">
             {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
           </p>
        </div>

        {/* Content Card */}
        <div className="animate-fade-in-up">
          <GlassCard className="p-6 bg-gradient-to-br from-white/10 to-transparent border-t border-white/20">
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-white/90">
                {data?.text}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Affirmation / Footer */}
        <div className="text-center pt-4">
           <p className="text-white/40 text-xs italic mb-4">
             "The universe speaks in whispers."
           </p>
           <ShareButton 
             className="mx-auto" 
             text={`My Daily Guidance: ${data?.text?.substring(0, 50)}... #AIPalmReader`}
           />
        </div>

      </div>
    </div>
  );
};

export default DailyGuidanceScreen;
