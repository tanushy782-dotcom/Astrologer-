import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import GlassCard from '../layout/GlassCard';

const HoroscopeResult = ({ data }) => {
  const { t } = useLanguage();

  /* 
     Expected data structure from AI:
     {
       "Mood": "...",
       "Love Energy": "...",
       "Career Focus": "...",
       "Spiritual Advice": "..."
     }
  */

  // Fallback parsing if keys vary slightly
  const mood = data['Mood'] || data['mood'] || 'Balanced';
  const love = data['Love Energy'] || data['love'] || 'Harmonious interactions expected.';
  const career = data['Career Focus'] || data['career'] || 'Steady progress.';
  const advice = data['Spiritual Advice'] || data['advice'] || 'Trust your intuition today.';

  const items = [
    { label: t('horoscope.mood'), value: mood, icon: '🎭', color: 'text-yellow-300' },
    { label: t('horoscope.love'), value: love, icon: '❤️', color: 'text-pink-300' },
    { label: t('horoscope.career'), value: career, icon: '💼', color: 'text-blue-300' },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="flex items-center gap-3 p-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                <p className={`text-sm font-medium ${item.color}`}>{item.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Advice Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/20">
          <h4 className="text-white/90 font-display font-bold mb-2 flex items-center gap-2">
            ✨ {t('horoscope.advice')}
          </h4>
          <p className="text-white/80 leading-relaxed text-sm italic">
            "{advice}"
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default HoroscopeResult;
