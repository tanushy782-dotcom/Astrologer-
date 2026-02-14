import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider } from './context/NavigationContext';
import { registerSW } from 'virtual:pwa-register';

/* Styles */
import './index.css';
import './styles/animations.css';

/* PWA Service Worker Registration */
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline work.');
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </AppProvider>
    </LanguageProvider>
  </React.StrictMode>
);
