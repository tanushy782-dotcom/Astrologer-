import React from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`
          max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed relative shadow-md
          ${isUser 
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-none' 
            : 'bg-white/10 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-none'
          }
        `}
      >
        {/* Avatar / Icon */}
        {!isUser && (
          <div className="absolute -left-8 bottom-0 w-6 h-6 rounded-full bg-indigo-900/50 flex items-center justify-center text-xs border border-white/20">
            🔮
          </div>
        )}
        
        {/* Message Content */}
        <div className="whitespace-pre-wrap">{message}</div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
