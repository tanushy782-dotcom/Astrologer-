import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { aiService } from '../services/aiService';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import ShareButton from '../components/ui/ShareButton';

const LoveReadingScreen = () => {
  const { t, language } = useLanguage();
  const { userProfile, showSnackbar } = useApp();
  const [partnerName, setPartnerName] = useState('');
  const [partnerSign, setPartnerSign] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partnerName) return;

    setIsLoading(true);
    try {
      const context = {
        name: userProfile?.name || 'User',
        partner: partnerName,
        partnerSign: partnerSign || 'Unknown',
        language: language
      };

      // Construct a specific prompt for love reading
      // Note: In a real app, this would be a dedicated method in aiService
      const prompt = `
        User: ${context.name}, Partner: ${context.partner} (${context.partnerSign}).
        Language: ${context.language}.
        Task: Provide a short, poetic love compatibility reading.
        Focus: Emotional connection, communication style, and spiritual bond.
        Avoid: Negative predictions or break-up advice.
      `;

      const response = await aiService.chat(prompt, [], context); // Reusing chat method for custom prompt
      setResult(response);

    } catch (error) {
      console.error(error);
      showSnackbar(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-24">
      <CosmicBackground intensity="normal" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 space-y-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 mx-auto flex items-center justify-center text-3xl mb-3 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            ❤️
          </div>
          <h1 className="text-2xl font-display font-bold text-white">
            {t('home.features.love')}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Discover the cosmic bond between souls.
          </p>
        </div>

        {/* Input Form */}
        {!result && !isLoading && (
          <GlassCard className="p-6 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                  Partner's Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter name..."
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                  Partner's Zodiac (Optional)
                </label>
                <select 
                  value={partnerSign}
                  onChange={(e) => setPartnerSign(e.target.value)}
                  className="mt-1"
                >
                  <option value="">Select Sign...</option>
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Leo">Leo</option>
                  <option value="Virgo">Virgo</option>
                  <option value="Libra">Libra</option>
                  <option value="Scorpio">Scorpio</option>
                  <option value="Sagittarius">Sagittarius</option>
                  <option value="Capricorn">Capricorn</option>
                  <option value="Aquarius">Aquarius</option>
                  <option value="Pisces">Pisces</option>
                </select>
              </div>

              <Button 
                variant="primary" 
                fullWidth 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-red-500 shadow-pink-500/30"
              >
                Reveal Compatibility
              </Button>
            </form>
          </GlassCard>
        )}

        {/* Loading State */}
        {isLoading && (
          <Loader text="Analyzing heart strings..." />
        )}

        {/* Result Display */}
        {result && (
          <div className="animate-fade-in-up space-y-4">
            <GlassCard className="p-6 bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-pink-500/20">
              <h3 className="text-pink-300 font-bold mb-3 flex items-center gap-2">
                💞 {partnerName} & {userProfile?.name}
              </h3>
              <div className="text-white/90 leading-relaxed text-sm whitespace-pre-wrap">
                {result}
              </div>
            </GlassCard>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setResult(null)} 
                fullWidth
              >
                New Reading
              </Button>
              <div className="flex-1">
                <ShareButton 
                  className="w-full justify-center h-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 border-pink-500/30" 
                  text={`Love Compatibility: ${userProfile?.name} + ${partnerName} 💘 #AIPalmReader`}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoveReadingScreen;
