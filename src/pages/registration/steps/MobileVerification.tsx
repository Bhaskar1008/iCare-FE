import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import OTPInput from '../../../components/auth/OTPInput';

const mobileSchema = z.object({
  mobile: z.string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number must not exceed 15 digits')
    .regex(/^\+?[0-9]+$/, 'Invalid mobile number format'),
});

interface MobileVerificationProps {
  formData: any;
  onSubmit: (data: { mobile: string }) => void;
  onBack: () => void;
}

const MobileVerification: React.FC<MobileVerificationProps> = ({ onSubmit, onBack }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(mobileSchema),
  });

  const handleGetOTP = async (data: { mobile: string }) => {
    setIsVerifying(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowOTP(true);
    setIsVerifying(false);
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit({ mobile: otp });
    setIsVerifying(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Register</h1>
        <p className="mt-2 text-gray-600">
          We will send you the verification code on this number
        </p>
      </div>

      {!showOTP ? (
        <form onSubmit={handleSubmit(handleGetOTP)} className="space-y-6">
          <Input
            label="Mobile Number"
            id="mobile"
            type="tel"
            placeholder="Enter your mobile number"
            error={errors.mobile?.message}
            required
            {...register('mobile')}
          />

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              fullWidth
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isVerifying}
              fullWidth
            >
              Get OTP
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Enter the OTP sent to your mobile
            </p>
            <OTPInput
              length={4}
              value={otp}
              onChange={setOTP}
              isDisabled={isVerifying}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowOTP(false)}
              fullWidth
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleVerifyOTP}
              isLoading={isVerifying}
              disabled={otp.length !== 4}
              fullWidth
            >
              Verify & Proceed
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileVerification;