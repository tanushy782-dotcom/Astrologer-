import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import GlassCard from '../layout/GlassCard';

const TarotCategoryPicker = ({ onSelect }) => {
  const { t } = useLanguage();

  const categories = [
    { id: 'love', label: t('tarot.cat_love'), icon: '❤️', color: 'bg-red-500/20' },
    { id: 'career', label: t('tarot.cat_career'), icon: '💼', color: 'bg-blue-500/20' },
    { id: 'finance', label: t('tarot.cat_finance'), icon: '💰', color: 'bg-green-500/20' },
    { id: 'growth', label: t('tarot.cat_growth'), icon: '🌱', color: 'bg-purple-500/20' }
  ];

  return (
    <div className="w-full">
      <h3 className="text-center text-white/90 font-medium mb-6">
        {t('tarot.pick_category')}
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(cat.id)}
          >
            <GlassCard 
              hoverEffect 
              className="flex items-center gap-4 p-4 active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${cat.color} backdrop-blur-sm`}>
                {cat.icon}
              </div>
              
              <div className="flex-1">
                <span className="text-lg font-medium text-white">
                  {cat.label}
                </span>
              </div>

              <div className="text-white/40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TarotCategoryPicker;
