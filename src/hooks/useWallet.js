// src/hooks/useWallet.js
import { useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from './useAuth';

export const useWallet = () => {
  const { updateBalance } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deposit = async (amount, bankAccount, referenceNumber) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.deposit(amount, bankAccount, referenceNumber);
      
      // Update balance if successful
      await updateBalance();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amount, bankAccount, pin) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.withdraw(amount, bankAccount, pin);
      
      // Update balance if successful
      await updateBalance();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (toPhone, amount, note = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.transfer(toPhone, amount, note);
      
      // Update balance if successful
      await updateBalance();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async (page = 1, limit = 20, type = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getTransactions(page, limit, type);
      return response.data.transactions || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    deposit,
    withdraw,
    transfer,
    getTransactions,
    clearError
  };
};

export default useWallet;
