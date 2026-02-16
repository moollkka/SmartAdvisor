import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  
  inputFocused: {
    borderColor: '#2196F3',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  
  inputError: {
    borderColor: '#F44336',
  },
  
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 4,
  },
  
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  outlined: {
    backgroundColor: 'transparent',
  },
  
  filled: {
    backgroundColor: '#F5F5F5',
    borderColor: 'transparent',
  },
  small: {
    padding: 8,
    fontSize: 14,
  },
  
  large: {
    padding: 16,
    fontSize: 18,
  },
});