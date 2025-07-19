import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, userAPI, walletAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  balance: 0,
  stats: null,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        balance: action.payload.balance || 0,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        balance: 0,
        stats: null,
        loading: false,
        error: null
      };
    case 'UPDATE_BALANCE':
      return { ...state, balance: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'UPDATE_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Real login function using Spinmax API
  const login = async (phone, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Call Spinmax login API
      const response = await authAPI.login(phone, password);
      
      if (response.requires_otp) {
        // Handle 2FA case - return special response for OTP verification
        dispatch({ type: 'SET_LOADING', payload: false });
        return {
          requires_otp: true,
          user_id: response.user_id,
          message: response.message
        };
      }
      
      if (!response.token || !response.user) {
        throw new Error('Invalid login response from server');
      }

      // Get user's balance
      let balance = 0;
      try {
        balance = await walletAPI.getBalance();
      } catch (balanceError) {
        console.warn('Could not fetch balance:', balanceError.message);
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          balance: balance
        }
      });

      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const register = async (phone, password, referralCode = null) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Call Spinmax register API
      const response = await authAPI.register(phone, password, referralCode);
      
      if (!response.token || !response.user) {
        throw new Error('Invalid registration response from server');
      }

      // Get user's balance
      let balance = 0;
      try {
        balance = await walletAPI.getBalance();
      } catch (balanceError) {
        console.warn('Could not fetch balance:', balanceError.message);
      }
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          balance: balance
        }
      });

      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateBalance = async () => {
    try {
      const balance = await walletAPI.getBalance();
      dispatch({ type: 'UPDATE_BALANCE', payload: balance });
      return balance;
    } catch (error) {
      console.error('Failed to update balance:', error);
      return state.balance;
    }
  };

  const updateUserProfile = async () => {
    try {
      const user = await userAPI.getProfile();
      dispatch({ type: 'UPDATE_USER', payload: user });
      return user;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return state.user;
    }
  };

  const updateStats = async () => {
    try {
      const stats = await userAPI.getStats();
      dispatch({ type: 'UPDATE_STATS', payload: stats });
      return stats;
    } catch (error) {
      console.error('Failed to update stats:', error);
      return state.stats;
    }
  };

  useEffect(() => {
    // Check for existing auth on mount
    const restoreSession = async () => {
      const isAuthenticated = authAPI.isAuthenticated();
      
      if (isAuthenticated) {
        try {
          // Try to fetch user profile to verify token is still valid
          const user = await userAPI.getProfile();
          const balance = await walletAPI.getBalance();
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: user,
              balance: balance
            }
          });
        } catch (error) {
          console.error('Session restore failed:', error);
          // Token is invalid, clear it
          authAPI.logout();
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    restoreSession();
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    updateBalance,
    updateUserProfile,
    updateStats,
    clearError: () => dispatch({ type: 'SET_ERROR', payload: null })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
