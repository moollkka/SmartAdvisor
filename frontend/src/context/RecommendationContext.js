import React, { createContext, useContext, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import recommendationService from '../services/api/recommendationService';

export const RecommendationContext = createContext();
export const useRecommendations = () => useContext(RecommendationContext);
export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [popularModules, setPopularModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const handleError = (error, customMessage) => {
    console.error(customMessage, error);
    showMessage({
      message: customMessage,
      description: error.response?.data?.error || "Connection error",
      type: 'danger',
    });
  };
  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const data = await recommendationService.getRecommendations();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      handleError(error, 'Échec du chargement de la recommandations');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPopularModules = async () => {
    try {
      const data = await recommendationService.getPopularModules();
      setPopularModules(data.popular_modules || []);
    } catch (error) {
      handleError(error, 'Échec du chargement des modules populaires');
    }
  };
  const rateModule = async (moduleId, rating, comment) => {
    try {
      await recommendationService.rateModule(moduleId, rating, comment);
      
      showMessage({
        message: 'Note enregistrée!',
        description: 'Les recommandations seront mises à jour.',
        type: 'success',
      });
      loadPopularModules();
      loadRecommendations();
      return true;
    } catch (error) {
      handleError(error, 'Impossible d enregistrer la note');
      return false;
    }
  };
  const loadPersonalizedRecommendations = async (filters) => {
    try {
      const data = await recommendationService.getPersonalizedRecommendations(filters);
      return data.recommendations || [];
    } catch (error) {
      return [];
    }
  };
  const getSimilarModules = async (moduleId) => {
    try {
      const data = await recommendationService.getSimilarModules(moduleId);
      return data.similar_modules || [];
    } catch (error) {
      return [];
    }
  };
  const loadHistory = async () => {
    try {
      const data = await recommendationService.getHistory();
      setHistory(data.history || []);
    } catch (error) {}
  };
  const clearHistory = async () => {
    try {
      await recommendationService.clearHistory();
      setHistory([]);
    } catch (error) {}
  };
  return (
    <RecommendationContext.Provider
      value={{
        recommendations,
        popularModules,
        isLoading,
        history,
        loadRecommendations,
        loadPersonalizedRecommendations,
        loadPopularModules,
        getSimilarModules,
        rateModule,
        loadHistory,
        clearHistory,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};