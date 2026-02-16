import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  primary: {
    backgroundColor: '#2196F3',
  },
  
  secondary: {
    backgroundColor: '#6C757D',
  },
  
  success: {
    backgroundColor: '#4CAF50',
  },
  
  danger: {
    backgroundColor: '#F44336',
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  
  disabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.6,
  },
  
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  outlineText: {
    color: '#2196F3',
  },
  
  disabledText: {
    color: '#9E9E9E',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 'auto',
  },
  
  textButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
});