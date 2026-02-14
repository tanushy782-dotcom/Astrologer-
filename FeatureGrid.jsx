import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import GlassCard from '../layout/GlassCard';

const FeatureGrid = () => {
  const { goTo } = useNavigation();
  const { t } = useLanguage();

  const features = [
    {
      id: 'palm',
      title: t('home.features.palm'),
      icon: '🖐️',
      path: '/palm',
      color: 'from-purple-500/20 to-blue-500/20',
      delay: 0.1
    },
    {
      id: 'tarot',
      title: t('home.features.tarot'),
      icon: '🃏',
      path: '/tarot',
      color: 'from-pink-500/20 to-purple-500/20',
      delay: 0.2
    },
    {
      id: 'horoscope',
      title: t('home.features.horoscope'),
      icon: '♈',
      path: '/horoscope',
      color: 'from-blue-500/20 to-cyan-500/20',
      delay: 0.3
    },
    {
      id: 'daily',
      title: t('home.features.daily'),
      icon: '✨',
      path: '/daily',
      color: 'from-yellow-500/20 to-orange-500/20',
      delay: 0.4
    },
    {
      id: 'love',
      title: t('home.features.love'),
      icon: '💜',
      path: '/love',
      color: 'from-red-500/20 to-pink-500/20',
      delay: 0.5
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: feature.delay }}
          onClick={() => goTo(feature.path)}
        >
          <GlassCard 
            hoverEffect 
            className={`
              h-32 flex flex-col items-center justify-center gap-3 text-center
              bg-gradient-to-br ${feature.color} border-white/10
            `}
          >
            <span className="text-4xl filter drop-shadow-md">{feature.icon}</span>
            <span className="text-sm font-medium text-white/90">{feature.title}</span>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureGrid;
