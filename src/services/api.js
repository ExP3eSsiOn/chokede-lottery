// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function for API calls with error handling
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete defaultHeaders['Content-Type'];
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    const data = await response.json();

    // Handle 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    // Network error or JSON parse error
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  register: async (phone, password, referralCode = '') => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        password,
        referral_code: referralCode
      })
    });
    
    // Handle Spinmax server response format
    const token = response.token || response.data?.token || response.data?.access_token;
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    return {
      token,
      user: response.user || response.data?.user,
      message: response.message || response.data?.message
    };
  },

  login: async (phone, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        password
      })
    });
    
    // Handle Spinmax server response format
    const token = response.token || response.data?.token || response.data?.access_token;
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    return {
      token,
      user: response.user || response.data?.user,
      message: response.message || response.data?.message,
      requires_otp: response.requires_otp || response.data?.requires_otp,
      user_id: response.user_id || response.data?.user_id
    };
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// User APIs
export const userAPI = {
  getProfile: async () => {
    const response = await apiCall('/profile');
    return response.user || response.data?.user || response.data;
  },

  updateProfile: async (data) => {
    return await apiCall('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return await apiCall('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        old_password: currentPassword,
        new_password: newPassword
      })
    });
  },

  setWithdrawPIN: async (pin) => {
    return await apiCall('/user/withdraw-pin', {
      method: 'PUT',
      body: JSON.stringify({ pin })
    });
  },

  getStats: async () => {
    return await apiCall('/user/stats');
  }
};

// Wallet APIs
export const walletAPI = {
  getBalance: async () => {
    const response = await apiCall('/wallet/balance');
    return response.balance || response.data?.balance || 0;
  },

  deposit: async (amount, slipImage, bankAccount, referenceNumber) => {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    formData.append('slip_image', slipImage);
    formData.append('bank_account', bankAccount);
    formData.append('reference_number', referenceNumber);

    return await apiCall('/wallet/deposit', {
      method: 'POST',
      body: formData
    });
  },

  withdraw: async (amount, bankAccount, pin) => {
    return await apiCall('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        bank_account: bankAccount,
        pin
      })
    });
  },

  transfer: async (toPhone, amount, pin) => {
    return await apiCall('/wallet/transfer', {
      method: 'POST',
      body: JSON.stringify({
        to_phone: toPhone,
        amount,
        pin
      })
    });
  },

  getTransactions: async (page = 1, limit = 20) => {
    const response = await apiCall(`/wallet/transactions?page=${page}&limit=${limit}`);
    return response.data || response;
  }
};

// Public Lottery APIs (no auth required)
export const publicLotteryAPI = {
  getTypes: async () => {
    const response = await apiCall('/public/lottery/types');
    return response.types || response.data?.types || response.data || [];
  },

  getCurrentRounds: async () => {
    const response = await apiCall('/public/lottery/current');
    return response.rounds || response.data?.rounds || response.data || [];
  },

  getActiveRounds: async () => {
    const response = await apiCall('/public/lottery/active');
    return response.rounds || response.data?.rounds || response.data || [];
  },

  getHistory: async (page = 1, limit = 20) => {
    const response = await apiCall(`/public/lottery/history?page=${page}&limit=${limit}`);
    return response.data || response;
  },

  getRoundDetails: async (roundId) => {
    const response = await apiCall(`/public/lottery/${roundId}`);
    return response.data || response;
  }
};

// Betting APIs
export const bettingAPI = {
  placeBet: async (lotteryRoundId, bets) => {
    return await apiCall('/bet/place', {
      method: 'POST',
      body: JSON.stringify({
        lottery_round_id: lotteryRoundId,
        bets: bets.map(bet => ({
          number: bet.number,
          bet_type: bet.bet_type || bet.type,
          amount: bet.amount
        }))
      })
    });
  },

  getHistory: async (page = 1, limit = 20) => {
    const response = await apiCall(`/bet/history?page=${page}&limit=${limit}`);
    return response.data || response;
  },

  getBetDetails: async (betId) => {
    const response = await apiCall(`/bet/${betId}`);
    return response.data || response;
  },

  getBetsByRound: async (roundId) => {
    const response = await apiCall(`/bet/round/${roundId}`);
    return response.data || response;
  },

  getStats: async () => {
    const response = await apiCall('/bet/stats');
    return response.data || response;
  }
};

export default {
  auth: authAPI,
  user: userAPI,
  wallet: walletAPI,
  lottery: publicLotteryAPI,
  betting: bettingAPI
};