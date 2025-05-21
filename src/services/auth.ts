import { LoginCredentials, OTPVerificationData, LoginResponse, User } from '../types';
import { get, post } from './api';

// Auth API endpoints
export const authService = {
  // Request OTP using agent code
  requestOTP: async (credentials: LoginCredentials): Promise<{ success: boolean; message: string }> => {
    return post<{ success: boolean; message: string }>('/auth/request-otp', credentials);
  },

  // Verify OTP and login
  verifyOTP: async (data: OTPVerificationData): Promise<LoginResponse> => {
    const response = await post<LoginResponse>('/auth/verify-otp', data);
    
    // Store token in local storage upon successful login
    if (response.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    return get<User>('/auth/me').then(response => response.data);
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('auth_token');
  },

  // Check if user is authenticated (token exists)
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};