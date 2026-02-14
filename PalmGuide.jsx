import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

const PalmGuide = () => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, text: t('palm.guide_step1'), icon: '💡' },
    { id: 2, text: t('palm.guide_step2'), icon: '⬜' },
    { id: 3, text: t('palm.guide_step3'), icon: '🖐️' }
  ];

  return (
    <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 mt-6">
      <h4 className="text-white/90 font-medium mb-3 flex items-center gap-2">
        <span className="text-accent-yellow">ℹ️</span> {t('palm.guide_title')}
      </h4>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 text-sm text-white/70"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs">
              {step.id}
            </div>
            <span>{step.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PalmGuide;
