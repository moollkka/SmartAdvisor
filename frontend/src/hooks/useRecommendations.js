import { useState, useCallback } from 'react';
import { recommendationService } from '../services/api/recommendationService';
import { cache } from '../services/storage/cache';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadRecommendations = useCallback(async (studentId, limit = 5) => {
    try {
      setLoading(true);
      setError(null);
      const cacheKey = `recommendations_${studentId}_${limit}`;
      const cachedData = cache.get(cacheKey);

      if (cachedData) {
        setRecommendations(cachedData);
        setLoading(false);
        return cachedData;
      }
      const response = await recommendationService.getRecommendations(studentId, limit);
      if (response.success) {
        setRecommendations(response.recommendations);
        cache.set(cacheKey, response.recommendations);
        return response.recommendations;
      } else {
        throw new Error(response.error || 'Erreur lors du chargement des recommandations');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const refreshRecommendations = useCallback(async (studentId, limit = 5) => {
    const cacheKey = `recommendations_${studentId}_${limit}`;
    cache.remove(cacheKey);
    return await loadRecommendations(studentId, limit);
  }, [loadRecommendations]);
  return {
    recommendations,
    loading,
    error,
    loadRecommendations,
    refreshRecommendations,
  };
};