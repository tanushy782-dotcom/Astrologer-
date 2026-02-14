/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – Local Storage Service
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const KEYS = {
  USER_PROFILE: 'palm_reader_user_profile',
  SETTINGS: 'palm_reader_settings',
  ONBOARDING: 'palm_reader_onboarding_complete',
  HISTORY_CHAT: 'palm_reader_chat_history',
  DAILY_READING: 'palm_reader_daily_cache', // Cache to prevent API spam
  PALM_RESULT: 'palm_reader_last_scan',
  TAROT_HISTORY: 'palm_reader_tarot_history'
};

export const storageService = {
  // User Profile
  saveProfile(profile) {
    localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  },
  
  getProfile() {
    const data = localStorage.getItem(KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },

  // Onboarding Status
  setOnboardingComplete() {
    localStorage.setItem(KEYS.ONBOARDING, 'true');
  },

  isOnboardingComplete() {
    return localStorage.getItem(KEYS.ONBOARDING) === 'true';
  },

  // Settings (Language etc.)
  saveSettings(settings) {
    const current = this.getSettings();
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify({ ...current, ...settings }));
  },

  getSettings() {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { language: 'en', theme: 'dark' };
  },

  // Daily Reading Cache (Expires at midnight)
  saveDailyReading(data) {
    const today = new Date().toDateString();
    const payload = { date: today, data };
    localStorage.setItem(KEYS.DAILY_READING, JSON.stringify(payload));
  },

  getDailyReading() {
    const raw = localStorage.getItem(KEYS.DAILY_READING);
    if (!raw) return null;
    
    const parsed = JSON.parse(raw);
    const today = new Date().toDateString();
    
    // Return null if data is from yesterday
    if (parsed.date !== today) {
      localStorage.removeItem(KEYS.DAILY_READING);
      return null;
    }
    return parsed.data;
  },

  // Palm Scan Result
  savePalmResult(result) {
    localStorage.setItem(KEYS.PALM_RESULT, JSON.stringify(result));
  },

  getPalmResult() {
    const data = localStorage.getItem(KEYS.PALM_RESULT);
    return data ? JSON.parse(data) : null;
  },

  // Clear All Data (Privacy Reset)
  clearAll() {
    localStorage.clear();
    window.location.reload();
  }
};
