import React from 'react';

interface Step {
  id: string;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface StepsNavigationProps {
  steps: Step[];
  currentStep: string;
}

const StepsNavigation: React.FC<StepsNavigationProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-64 bg-white min-h-screen">
      <nav className="relative">
        {/* Active step indicator */}
        <div 
          className="absolute left-0 top-0 w-1 bg-cyan-500 h-12 transition-transform duration-300"
          style={{
            transform: `translateY(${steps.findIndex(s => s.id === currentStep) * 48}px)`
          }}
        />
        
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center h-12 pl-8 ${
              step.id === currentStep
                ? 'bg-gray-50'
                : ''
            }`}
          >
            <span
              className={`text-sm font-medium ${
                step.id === currentStep 
                  ? 'text-cyan-500' 
                  : step.isCompleted 
                  ? 'text-gray-900' 
                  : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default StepsNavigation;