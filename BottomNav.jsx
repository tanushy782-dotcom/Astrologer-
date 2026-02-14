import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const BottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/palm', icon: '🖐️', label: 'Palm' },
    { path: '/chat', icon: '🔮', label: 'Chat' },
    { path: '/tarot', icon: '🃏', label: 'Tarot' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] h-[var(--bottom-nav-height)] bg-[#0f0a2e]/90 backdrop-blur-lg border-t border-white/10 pb-safe-bottom">
      <div className="flex items-center justify-around h-full max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300
              ${isActive ? 'text-accent-cyan scale-110' : 'text-white/50 hover:text-white/80'}
            `}
          >
            <span className="text-xl filter drop-shadow-lg">{item.icon}</span>
            {/* Optional label for larger screens, hidden on mobile to save space if needed */}
            <span className="text-[10px] font-medium tracking-wide opacity-80">{item.label}</span>
            
            {/* Active Indicator Dot */}
            <span className={`absolute bottom-1 w-1 h-1 rounded-full bg-accent-cyan transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
