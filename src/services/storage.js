// src/services/storage.js
class StorageService {
  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
  }

  checkLocalStorageAvailability() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  setItem(key, value) {
    if (!this.isLocalStorageAvailable) {
      console.warn('localStorage is not available');
      return false;
    }

    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    if (!this.isLocalStorageAvailable) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  removeItem(key) {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }

  clear() {
    if (!this.isLocalStorageAvailable) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Specific methods for app data
  setAuthToken(token) {
    return this.setItem('authToken', token);
  }

  getAuthToken() {
    return this.getItem('authToken');
  }

  removeAuthToken() {
    return this.removeItem('authToken');
  }

  setUserPreferences(preferences) {
    return this.setItem('userPreferences', preferences);
  }

  getUserPreferences() {
    return this.getItem('userPreferences', {
      selectedCategory: 'หวยไทย',
      selectedLotteryType: 'หวยรัฐบาลไทย',
      theme: 'light',
      notifications: true
    });
  }

  setBetDrafts(drafts) {
    return this.setItem('betDrafts', drafts);
  }

  getBetDrafts() {
    return this.getItem('betDrafts', []);
  }

  clearBetDrafts() {
    return this.removeItem('betDrafts');
  }
}

export const storageService = new StorageService();
export default StorageService;
