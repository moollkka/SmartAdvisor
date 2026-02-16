import apiClient from './apiClient';

const authService = {
  login: (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },
  
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },
  
  logout: () => {
    return apiClient.post('/auth/logout');
  },
  
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },
  
  updateProfile: (profileData) => {
    return apiClient.put('/students/profile', profileData);
  },
};

export default authService;