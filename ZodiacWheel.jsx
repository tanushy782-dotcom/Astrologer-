import React from 'react';
import { motion } from 'framer-motion';
import { zodiacSigns } from '../../data/zodiacSigns';
import GlassCard from '../layout/GlassCard';

const ZodiacWheel = ({ onSelect, selectedSign }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-2">
      {zodiacSigns.map((sign, index) => {
        const isSelected = selectedSign === sign.id;

        return (
          <motion.div
            key={sign.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(sign.id)}
            className="aspect-square"
          >
            <GlassCard
              className={`
                w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-purple-600/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                  : 'hover:bg-white/10'
                }
              `}
              padding="p-2"
            >
              <span className="text-3xl filter drop-shadow-md">{sign.symbol}</span>
              <span className="text-[10px] font-medium text-white/80 uppercase tracking-wide">
                {sign.name}
              </span>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ZodiacWheel;
