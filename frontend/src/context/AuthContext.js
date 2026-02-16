import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import apiClient from '../services/api/apiClient';
import { API_BASE_URL } from '../utils/constants/endpoints';
export const AuthContext = createContext();
const STORAGE_KEYS = {
  TOKEN: 'user_token',
  USER: 'user_profile',
};
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    checkAuthStatus();
  }, []);
  const checkAuthStatus = async () => {
    try {
      const [token, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erreur de vérification d authentification:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`${API_BASE_URL}/auth/login`, {
        email: email.trim(),
        password: password
      });
      const { token, user } = response.data;
      if (!token) throw new Error('Aucun jeton reçu');
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
      ]);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      showMessage({ message: `La connexion a échoué: ${message}`, type: 'danger' });
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (userData) => {
    try {
      setIsLoading(true);
      await apiClient.post(`${API_BASE_URL}/auth/register`, {
        email: userData.email.trim(),
        password: userData.password,
        prenom: userData.firstName.trim(),
        nom: userData.lastName.trim(),
        specialite: userData.specialization || ''
      });
      return await login(userData.email, userData.password);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      showMessage({ message: message, type: 'danger' });
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
      delete apiClient.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateProfile = async (profileData) => {
    try {
      setUser(profileData); 
      await apiClient.put(`${API_BASE_URL}/students/profile`, {
        specialite: profileData.specialite,
        moyenne: profileData.moyenne,
        age: profileData.age
      });
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profileData));
      
      showMessage({ message: 'Profil mis à jour avec succès!', type: 'success' });
      return { success: true };
    } catch (error) {
      console.error(error);
      showMessage({ message: 'Échec de la mise à jour du profil sur le serveur', type: 'warning' });
      return { success: true }; 
    }
  };
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};