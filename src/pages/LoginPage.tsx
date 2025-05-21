import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import OTPVerification from '../components/auth/OTPVerification';
import Modal from '../components/common/Modal';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [agentCode, setAgentCode] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleOTPRequested = (code: string) => {
    setAgentCode(code);
    setIsOTPModalOpen(true);
  };

  const closeOTPModal = () => {
    setIsOTPModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content area */}
      <div className="flex flex-col w-full md:w-1/2 bg-white">
        <header className="px-6 py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-3xl font-bold text-orange-500">iCare</span>
              <span className="text-3xl text-teal-400">*</span>
            </a>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <LoginForm onOTPRequested={handleOTPRequested} />
        </div>
      </div>
      
      {/* Hero image area */}
      <div 
        className="hidden md:block md:w-1/2 bg-gradient-to-r from-teal-500 to-blue-600 relative"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/90 to-blue-600/90">
          <div className="flex flex-col h-full justify-center px-12 text-white">
            <h1 className="text-5xl font-bold tracking-tight leading-tight mb-4">
              SAY YES TO<br />BETTER HEALTH
            </h1>
            <p className="text-xl mb-8 max-w-lg">
              Join our network of dedicated agents making healthcare more accessible for all.
            </p>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal 
        isOpen={isOTPModalOpen} 
        onClose={closeOTPModal} 
        title="OTP Verification"
        closeOnOverlayClick={false}
      >
        <OTPVerification 
          onClose={closeOTPModal} 
          agentCode={agentCode} 
        />
      </Modal>
    </div>
  );
};

export default LoginPage;