const darkTheme = {
  colors: {
    primary: '#5a6dff',
    secondary: '#4d1ca3',
    success: '#5cd9f0',
    danger: '#ff2d95',
    warning: '#ffa726',
    info: '#8a2be2',
    
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#2d2d2d',
    notification: '#ff6b6b',
    
    gray: '#757575',
    lightGray: '#2d2d2d',
    darkGray: '#e0e0e0',
    
    white: '#ffffff',
    black: '#000000',
    
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
  },
};

export default darkTheme;