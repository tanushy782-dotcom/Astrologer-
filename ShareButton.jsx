import React, { useState } from 'react';
import { shareContent } from '../../utils/helpers';
import { useLanguage } from '../../hooks/useLanguage';
import { useApp } from '../../context/AppContext';

const ShareButton = ({ title, text, className = '' }) => {
  const { t } = useLanguage();
  const { showSnackbar } = useApp();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    const result = await shareContent(
      title || 'AI Palm Reader 🔮',
      text || t('daily.share_msg')
    );
    setIsSharing(false);

    if (result === 'copied') {
      showSnackbar('Link copied to clipboard!');
    } else if (result === false) {
      // Optional: Handle error silently or show toast
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full 
        bg-white/5 border border-white/10 hover:bg-white/10 
        transition-all active:scale-95 text-sm text-white/80
        ${className}
      `}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      <span>{t('common.share')}</span>
    </button>
  );
};

export default ShareButton;
