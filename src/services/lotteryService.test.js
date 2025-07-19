import lotteryService from './lotteryService';

// Basic tests for lottery service
console.log('Testing Lottery Service...');

// Test getting categories
const categories = lotteryService.getCategories();
console.log('Categories:', Object.keys(categories));

// Test adding a new lottery
try {
  lotteryService.addLotteryToCategory('หวยไทย', {
    name: 'หวยพิเศษ',
    drawTime: '15:00 น.'
  });
  console.log('✅ Successfully added new lottery');
} catch (error) {
  console.log('❌ Error adding lottery:', error.message);
}

// Test adding a new category
try {
  lotteryService.addNewCategory('หวยมาเลย์', {
    icon: '🇲🇾',
    color: 'from-yellow-400 to-yellow-600',
    types: [
      { name: 'หวยมาเลย์เช้า', drawTime: '11:00 น.' }
    ]
  });
  console.log('✅ Successfully added new category');
} catch (error) {
  console.log('❌ Error adding category:', error.message);
}

// Verify changes
const updatedCategories = lotteryService.getCategories();
console.log('Updated categories:', Object.keys(updatedCategories));

export default {};