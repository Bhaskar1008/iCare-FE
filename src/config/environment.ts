// Environment configuration
type Environment = 'development' | 'uat' | 'pre-production' | 'production';

interface EnvironmentConfig {
  apiUrl: string;
  appTitle: string;
  isProduction: boolean;
  otpExpiryTime: number; // in seconds
}

const ENV = (import.meta.env.VITE_APP_ENV || 'development') as Environment;

const configs: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: 'https://api-dev.icaresup.salesdrive.app',
    appTitle: 'SalesDrive (DEV)',
    isProduction: false,
    otpExpiryTime: 300, // 5 minutes
  },
  uat: {
    apiUrl: 'https://api-uat.icaresup.salesdrive.app',
    appTitle: 'SalesDrive (UAT)',
    isProduction: false,
    otpExpiryTime: 300,
  },
  'pre-production': {
    apiUrl: 'https://api-preprod.icaresup.salesdrive.app',
    appTitle: 'SalesDrive (PRE-PROD)',
    isProduction: false,
    otpExpiryTime: 300,
  },
  production: {
    apiUrl: 'https://api.icaresup.salesdrive.app',
    appTitle: 'SalesDrive',
    isProduction: true,
    otpExpiryTime: 300,
  },
};

export const config = configs[ENV];
export const currentEnv = ENV;