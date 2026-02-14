import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import GlassCard from '../layout/GlassCard';

const HandSelector = ({ selectedHand, onSelect }) => {
  const { t } = useLanguage();

  const hands = [
    { id: 'left', label: t('palm.left_hand'), desc: t('palm.left_desc'), icon: '✋' },
    { id: 'right', label: t('palm.right_hand'), desc: t('palm.right_desc'), icon: '🤚' }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-white text-lg font-medium text-center mb-2">
        {t('palm.choose_hand')}
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {hands.map((hand) => {
          const isSelected = selectedHand === hand.id;
          
          return (
            <motion.div
              key={hand.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(hand.id)}
            >
              <GlassCard
                className={`
                  h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300
                  ${isSelected ? 'bg-accent-blue/20 border-accent-cyan shadow-glow-cyan' : 'bg-white/5 border-white/10 hover:bg-white/10'}
                `}
              >
                <span className="text-4xl mb-3">{hand.icon}</span>
                <span className={`font-bold mb-1 ${isSelected ? 'text-accent-cyan' : 'text-white'}`}>
                  {hand.label}
                </span>
                <span className="text-xs text-white/60 leading-tight">
                  {hand.desc}
                </span>
                
                {/* Checkmark for selected */}
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 text-accent-cyan"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HandSelector;
