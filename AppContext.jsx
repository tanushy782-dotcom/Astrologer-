import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  // Initialize App Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = storageService.getProfile();
        const onboardingStatus = storageService.isOnboardingComplete();
        
        if (profile) setUserProfile(profile);
        setIsOnboardingComplete(onboardingStatus);
      } catch (error) {
        console.error('Failed to load app data', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    storageService.saveProfile(profile);
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    storageService.setOnboardingComplete();
  };

  const showSnackbar = (message, duration = 3000) => {
    setSnackbarMessage({ text: message, id: Date.now() });
    setTimeout(() => setSnackbarMessage(null), duration);
  };

  const value = {
    userProfile,
    updateUserProfile,
    isOnboardingComplete,
    completeOnboarding,
    isLoading,
    showExitDialog,
    setShowExitDialog,
    snackbarMessage,
    showSnackbar
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
