import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';
import Button from '../components/ui/Button';

const PrivacyPolicyScreen = () => {
  const { goBack } = useNavigation();
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen relative pb-24 bg-[#0f0a2e]">
      <CosmicBackground intensity="subtle" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 flex flex-col h-full">
        
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={goBack}>
            ← Back
          </Button>
          <h1 className="text-xl font-display font-bold text-white">
            {t('settings.privacy')}
          </h1>
        </div>

        <GlassCard className="flex-1 overflow-y-auto p-6 text-white/80 text-sm leading-relaxed space-y-4 max-h-[70vh]">
          <h3 className="text-white font-bold text-lg">Your Privacy Matters</h3>
          <p>
            At AI Palm Reader, we take your privacy seriously. This policy explains how we handle your data.
          </p>

          <h4 className="text-white font-bold mt-4">1. Data Collection</h4>
          <p>
            We collect personal information such as your name, date of birth, and gender solely for the purpose of personalizing your astrology and tarot readings.
          </p>
          <p>
            Images of your palm are processed in real-time by our AI and are <strong>not stored permanently</strong> on our servers. They are discarded immediately after analysis.
          </p>

          <h4 className="text-white font-bold mt-4">2. Local Storage</h4>
          <p>
            Your profile data and history are stored locally on your device using local storage. This ensures that you have full control over your data.
          </p>

          <h4 className="text-white font-bold mt-4">3. Third-Party Services</h4>
          <p>
            We use OpenRouter AI to generate interpretations. Anonymized prompts are sent to the AI service to retrieve readings. No personally identifiable information (PII) is shared beyond what is necessary for the reading (e.g., first name).
          </p>

          <h4 className="text-white font-bold mt-4">4. No Medical Advice</h4>
          <p>
            This app is for entertainment and spiritual reflection only. It is not a substitute for professional medical, legal, or financial advice.
          </p>

          <div className="pt-6 text-xs text-white/40 border-t border-white/10 mt-6">
            Last Updated: October 2023
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default PrivacyPolicyScreen;
