import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SmartAdvisor © 2024</Text>
      <Text style={styles.subText}>Système de recommandation IA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  text: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 4,
  },
});

export default Footer;