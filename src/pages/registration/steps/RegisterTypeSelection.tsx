import React from 'react';
import { RegistrationType } from '../../../types';
import { Users2, Building2, Store } from 'lucide-react';

interface RegisterTypeSelectionProps {
  onSubmit: (data: { type: RegistrationType }) => void;
}

const RegisterTypeSelection: React.FC<RegisterTypeSelectionProps> = ({ onSubmit }) => {
  const types = [
    {
      id: 'AGENT',
      title: 'Agent',
      description: 'Join as an individual insurance agent',
      icon: Users2,
    },
    {
      id: 'BROKER',
      title: 'Broker',
      description: 'Register as an insurance broker',
      icon: Building2,
    },
    {
      id: 'FRANCHISE',
      title: 'Franchise',
      description: 'Open your own insurance franchise',
      icon: Store,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome!</h1>
        <p className="mt-2 text-gray-600">
          Choose how you want to partner with iCare
        </p>
      </div>

      <div className="grid gap-4">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onSubmit({ type: type.id as RegistrationType })}
            className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <type.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-medium text-gray-900">{type.title}</h3>
              <p className="text-sm text-gray-500">{type.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegisterTypeSelection;