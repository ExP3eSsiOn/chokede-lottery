import lotteryService from '../services/lotteryService';

// Get dynamic lottery categories
export const getLotteryCategories = () => {
  return lotteryService.getCategories();
};

// For backward compatibility, export a static snapshot
// Components should use getLotteryCategories() for dynamic data
export const LOTTERY_CATEGORIES = getLotteryCategories();

export const BET_CATEGORIES = {
  'เลข 3 ตัว': {
    icon: '🎯',
    color: 'bg-blue-500',
    types: ['3ตัวบน', '3ตัวหน้า', '3ตัวท้าย', '3ตัวโต๊ด'],
    maxDigits: 3
  },
  'เลข 2 ตัว': {
    icon: '🎲',
    color: 'bg-green-500',
    types: ['2ตัวบน', '2ตัวล่าง'],
    maxDigits: 2
  },
  'เลขวิ่ง': {
    icon: '🏃',
    color: 'bg-orange-500',
    types: ['วิ่งบน', 'วิ่งล่าง'],
    maxDigits: 1
  }
};
