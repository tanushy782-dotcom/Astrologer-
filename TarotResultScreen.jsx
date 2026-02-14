import React, { useEffect, useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';
import Button from '../components/ui/Button';
import ShareButton from '../components/ui/ShareButton';
import Loader from '../components/ui/Loader';

const TarotResultScreen = () => {
  const { goTo, resetToHome } = useNavigation();
  const { t } = useLanguage();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('tarot_latest_reading');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      goTo('/tarot');
    }
  }, [goTo]);

  if (!result) return <Loader fullScreen />;

  return (
    <div className="w-full min-h-screen relative pb-28">
      <CosmicBackground intensity="intense" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 space-y-6">
        
        {/* Card Visual */}
        <div className="flex flex-col items-center animate-fade-in-down">
          <div className="w-32 h-48 rounded-xl bg-gradient-to-br from-purple-900 to-black border-2 border-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.2)] flex flex-col items-center justify-center p-2 mb-4">
            <span className="text-5xl mb-2">{result.card.symbol}</span>
            <span className="text-white font-display font-bold text-center text-sm">
              {result.card.name}
            </span>
          </div>
          
          <h2 className="text-xl font-medium text-white/80">
            {t(`tarot.cat_${result.category}`)}
          </h2>
        </div>

        {/* Interpretation */}
        <div className="space-y-4 animate-fade-in-up delay-100">
          <GlassCard className="p-6 bg-white/5 border-white/10">
            <h3 className="text-accent-cyan font-bold mb-3 flex items-center gap-2">
              ✨ {t('tarot.interpretation')}
            </h3>
            <div className="text-white/90 leading-relaxed space-y-4 text-sm font-light">
               {/* 
                 AI returns markdown-like text. 
                 We render it safely. 
               */}
               {result.interpretation.split('\n').map((paragraph, idx) => (
                 paragraph.trim() && <p key={idx}>{paragraph}</p>
               ))}
            </div>
          </GlassCard>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2">
            {result.card.keywords.map((keyword, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 border border-white/5"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={resetToHome} fullWidth>
            {t('common.close')}
          </Button>
          <div className="flex-1">
            <ShareButton 
              className="w-full justify-center h-full bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/30 text-purple-200"
              text={`My Tarot Card: ${result.card.name} (${result.card.symbol}) - ${t('common.appName')} 🔮`}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TarotResultScreen;
