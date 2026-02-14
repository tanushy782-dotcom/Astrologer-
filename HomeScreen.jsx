import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '../hooks/useNavigation';
import FeatureGrid from '../components/home/FeatureGrid';
import GlassCard from '../components/layout/GlassCard';
import CosmicBackground from '../components/ui/CosmicBackground';

const HomeScreen = () => {
  const { userProfile } = useApp();
  const { t } = useLanguage();
  const { goTo } = useNavigation();

  // Greeting logic
  const hour = new Date().getHours();
  let greetingIcon = '☀️';
  if (hour >= 18 || hour < 5) greetingIcon = '🌙';

  return (
    <div className="w-full min-h-screen relative pb-24">
      <CosmicBackground intensity="normal" />

      <div className="relative z-10 px-4 pt-4 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-1 mt-2">
          <p className="text-white/60 text-sm uppercase tracking-wider flex items-center gap-2">
            {greetingIcon} {t('home.welcome', { name: userProfile?.name || 'Soul' })}
          </p>
          <h1 className="text-2xl font-display font-bold text-white max-w-[80%] leading-tight">
            {t('home.subtitle')}
          </h1>
        </div>

        {/* AI Chat Teaser */}
        <div onClick={() => goTo('/chat')}>
          <GlassCard 
            hoverEffect 
            variant="dark"
            className="flex items-center gap-4 p-4 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl animate-pulse">
              🔮
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">
                {t('chat.title')}
              </h3>
              <p className="text-xs text-white/50">
                {t('home.chat_placeholder')}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50">
              →
            </div>
          </GlassCard>
        </div>

        {/* Feature Grid */}
        <FeatureGrid />

        {/* Daily Insight Placeholder (could be cached) */}
        <div className="pt-2">
          <h3 className="text-white/80 font-medium mb-3 flex items-center gap-2">
            <span className="text-accent-gold">✨</span> Daily Insight
          </h3>
          <GlassCard className="p-4 bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
            <p className="text-white/70 text-sm italic leading-relaxed">
              "The stars align to remind you that stillness is a form of action. Trust the pause."
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
