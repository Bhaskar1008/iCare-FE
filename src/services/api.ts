import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { config } from '../config/environment';
import { APIError, APIResponse } from '../types';

const baseURL = config.apiUrl;

// Create axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError: APIError = {
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response?.status,
    };

    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    return Promise.reject(customError);
  }
);

// Generic request function with type safety
export const request = async <T>(
  config: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};

// Typed request methods
export const get = <T>(url: string, params = {}) =>
  request<T>({ method: 'GET', url, params });

export const post = <T>(url: string, data = {}) =>
  request<T>({ method: 'POST', url, data });

export const put = <T>(url: string, data = {}) =>
  request<T>({ method: 'PUT', url, data });

export const del = <T>(url: string) =>
  request<T>({ method: 'DELETE', url });

export default api;