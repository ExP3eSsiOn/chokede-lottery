// Test utility to verify Spinmax server connection
import { publicLotteryAPI } from '../services/api';

export const testSpinmaxConnection = async () => {
  const results = {
    server_status: 'unknown',
    endpoints: {},
    timestamp: new Date().toISOString()
  };

  console.log('🚀 Testing Spinmax server connection...');

  try {
    // Test public endpoints (no auth required)
    console.log('📋 Testing lottery types endpoint...');
    const types = await publicLotteryAPI.getTypes();
    results.endpoints.lottery_types = {
      status: 'success',
      data_count: Array.isArray(types) ? types.length : 0,
      response: types
    };
    console.log('✅ Lottery types:', types);

    console.log('🎯 Testing current rounds endpoint...');
    const currentRounds = await publicLotteryAPI.getCurrentRounds();
    results.endpoints.current_rounds = {
      status: 'success',
      data_count: Array.isArray(currentRounds) ? currentRounds.length : 0,
      response: currentRounds
    };
    console.log('✅ Current rounds:', currentRounds);

    console.log('🏃 Testing active rounds endpoint...');
    const activeRounds = await publicLotteryAPI.getActiveRounds();
    results.endpoints.active_rounds = {
      status: 'success',
      data_count: Array.isArray(activeRounds) ? activeRounds.length : 0,
      response: activeRounds
    };
    console.log('✅ Active rounds:', activeRounds);

    results.server_status = 'connected';
    console.log('🎉 All public endpoints working successfully!');

  } catch (error) {
    console.error('❌ Connection test failed:', error);
    results.server_status = 'failed';
    results.error = {
      message: error.message,
      stack: error.stack
    };
  }

  return results;
};

export const testAuthentication = async (phone, password) => {
  console.log('🔐 Testing authentication...');
  
  try {
    const { authAPI } = await import('../services/api');
    const response = await authAPI.login(phone, password);
    
    console.log('✅ Authentication successful:', response);
    return {
      status: 'success',
      response: response,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    return {
      status: 'failed',
      error: {
        message: error.message,
        stack: error.stack
      },
      timestamp: new Date().toISOString()
    };
  }
};

// Usage in browser console:
// import { testSpinmaxConnection, testAuthentication } from './src/utils/testConnection.js';
// testSpinmaxConnection().then(console.log);
// testAuthentication('0812345678', 'password123').then(console.log);