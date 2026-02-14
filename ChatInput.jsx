import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const ChatInput = ({ onSend, disabled = false }) => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-2 bg-white/5 backdrop-blur-lg border-t border-white/10"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t('home.chat_placeholder')}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-black/20 text-white placeholder-white/40 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 border border-transparent focus:border-purple-500/30 max-h-[100px] overflow-y-auto scrollbar-hide text-sm"
      />
      
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className={`
          w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
          ${text.trim() && !disabled
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95' 
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }
        `}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
