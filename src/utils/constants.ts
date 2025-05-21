/**
 * Application wide constants
 */

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    CURRENT_USER: '/auth/me',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITIES: '/dashboard/activities',
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAILS: (id: string) => `/customers/${id}`,
  },
  POLICIES: {
    LIST: '/policies',
    DETAILS: (id: string) => `/policies/${id}`,
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PERFORMANCE: '/performance',
  QUOTATIONS: '/quotations',
  CUSTOMERS: '/customers',
  LEARNING_CENTER: '/learning-center',
};

// Theme constants
export const THEME = {
  colors: {
    primary: '#00BFB3', // teal
    secondary: '#0064AA', // blue
    accent: '#FF6B00', // orange
    success: '#10B981', // green
    warning: '#F59E0B', // amber
    error: '#EF4444', // red
    info: '#3B82F6', // blue
  },
};