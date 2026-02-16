import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorMessage = ({ message, onRetry, retryText = 'Réessayer' }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={48} color="#F44336" />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  message: {
    color: '#C62828',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ErrorMessage;