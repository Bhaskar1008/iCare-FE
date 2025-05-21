// This file contains mock handlers for development purposes only
// These will be replaced by real API calls in production

// Mock user data
export const mockUser = {
  id: 'usr_123',
  name: 'Pedrito Antonio',
  email: 'pnantonio@insularhealthcare.com.ph',
  phone: '9654323473',
  address: 'AKLAN,ALTAVAS',
  employeeCode: '1266',
  tier: 'TIER 1',
  avatar: null,
  joinDate: 'Feb 2025',
};

// Mock authentication
export const handleLogin = async (agentCode: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate agent code
  if (agentCode !== '1266') {
    throw new Error('Invalid agent code');
  }
  
  return { success: true, message: 'OTP sent successfully' };
};

export const handleVerifyOTP = async (agentCode: string, otp: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In development, accept any 4-digit OTP
  if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
    throw new Error('Invalid OTP format');
  }
  
  return { 
    success: true, 
    data: {
      user: mockUser,
      token: 'mock_jwt_token'
    }
  };
};