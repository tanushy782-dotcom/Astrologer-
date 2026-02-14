/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔮 AI Palm Reader – Theme Configuration
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const theme = {
  colors: {
    /* Core Backgrounds */
    bgPrimary: '#0f0a2e',
    bgSecondary: '#1a1145',
    bgTertiary: '#251760',

    /* Text */
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    textMuted: 'rgba(255, 255, 255, 0.35)',

    /* Accents */
    cyan: '#00d2ff',
    blue: '#667eea',
    purple: '#764ba2',
    violet: '#c471f5',
    pink: '#f093fb',
    warm: '#f5576c',
    gold: '#ffd700',
    green: '#00e676',

    /* Glows */
    glowCyan: 'rgba(0, 210, 255, 0.3)',
    glowPurple: 'rgba(118, 75, 162, 0.3)',
    glowBlue: 'rgba(102, 126, 234, 0.3)',
    glowPink: 'rgba(240, 147, 251, 0.2)',

    /* Glass */
    glassBg: 'rgba(255, 255, 255, 0.06)',
    glassBgHover: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBorderHover: 'rgba(255, 255, 255, 0.2)',
  },

  gradients: {
    cosmic: 'linear-gradient(135deg, #0f0a2e 0%, #1a1145 30%, #2d1b69 60%, #1a1145 100%)',
    card: 'linear-gradient(135deg, rgba(45, 27, 105, 0.4) 0%, rgba(26, 17, 69, 0.6) 100%)',
    accent: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    button: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    buttonHover: 'linear-gradient(135deg, #7b8eef 0%, #8a5bb5 100%)',
    glow: 'linear-gradient(135deg, #00d2ff 0%, #7b2ff7 50%, #c471f5 100%)',
    warm: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gold: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
    green: 'linear-gradient(135deg, #00e676 0%, #00b0ff 100%)',
    dark: 'linear-gradient(180deg, rgba(15, 10, 46, 0) 0%, rgba(15, 10, 46, 0.95) 100%)',
  },

  glass: {
    background: 'rgba(255, 255, 255, 0.06)',
    backgroundHover: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderHover: '1px solid rgba(255, 255, 255, 0.2)',
    blur: 'blur(16px)',
    blurHeavy: 'blur(24px)',
  },

  radius: {
    sm: '12px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },

  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
    md: '0 4px 16px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
    glowCyan: '0 0 20px rgba(0, 210, 255, 0.2), 0 0 40px rgba(0, 210, 255, 0.1)',
    glowPurple: '0 0 20px rgba(118, 75, 162, 0.3), 0 0 40px rgba(118, 75, 162, 0.15)',
    glowAccent: '0 0 20px rgba(102, 126, 234, 0.3), 0 0 40px rgba(118, 75, 162, 0.2)',
  },

  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Cinzel', Georgia, serif",
  },

  fontSize: {
    xs: '0.7rem',
    sm: '0.8rem',
    base: '0.95rem',
    md: '1.05rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.85rem',
    '3xl': '2.25rem',
    '4xl': '2.75rem',
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  zIndex: {
    base: 1,
    card: 10,
    header: 100,
    nav: 100,
    modal: 500,
    snackbar: 600,
    overlay: 900,
    top: 1000,
  },

  layout: {
    maxWidth: '480px',
    headerHeight: '56px',
    bottomNavHeight: '64px',
  },

  /* Feature Icons Emoji Map */
  featureIcons: {
    palmScan: '🖐️',
    tarot: '🃏',
    love: '💜',
    daily: '🌟',
    horoscope: '♈',
    chat: '🔮',
    settings: '⚙️',
  },

  /* Zodiac Emojis */
  zodiacEmojis: {
    aries: '♈',
    taurus: '♉',
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓',
  },
};

export default theme;
