import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return '/api';
  }
  if (Platform.OS === 'android' && !Constants.isDevice) {
    return 'http://10.0.2.2:5000/api';
  }
  const MANUAL_IP = '192.168.1.9';
  return `http://${MANUAL_IP}:5000/api`;
};

export const API_BASE_URL = getApiUrl();

console.log(`🚀 [${Platform.OS}] Backend URL:`, API_BASE_URL);

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  STUDENTS: {
    PROFILE: '/students/profile',
    RATINGS: (id) => `/students/${id}/ratings`,
    HISTORY: '/students/history',
  },
  MODULES: {
    LIST: '/modules',
    DETAIL: (id) => `/modules/${id}`,
    RATE: (id) => `/modules/${id}/rate`,
  },
  RECOMMENDATIONS: {
    LIST: '/recommendations',
    PERSONALIZED: '/recommendations/personalized',
    POPULAR: '/recommendations/popular',
    SIMILAR: (id) => `/recommendations/similar/${id}`,
  }
};