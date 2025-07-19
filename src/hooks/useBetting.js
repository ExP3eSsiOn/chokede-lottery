
// src/hooks/useBetting.js
import { useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';

export const useBetting = () => {
  const { updateBalance } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeBet = async (lotteryRoundId, bets) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.placeBet(lotteryRoundId, bets);
      
      // Update balance after successful bet
      await updateBalance();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBetHistory = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getBetHistory(page, limit);
      return response.data.bets || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getBetDetails = async (betId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getBetDetails(betId);
      return response.bet;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getBetStats = async () => {
    try {
      const response = await apiService.getBetStats();
      return response.stats;
    } catch (err) {
      console.error('Error fetching bet stats:', err);
      return null;
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    placeBet,
    getBetHistory,
    getBetDetails,
    getBetStats,
    clearError
  };
};

export default useBetting;
