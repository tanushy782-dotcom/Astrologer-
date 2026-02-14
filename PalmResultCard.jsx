import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../layout/GlassCard';

const PalmResultCard = ({ title, content, icon, color = '#ffffff', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="w-full"
    >
      <GlassCard className="h-full border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-start gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {icon}
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1" style={{ color: color }}>
              {title}
            </h4>
            <p className="text-white/80 text-sm leading-relaxed">
              {content || "No details detected."}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default PalmResultCard;
