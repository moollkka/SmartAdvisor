export const APP_CONSTANTS = {
  APP_NAME: 'SmartAdvisor',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@smartadvisor.com',
  DEFAULT_RECOMMENDATION_LIMIT: 5,
  MAX_RECOMMENDATION_LIMIT: 20,
  CACHE_DURATION: 5 * 60 * 1000,
  NOTIFICATION_DELAY: 5000,
};

export const MODULE_TYPES = {
  COURS: 'cours',
  STAGE: 'stage',
  PROJET: 'projet',
  TD: 'td',
  TP: 'tp',
};

export const RECOMMENDATION_TYPES = {
  SIMILAR_STUDENTS: 'similar_students',
  CONTENT_BASED: 'content_based',
  COLLABORATIVE: 'collaborative',
  HYBRID: 'hybrid',
};