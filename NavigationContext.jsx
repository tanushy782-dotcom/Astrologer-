import React, { createContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState('forward'); // 'forward' or 'back'

  const goBack = () => {
    setDirection('back');
    // Check if we can go back, otherwise go home
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/home', { replace: true });
    }
  };

  const goTo = (path, options = {}) => {
    setDirection('forward');
    navigate(path, options);
  };

  const resetToHome = () => {
    setDirection('back');
    navigate('/home', { replace: true });
  };

  const value = {
    currentScreen: location.pathname,
    direction,
    goBack,
    goTo,
    resetToHome
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};
