// Lottery Service for dynamic lottery management and Spinmax API integration
import { publicLotteryAPI } from './api';

const LOTTERY_STORAGE_KEY = 'lottery_categories';

// Default lottery categories (same as current constants)
const DEFAULT_LOTTERY_CATEGORIES = {
  'หวยยี่กี': {
    icon: '⚡',
    color: 'from-purple-400 to-purple-600',
    types: [
      { name: 'หวยยี่กีห้านาที', drawTime: 'ออกผลทุก 5 นาที' },
      { name: 'หวยยี่กี', drawTime: 'ออกผลทุก 15 นาที' }
    ]
  },
  'หวยไทย': {
    icon: '🇹🇭',
    color: 'from-blue-400 to-blue-600',
    types: [
      { name: 'หวยรัฐบาลไทย', drawTime: '16:00 น.' },
      { name: 'หวยออมสิน', drawTime: '14:30 น.' },
      { name: 'หวย ธ.ก.ส.', drawTime: '14:00 น.' }
    ]
  },
  'หวยลาว': {
    icon: '🇱🇦',
    color: 'from-red-400 to-red-600',
    types: [
      { name: 'หวยลาวพัฒนา', drawTime: '20:30 น.' },
      { name: 'หวยลาววิพากษ์', drawTime: '21:00 น.' },
      { name: 'หวยลาวเคนโซ', drawTime: '19:00 น.' }
    ]
  },
  'หวยฮานอย': {
    icon: '🇻🇳',
    color: 'from-green-400 to-green-600',
    types: [
      { name: 'หวยฮานอยพิเศษ', drawTime: '17:30 น.' },
      { name: 'หวยฮานอยปกติ', drawTime: '18:30 น.' },
      { name: 'หวยฮานอย VIP', drawTime: '19:30 น.' }
    ]
  },
  'หวยหุ้นไทย': {
    icon: '📈',
    color: 'from-orange-400 to-orange-600',
    types: [
      { name: 'หวยหุ้นไทยเช้า', drawTime: '10:00 น.' },
      { name: 'หวยหุ้นไทยเย็น', drawTime: '16:30 น.' },
      { name: 'หวยหุ้นไทยไนท์', drawTime: '20:00 น.' }
    ]
  },
  'หวยหุ้นต่างประเทศ': {
    icon: '🌍',
    color: 'from-indigo-400 to-indigo-600',
    types: [
      { name: 'หวยนิเคอิ', drawTime: '13:20 น.' },
      { name: 'หวยดาวโจนส์', drawTime: '04:30 น.' },
      { name: 'หวยฮั่งเส็ง', drawTime: '14:30 น.' },
      { name: 'หวยจีน', drawTime: '11:00 น.' }
    ]
  }
};

class LotteryService {
  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    const stored = localStorage.getItem(LOTTERY_STORAGE_KEY);
    if (stored) {
      try {
        this.categories = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to load lottery categories:', error);
        this.categories = DEFAULT_LOTTERY_CATEGORIES;
      }
    } else {
      this.categories = DEFAULT_LOTTERY_CATEGORIES;
      this.saveCategories();
    }
  }

  saveCategories() {
    localStorage.setItem(LOTTERY_STORAGE_KEY, JSON.stringify(this.categories));
  }

  getCategories() {
    return this.categories;
  }

  addLotteryToCategory(categoryName, lottery) {
    if (!this.categories[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    // Check if lottery already exists
    const exists = this.categories[categoryName].types.some(
      type => type.name === lottery.name
    );

    if (exists) {
      throw new Error(`Lottery ${lottery.name} already exists in ${categoryName}`);
    }

    this.categories[categoryName].types.push(lottery);
    this.saveCategories();
    return true;
  }

  addNewCategory(categoryName, categoryData) {
    if (this.categories[categoryName]) {
      throw new Error(`Category ${categoryName} already exists`);
    }

    this.categories[categoryName] = {
      icon: categoryData.icon || '🎯',
      color: categoryData.color || 'from-gray-400 to-gray-600',
      types: categoryData.types || []
    };

    this.saveCategories();
    return true;
  }

  updateLottery(categoryName, lotteryName, updates) {
    if (!this.categories[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    const lotteryIndex = this.categories[categoryName].types.findIndex(
      type => type.name === lotteryName
    );

    if (lotteryIndex === -1) {
      throw new Error(`Lottery ${lotteryName} not found in ${categoryName}`);
    }

    this.categories[categoryName].types[lotteryIndex] = {
      ...this.categories[categoryName].types[lotteryIndex],
      ...updates
    };

    this.saveCategories();
    return true;
  }

  deleteLottery(categoryName, lotteryName) {
    if (!this.categories[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    this.categories[categoryName].types = this.categories[categoryName].types.filter(
      type => type.name !== lotteryName
    );

    this.saveCategories();
    return true;
  }

  resetToDefaults() {
    this.categories = DEFAULT_LOTTERY_CATEGORIES;
    this.saveCategories();
    return true;
  }

  // Spinmax API Integration Methods
  async getLotteryTypes() {
    try {
      return await publicLotteryAPI.getTypes();
    } catch (error) {
      console.error('Failed to fetch lottery types from API:', error);
      // Fallback to local categories
      return Object.keys(this.categories).map(name => ({
        id: name,
        name: name,
        ...this.categories[name]
      }));
    }
  }

  async getCurrentRounds() {
    try {
      return await publicLotteryAPI.getCurrentRounds();
    } catch (error) {
      console.error('Failed to fetch current rounds from API:', error);
      return [];
    }
  }

  async getActiveRounds() {
    try {
      return await publicLotteryAPI.getActiveRounds();
    } catch (error) {
      console.error('Failed to fetch active rounds from API:', error);
      return [];
    }
  }

  async getLotteryHistory(page = 1, limit = 20) {
    try {
      return await publicLotteryAPI.getHistory(page, limit);
    } catch (error) {
      console.error('Failed to fetch lottery history from API:', error);
      return { rounds: [], total: 0 };
    }
  }

  async getRoundDetails(roundId) {
    try {
      return await publicLotteryAPI.getRoundDetails(roundId);
    } catch (error) {
      console.error('Failed to fetch round details from API:', error);
      return null;
    }
  }
}

// Create singleton instance
const lotteryService = new LotteryService();

export default lotteryService;