import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationType } from '../../types';
import StepsNavigation from '../../components/registration/StepsNavigation';
import RegisterTypeSelection from './steps/RegisterTypeSelection';
import MobileVerification from './steps/MobileVerification';
import DocumentChecklist from './steps/DocumentChecklist';
import PersonalDetails from './steps/PersonalDetails';
import BankingDetails from './steps/BankingDetails';
import EducationalDetails from './steps/EducationalDetails';
import WorkExperience from './steps/WorkExperience';
import DocumentUpload from './steps/DocumentUpload';
import StatusCheck from './steps/StatusCheck';

const steps = [
  { id: 'personal', label: 'PERSONAL DETAILS' },
  { id: 'banking', label: 'BANKING DETAILS' },
  { id: 'education', label: 'EDUCATIONAL DETAILS' },
  { id: 'experience', label: 'WORK EXPERIENCE' },
  { id: 'documents', label: 'DOCUMENT UPLOAD' },
  { id: 'status', label: 'STATUS' },
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('personal');
  const [formData, setFormData] = useState({
    type: '' as RegistrationType,
    // ... other form fields
  });

  const handleNext = (nextStep: string) => {
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleSubmit = async (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    // Navigate to next step based on current step
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      handleNext(steps[currentIndex + 1].id);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalDetails formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      case 'banking':
        return <BankingDetails formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      case 'education':
        return <EducationalDetails formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      case 'experience':
        return <WorkExperience formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      case 'documents':
        return <DocumentUpload formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      case 'status':
        return <StatusCheck formData={formData} onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StepsNavigation
        steps={steps.map(step => ({
          ...step,
          isActive: step.id === currentStep,
          isCompleted: steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id)
        }))}
        currentStep={currentStep}
      />

      <div className="flex-1 py-8 px-12">
        {renderStep()}
      </div>
    </div>
  );
};

export default RegisterPage;