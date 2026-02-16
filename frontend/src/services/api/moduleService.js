import { apiClient } from './apiClient';
import { ENDPOINTS } from '../../../utils/constants/endpoints';

export const moduleService = {
  getAllModules: async () => {
    return await apiClient.get(ENDPOINTS.MODULES);
  },
  getModule: async (moduleId) => {
    return await apiClient.get(`${ENDPOINTS.MODULES}/${moduleId}`);
  },
  getModulesBySpecialization: async (specialization) => {
    return await apiClient.get(`${ENDPOINTS.MODULES}/specialisation/${specialization}`);
  },
  searchModules: async (query) => {
    return await apiClient.get(`${ENDPOINTS.MODULES}/search?q=${query}`);
  },
};