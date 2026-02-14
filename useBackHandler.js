import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from './useNavigation';
import { useApp } from '../context/AppContext';

export const useBackHandler = () => {
  const location = useLocation();
  const { goBack } = useNavigation();
  const { showExitDialog, setShowExitDialog } = useApp();

  useEffect(() => {
    // Handle hardware back button (Android) and browser back
    const handlePopState = (event) => {
      // Prevent default browser behavior if we want to handle it manually
      event.preventDefault();

      if (location.pathname === '/home') {
        // If on Home, show exit confirmation instead of going back to splash/intro
        if (!showExitDialog) {
          setShowExitDialog(true);
          // Push state back so the URL doesn't change immediately
          window.history.pushState(null, '', window.location.pathname);
        } else {
          // If dialog is already open, let the browser exit (or close dialog)
          // For PWA, usually we just close the dialog or let it exit
          // Here we chose to close dialog if back is pressed again
          setShowExitDialog(false);
        }
      } else {
        // Normal navigation back
        goBack();
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Push initial state to allow capturing the first back action
    // window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, goBack, showExitDialog, setShowExitDialog]);
};
