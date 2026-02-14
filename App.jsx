import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

/* Contexts & Hooks */
import { useNavigation } from './hooks/useNavigation';
import { useBackHandler } from './hooks/useBackHandler';

/* Components */
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import Snackbar from './components/ui/Snackbar';
import ExitDialog from './components/ui/ExitDialog';
import ScreenTransition from './components/layout/ScreenTransition';

/* Screens */
import SplashScreen from './screens/SplashScreen';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import HomeScreen from './screens/HomeScreen';
import PalmScanScreen from './screens/PalmScanScreen';
import PalmResultScreen from './screens/PalmResultScreen';
import AiChatScreen from './screens/AiChatScreen';
import TarotScreen from './screens/TarotScreen';
import TarotResultScreen from './screens/TarotResultScreen';
import DailyGuidanceScreen from './screens/DailyGuidanceScreen';
import HoroscopeScreen from './screens/HoroscopeScreen';
import LoveReadingScreen from './screens/LoveReadingScreen';
import SettingsScreen from './screens/SettingsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

/* Main Layout Wrapper to handle conditional Headers/Nav */
const AppContent = () => {
  const location = useLocation();
  const { currentScreen } = useNavigation();
  
  // Routes where BottomNav should be visible
  const showNavRoutes = ['/home', '/daily', '/horoscope', '/settings', '/tarot', '/palm', '/love', '/chat'];
  const shouldShowNav = showNavRoutes.some(route => location.pathname.startsWith(route));

  // Routes where Header should be visible
  const hideHeaderRoutes = ['/', '/language', '/onboarding', '/splash'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  // Initialize Back Handler
  useBackHandler();

  return (
    <>
      {shouldShowHeader && <Header />}
      
      <main className={`screen-content ${shouldShowHeader ? 'screen-with-header' : ''} ${shouldShowNav ? 'screen-with-nav' : ''}`}>
        <ScreenTransition>
          <Routes location={location} key={location.pathname}>
            {/* Initial Flow */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/language" element={<LanguageSelectScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/profile" element={<ProfileSetupScreen />} />
            
            {/* Main App */}
            <Route path="/home" element={<HomeScreen />} />
            
            {/* Features */}
            <Route path="/palm" element={<PalmScanScreen />} />
            <Route path="/palm/result" element={<PalmResultScreen />} />
            
            <Route path="/chat" element={<AiChatScreen />} />
            
            <Route path="/tarot" element={<TarotScreen />} />
            <Route path="/tarot/result" element={<TarotResultScreen />} />
            
            <Route path="/daily" element={<DailyGuidanceScreen />} />
            <Route path="/horoscope" element={<HoroscopeScreen />} />
            <Route path="/love" element={<LoveReadingScreen />} />
            
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/privacy" element={<PrivacyPolicyScreen />} />
          </Routes>
        </ScreenTransition>
      </main>

      {shouldShowNav && <BottomNav />}
      
      {/* Global UI Overlays */}
      <Snackbar />
      <ExitDialog />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
