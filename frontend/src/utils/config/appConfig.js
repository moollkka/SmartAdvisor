import { APP_CONSTANTS } from '../constants/appConstants';

export const appConfig = {
  name: APP_CONSTANTS.APP_NAME,
  version: APP_CONSTANTS.VERSION,
    api: {
    timeout: 30000,
    retryAttempts: 3,
  },
  recommendations: {
    defaultLimit: APP_CONSTANTS.DEFAULT_RECOMMENDATION_LIMIT,
    maxLimit: APP_CONSTANTS.MAX_RECOMMENDATION_LIMIT,
    cacheDuration: APP_CONSTANTS.CACHE_DURATION,
  },
  theme: {
    default: 'light',
    supported: ['light', 'dark', 'system'],
  },
  features: {
    notifications: true,
    caching: true,
    analytics: false,
  },
};