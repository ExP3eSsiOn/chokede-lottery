// src/hooks/useLottery.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useLottery = () => {
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [activeLotteries, setActiveLotteries] = useState([]);
  const [currentLottery, setCurrentLottery] = useState(null);
  const [lotteryHistory, setLotteryHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLotteryData = async () => {
    try {
      setLoading(true);
      const [types, active, current, history] = await Promise.all([
        apiService.getLotteryTypes(),
        apiService.getActiveLotteries(),
        apiService.getCurrentLottery(),
        apiService.getLotteryHistory()
      ]);

      setLotteryTypes(types.types || []);
      setActiveLotteries(active.rounds || []);
      setCurrentLottery(current.rounds?.[0] || null);
      setLotteryHistory(history.rounds || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching lottery data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLotteryResults = async (lotteryType, date = null) => {
    try {
      const response = await apiService.getLotteryResults(lotteryType, date);
      return response.results;
    } catch (err) {
      console.error('Error fetching lottery results:', err);
      return null;
    }
  };

  const refreshLotteryData = () => {
    fetchLotteryData();
  };

  useEffect(() => {
    fetchLotteryData();
  }, []);

  return {
    lotteryTypes,
    activeLotteries,
    currentLottery,
    lotteryHistory,
    loading,
    error,
    getLotteryResults,
    refreshLotteryData
  };
};

export default useLottery;
