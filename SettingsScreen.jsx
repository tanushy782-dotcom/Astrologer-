import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../hooks/useLanguage';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';
import Button from '../components/ui/Button';

const SettingsScreen = () => {
  const { goTo } = useNavigation();
  const { t, changeLanguage, language } = useLanguage();
  const { userProfile } = useApp();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete your profile and history.")) {
      storageService.clearAll();
    }
  };

  return (
    <div className="w-full min-h-screen relative pb-24">
      <CosmicBackground intensity="subtle" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-6 space-y-6">
        
        <h1 className="text-2xl font-display font-bold text-white mb-4">
          {t('settings.title')}
        </h1>

        {/* Profile Section */}
        <GlassCard className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium">{userProfile?.name || 'User'}</h3>
            <p className="text-white/50 text-xs">
              {userProfile?.dob ? `Born: ${userProfile.dob}` : 'Profile Incomplete'}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => goTo('/profile')}
          >
            Edit
          </Button>
        </GlassCard>

        {/* Preferences */}
        <div className="space-y-3">
          <h4 className="text-white/50 text-xs uppercase tracking-wider ml-2">
            Preferences
          </h4>
          
          <GlassCard className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">{t('settings.language')}</span>
              <select 
                value={language} 
                onChange={handleLanguageChange}
                className="w-auto py-1 px-3 text-sm bg-white/10 border-white/10 rounded-lg text-white focus:ring-purple-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="it">Italian</option>
                <option value="ko">Korean</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Dark Mode</span>
              <div className="w-10 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h4 className="text-white/50 text-xs uppercase tracking-wider ml-2">
            About
          </h4>
          
          <GlassCard className="divide-y divide-white/10">
            <button 
              className="w-full text-left p-4 text-white text-sm hover:bg-white/5 transition-colors flex justify-between"
              onClick={() => goTo('/privacy')}
            >
              {t('settings.privacy')}
              <span className="text-white/30">→</span>
            </button>
            
            <button 
              className="w-full text-left p-4 text-white text-sm hover:bg-white/5 transition-colors flex justify-between"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.aipalmreader', '_blank')}
            >
              {t('settings.rate_app')}
              <span className="text-white/30">★</span>
            </button>
            
            <button 
              className="w-full text-left p-4 text-red-300 text-sm hover:bg-red-500/10 transition-colors flex justify-between"
              onClick={handleClearData}
            >
              Reset Data
              <span className="text-red-300/50">🗑️</span>
            </button>
          </GlassCard>
        </div>

        <div className="text-center pt-6">
           <p className="text-white/20 text-xs">
             v1.0.0 • Made with Stardust ✨
           </p>
        </div>

      </div>
    </div>
  );
};

export default SettingsScreen;
