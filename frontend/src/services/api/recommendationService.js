import apiClient from './apiClient';

const recommendationService = {
  getRecommendations: async (n = 5) => {
    const response = await apiClient.get(`/recommendations?n=${n}`);
    return response.data;
  },
  getPopularModules: async () => {
    const response = await apiClient.get('/recommendations/popular');
    return response.data;
  },
  getPersonalizedRecommendations: async (filters) => {
    const params = new URLSearchParams();
    if (filters.field) params.append('field', filters.field);
    if (filters.level) params.append('level', filters.level);
    const response = await apiClient.get(`/recommendations/personalized?${params.toString()}`);
    return response.data;
  },
  getSimilarModules: async (moduleId, n = 5) => {
    const response = await apiClient.get(`/recommendations/similar/${moduleId}?n=${n}`);
    return response.data;
  },
  rateModule: async (moduleId, rating, comment) => {
    const response = await apiClient.post('/modules/rate', {
      module_id: moduleId,
      rating: rating,
      comment: comment
    });
    return response.data;
  },
  getHistory: async () => {
    const response = await apiClient.get('/history');
    return response.data;
  },

  clearHistory: async () => {
    const response = await apiClient.delete('/history');
    return response.data;
  }
};

export default recommendationService;