import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import { Check } from 'lucide-react';

interface DocumentChecklistProps {
  formData: any;
  onSubmit: (data: { acceptedTerms: boolean }) => void;
  onBack: () => void;
}

const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ onSubmit, onBack }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const documents = [
    'Valid ID (Government Issued)',
    'NBI Clearance certificate',
    'TIN No certificate',
    'Self Photograph (2x2 with White Background)',
    'All these doc should be in .jpg or .pdf',
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome!</h1>
        <p className="mt-2 text-gray-600">
          Before starting registration, review the checklist below and
          ensure you have the required documents ready for the process.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-4">Checklist for Registration</h2>
        <ul className="space-y-3">
          {documents.map((doc, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600">
            Data Privacy Consent
          </span>
        </label>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={onBack}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => onSubmit({ acceptedTerms })}
          disabled={!acceptedTerms}
          fullWidth
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default DocumentChecklist;