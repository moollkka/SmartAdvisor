export const apiConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || '/api',

  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      profile: '/auth/profile',
    },
    recommendations: {
      base: '/recommendations',
      similar: '/recommendations/similar_students',
      history: '/history',
    },
    students: {
      base: '/students',
      ratings: '/students/:id/ratings',
    },
    modules: {
      base: '/modules',
      search: '/modules/search',
    },
  },

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  timeout: 30000,
};