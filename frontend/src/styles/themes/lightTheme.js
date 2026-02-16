const lightTheme = {
  colors: {
    primary: '#4361ee',
    secondary: '#3a0ca3',
    success: '#4cc9f0',
    danger: '#f72585',
    warning: '#f8961e',
    info: '#7209b7',
    
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    notification: '#ff6b6b',
    
    gray: '#adb5bd',
    lightGray: '#e9ecef',
    darkGray: '#495057',
    
    white: '#ffffff',
    black: '#000000',
    
    overlay: 'rgba(0, 0, 0, 0.5)',
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
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export default lightTheme;