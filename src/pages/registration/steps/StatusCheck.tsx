import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../../../components/common/Button';

interface StatusCheckProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const StatusCheck: React.FC<StatusCheckProps> = ({ onBack }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Registration Complete!
        </h1>
        <p className="text-gray-600">
          Your registration has been submitted successfully. Our team will review your application and get back to you shortly.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-medium text-gray-900 mb-4">What happens next?</h2>
        <ol className="space-y-4 text-left">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm mr-3 mt-0.5">
              1
            </span>
            <p className="text-gray-600">
              Our team will review your submitted documents and information
            </p>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm mr-3 mt-0.5">
              2
            </span>
            <p className="text-gray-600">
              You will receive an email notification about your application status
            </p>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm mr-3 mt-0.5">
              3
            </span>
            <p className="text-gray-600">
              If approved, you will receive your agent credentials via email
            </p>
          </li>
        </ol>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={onBack}
          fullWidth
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate('/login')}
          fullWidth
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default StatusCheck;