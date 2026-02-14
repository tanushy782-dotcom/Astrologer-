import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { aiService } from '../services/aiService';
import { getZodiacSign } from '../data/zodiacSigns';
import CosmicBackground from '../components/ui/CosmicBackground';
import ZodiacWheel from '../components/horoscope/ZodiacWheel';
import HoroscopeResult from '../components/horoscope/HoroscopeResult';
import Loader from '../components/ui/Loader';
import GlassCard from '../components/layout/GlassCard';

const HoroscopeScreen = () => {
  const { userProfile, showSnackbar } = useApp();
  const { t, language } = useLanguage();
  
  const [selectedSign, setSelectedSign] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-select zodiac based on profile
  useEffect(() => {
    if (userProfile?.dob && !selectedSign) {
      const sign = getZodiacSign(userProfile.dob);
      setSelectedSign(sign.id);
      fetchHoroscope(sign.id);
    }
  }, [userProfile]);

  const handleSignSelect = (signId) => {
    setSelectedSign(signId);
    setResult(null); // Clear previous result
    fetchHoroscope(signId);
  };

  const fetchHoroscope = async (signId) => {
    setIsLoading(true);
    try {
      const context = {
        name: userProfile?.name || 'User',
        language: language
      };

      // In a real app, you'd verify if cache exists for today
      // Here we fetch fresh
      const rawText = await aiService.getHoroscope(signId, context);
      
      // Basic parser to convert raw AI text into structured object
      // Assumes AI follows: "Mood: Happy\nLove Energy: Good..."
      const parsedData = {};
      rawText.split('\n').forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          parsedData[key.trim()] = value.trim();
        } else if (line.trim()) {
          // If no key found, append to "advice"
          parsedData['advice'] = (parsedData['advice'] || '') + ' ' + line.trim();
        }
      });

      setResult(parsedData);
    } catch (error) {
      console.error(error);
      showSnackbar(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-28">
      <CosmicBackground intensity="normal" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 flex flex-col gap-6">
        
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            {t('horoscope.title')}
          </h1>
          <p className="text-white/60 text-xs uppercase tracking-widest">
            {new Date().toDateString()}
          </p>
        </div>

        {/* Zodiac Selector (Collapsible ideally, but here inline) */}
        {!userProfile?.dob && (
           <GlassCard className="p-2 bg-black/20">
             <ZodiacWheel 
               selectedSign={selectedSign} 
               onSelect={handleSignSelect} 
             />
           </GlassCard>
        )}

        {/* Result Area */}
        <div className="min-h-[300px]">
          {isLoading ? (
            <Loader text={t('common.analyzing')} />
          ) : result ? (
            <HoroscopeResult data={result} />
          ) : (
            <div className="text-center text-white/40 mt-10">
              <p>{t('horoscope.select_sign')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HoroscopeScreen;
