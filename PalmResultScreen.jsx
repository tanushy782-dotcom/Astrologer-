import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { storageService } from '../services/storageService';
import { palmLines } from '../data/palmLines';
import PalmResultCard from '../components/palm/PalmResultCard';
import CosmicBackground from '../components/ui/CosmicBackground';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import ShareButton from '../components/ui/ShareButton';

const PalmResultScreen = () => {
  const { goTo, resetToHome } = useNavigation();
  const { t } = useLanguage();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = storageService.getPalmResult();
    if (!data) {
      goTo('/palm'); // Redirect if no result found
    } else {
      setResult(data);
    }
  }, [goTo]);

  if (!result) return <Loader fullScreen />;

  return (
    <div className="w-full min-h-screen relative pb-28">
      <CosmicBackground intensity="intense" />

      <div className="relative z-10 px-4 pt-6 max-w-md mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto rounded-full border-2 border-accent-cyan/50 p-1 mb-4"
          >
            <div className="w-full h-full rounded-full bg-accent-cyan/10 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(0,210,255,0.3)]">
              ✨
            </div>
          </motion.div>

          <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
            {t('palm.result_title')}
          </h1>
          <p className="text-white/60 text-sm">
            {new Date(result.timestamp).toLocaleDateString()} • {result.hand === 'left' ? t('palm.left_hand') : t('palm.right_hand')}
          </p>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-5 rounded-2xl border border-white/10 shadow-lg"
        >
          <p className="text-white/90 italic leading-relaxed text-center font-medium">
            "{result.summary}"
          </p>
        </motion.div>

        {/* Detailed Lines */}
        <div className="space-y-4">
          {palmLines.map((line, index) => {
            // Map JSON keys (e.g., heartLine) to line IDs
            const key = `${line.id}Line`; 
            const content = result[key];

            if (!content) return null;

            return (
              <PalmResultCard 
                key={line.id}
                title={t(line.nameKey)}
                content={content}
                icon={line.icon}
                color={line.color}
                delay={0.3 + (index * 0.1)}
              />
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={resetToHome} fullWidth>
            {t('common.close')}
          </Button>
          <div className="flex-1">
            <ShareButton 
              className="w-full justify-center h-full bg-white/10 hover:bg-white/20" 
              text={`My Palm Reading: ${result.summary} 🖐️✨ #AIPalmReader`}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PalmResultScreen;
