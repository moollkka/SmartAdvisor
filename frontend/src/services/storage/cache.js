import { asyncStorage } from './asyncStorage';

export const cache = {
  set: async (key, value, ttl = 3600000) => { 
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    return await asyncStorage.setItem(`cache_${key}`, item);
  },
  get: async (key) => {
    try {
      const item = await asyncStorage.getItem(`cache_${key}`);
      
      if (!item) {
        return null;
      }
      if (Date.now() > item.expiry) {
        await asyncStorage.removeItem(`cache_${key}`);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Error getting item from cache:', error);
      return null;
    }
  },
  remove: async (key) => {
    return await asyncStorage.removeItem(`cache_${key}`);
  },
  clear: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  },
  has: async (key) => {
    const item = await asyncStorage.getItem(`cache_${key}`);
    return item !== null && Date.now() <= item.expiry;
  }
};