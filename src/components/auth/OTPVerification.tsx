import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import OTPInput from './OTPInput';
import Button from '../common/Button';
import { config } from '../../config/environment';

interface OTPVerificationProps {
  onClose: () => void;
  agentCode: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onClose,
  agentCode,
}) => {
  const { verifyOTP, isLoading, error } = useAuth();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(config.otpExpiryTime);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [showError, setShowError] = useState(false);

  // Handle countdown
  useEffect(() => {
    if (countdown <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Format countdown time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async () => {
    setShowError(false);
    
    if (otp.length !== 4) {
      setShowError(true);
      return;
    }
    
    const success = await verifyOTP({ agentCode, otp });
    
    if (!success) {
      setShowError(true);
    }
  };

  const handleResendOTP = async () => {
    // Reset the countdown and disable resend
    setCountdown(config.otpExpiryTime);
    setResendDisabled(true);
    setOtp('');
    
    // Call login again to request a new OTP
    // This is handled by the parent component
    const { login } = useAuth();
    await login({ agentCode });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">OTP Verification</h2>
        <p className="text-gray-600">
          We have sent an OTP to your Registered Email Address.
        </p>
      </div>
      
      {(showError && error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-6">
        <p className="text-sm text-gray-600 font-medium">
          Please enter the OTP.
        </p>
        
        <OTPInput 
          length={4} 
          value={otp} 
          onChange={setOtp} 
          autoFocus={true}
          isDisabled={isLoading}
        />
        
        <div className="text-sm text-gray-600">
          {resendDisabled ? (
            <p>
              Resend OTP in <span className="font-medium">{formatTime(countdown)}</span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          )}
        </div>
        
        <Button
          onClick={handleVerifyOTP}
          variant="primary"
          isLoading={isLoading}
          fullWidth
          disabled={otp.length !== 4}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;