import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../styles/themes';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const defaultMode = colorScheme === 'dark' ? 'dark' : 'light';
  const [theme, setTheme] = useState(defaultMode === 'dark' ? darkTheme : lightTheme);
  const [themeMode, setThemeMode] = useState(defaultMode);
  useEffect(() => {
    loadThemePreference();
  }, []);
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setThemeMode(savedTheme);
        setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du thème :', error);
    }
  };

  const toggleTheme = async () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    const newTheme = newThemeMode === 'dark' ? darkTheme : lightTheme;

    setThemeMode(newThemeMode);
    setTheme(newTheme);

    try {
      await AsyncStorage.setItem('theme', newThemeMode);
    } catch (error) {
      console.error('Erreur lors de l enregistrement du thème :', error);
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};