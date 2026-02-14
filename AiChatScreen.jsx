import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import { aiService } from '../services/aiService';
import CosmicBackground from '../components/ui/CosmicBackground';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';

const AiChatScreen = () => {
  const { userProfile } = useApp();
  const { t, language } = useLanguage();
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([
    { 
      id: 'welcome', 
      text: t('chat.welcome'), 
      isUser: false 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    // Add User Message
    const userMsg = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const context = {
        name: userProfile?.name || 'Friend',
        language: language
      };

      // Get AI Response
      // Pass previous messages as context (limit to last 6 for token efficiency)
      const history = messages.slice(-6);
      const responseText = await aiService.chat(text, history, context);

      const aiMsg = { id: Date.now() + 1, text: responseText, isUser: false };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      const errorMsg = { 
        id: Date.now() + 1, 
        text: t('common.error'), 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#0f0a2e]">
      <CosmicBackground intensity="subtle" />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 z-10 scrollbar-hide">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-white/50 text-xs ml-4 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-[typingBounce_1s_infinite]"></span>
            <span className="w-2 h-2 rounded-full bg-white/50 animate-[typingBounce_1s_infinite_0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-white/50 animate-[typingBounce_1s_infinite_0.4s]"></span>
            <span className="ml-2">{t('chat.typing')}</span>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[var(--bottom-nav-height)] left-0 right-0 z-20">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default AiChatScreen;
