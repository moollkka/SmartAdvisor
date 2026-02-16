import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/context/AuthContext';
import { RecommendationProvider } from './src/context/RecommendationContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <RecommendationProvider>
            <NavigationContainer>
              <StatusBar barStyle="light-content" />
              <AppNavigator />
            </NavigationContainer>
          </RecommendationProvider>
        </AuthProvider>
      </ThemeProvider>
      <FlashMessage position="top" />
    </View>
  );
}