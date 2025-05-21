import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials, OTPVerificationData } from '../types';
import { services } from '../services';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  verifyOTP: (data: OTPVerificationData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => false,
  verifyOTP: async () => false,
  logout: () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check for existing authentication
  useEffect(() => {
    const checkAuth = async () => {
      if (services.auth.isAuthenticated()) {
        try {
          const user = await services.auth.getCurrentUser();
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Failed to fetch user:', error);
          services.auth.logout(); // Clear invalid token
          setState({
            ...initialState,
            isLoading: false,
          });
        }
      } else {
        setState({
          ...initialState,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  // Request OTP for login
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await services.auth.requestOTP(credentials);
      setState(prev => ({ ...prev, isLoading: false }));
      return true;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to send OTP',
      }));
      return false;
    }
  };

  // Verify OTP and complete login
  const verifyOTP = async (data: OTPVerificationData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await services.auth.verifyOTP(data);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Invalid OTP',
      }));
      return false;
    }
  };

  // Logout
  const logout = () => {
    services.auth.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Clear any auth errors
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        verifyOTP,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);