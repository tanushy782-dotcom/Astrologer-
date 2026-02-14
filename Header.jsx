import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const { goBack, currentScreen } = useNavigation();
  const { t } = useLanguage();
  const location = useLocation();

  const isHome = location.pathname === '/home';
  const showBack = !isHome;

  const getTitle = () => {
    switch(location.pathname) {
      case '/home': return t('common.appName');
      case '/palm': return t('palm.title');
      case '/tarot': return t('tarot.title');
      case '/daily': return t('daily.title');
      case '/horoscope': return t('horoscope.title');
      case '/love': return t('home.features.love');
      case '/chat': return t('chat.title');
      case '/settings': return t('settings.title');
      case '/profile': return t('profile.title');
      default: return '';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-[var(--header-height)] px-4 flex items-center justify-between bg-[#0f0a2e]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={goBack}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
            aria-label={t('common.back')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        
        <h1 className={`text-lg font-display font-bold text-white tracking-wide ${!showBack ? 'ml-2' : ''}`}>
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Profile Avatar (Placeholder) */}
        {isHome && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-[#0f0a2e] flex items-center justify-center text-xs">
              User
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
