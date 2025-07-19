import React, { createContext, useContext, useState, useEffect } from 'react';

const LotteryContext = createContext();

export const LotteryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('หวยไทย');
  const [selectedLotteryType, setSelectedLotteryType] = useState('หวยรัฐบาลไทย');
  const [timeLeft, setTimeLeft] = useState({ hours: 15, minutes: 32, seconds: 45 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 15, minutes: 32, seconds: 45 }; // Reset timer
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock latest results function
  const getLatestResults = (lotteryType) => {
    const results = {
      'หวยรัฐบาลไทย': { first: '123456', last2: '45', last3front: '123', last3back: '456' },
      'หวยออมสิน': { first: '234567', last2: '67', last3front: '234', last3back: '567' },
      'หวย ธ.ก.ส.': { first: '345678', last2: '78', last3front: '345', last3back: '678' },
      'หวยลาวพัฒนา': { first: '789012', last2: '12', last3front: '789', last3back: '012' },
      'หวยลาววิพากษ์': { first: '890123', last2: '23', last3front: '890', last3back: '123' },
      'หวยลาวเคนโซ': { first: '901234', last2: '34', last3front: '901', last3back: '234' },
      'หวยฮานอยพิเศษ': { first: '345678', last2: '78', last3front: '345', last3back: '678' },
      'หวยฮานอยปกติ': { first: '456789', last2: '89', last3front: '456', last3back: '789' },
      'หวยฮานอย VIP': { first: '567890', last2: '90', last3front: '567', last3back: '890' },
      'หวยหุ้นไทยเช้า': { first: '678901', last2: '01', last3front: '678', last3back: '901' },
      'หวยหุ้นไทยเย็น': { first: '901234', last2: '34', last3front: '901', last3back: '234' },
      'หวยหุ้นไทยไนท์': { first: '012345', last2: '45', last3front: '012', last3back: '345' },
      'หวยนิเคอิ': { first: '567890', last2: '90', last3front: '567', last3back: '890' },
      'หวยดาวโจนส์': { first: '678901', last2: '01', last3front: '678', last3back: '901' },
      'หวยฮั่งเส็ง': { first: '789012', last2: '12', last3front: '789', last3back: '012' },
      'หวยจีน': { first: '890123', last2: '23', last3front: '890', last3back: '123' },
      'หวยยี่กี 5 นาที': { first: '13579', last2: '79', last3front: '135', last3back: '579' },
      'หวยยี่กี 15 นาที': { first: '24680', last2: '80', last3front: '246', last3back: '680' },
      'หวยยี่กี VIP': { first: '11223', last2: '23', last3front: '112', last3back: '223' }
    };
    return results[lotteryType] || results['หวยรัฐบาลไทย'];
  };

  const value = {
    selectedCategory,
    setSelectedCategory,
    selectedLotteryType,
    setSelectedLotteryType,
    timeLeft,
    getLatestResults
  };

  return (
    <LotteryContext.Provider value={value}>
      {children}
    </LotteryContext.Provider>
  );
};

export const useLottery = () => {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error('useLottery must be used within a LotteryProvider');
  }
  return context;
};

export default LotteryContext;