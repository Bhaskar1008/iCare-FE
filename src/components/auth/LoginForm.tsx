import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

// Form schema
const loginSchema = z.object({
  agentCode: z.string().min(1, 'Agent code is required'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the Terms and Privacy Policy',
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC<{ onOTPRequested: (agentCode: string) => void }> = ({ onOTPRequested }) => {
  const navigate = useNavigate();
  const { login, error, clearError, isLoading } = useAuth();
  const [showError, setShowError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      agentCode: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    clearError();
    setShowError(false);
    
    const success = await login({ agentCode: data.agentCode });
    if (success) {
      onOTPRequested(data.agentCode);
    } else {
      setShowError(true);
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-blue-800 mb-6">Login to the Agent's Portal</h1>
      
      {(showError && error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="Agent Code"
            id="agentCode"
            required
            fullWidth
            placeholder="Enter Agent Code"
            error={errors.agentCode?.message}
            {...register('agentCode')}
          />
        </div>
        
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="acceptTerms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...register('acceptTerms')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="text-gray-700">
              I have read and accept the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="bg-primary hover:bg-primary/90 transition-colors mt-4"
        >
          GET OTP
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Having trouble logging in?{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Contact us
          </a>
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={handleRegisterClick}
          className="inline-block text-primary hover:underline font-medium"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default LoginForm;