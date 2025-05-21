import React from 'react';
import { Car, Plane } from 'lucide-react';

interface QuotationCardProps {
  date: string;
  type: 'MOTOR' | 'TRAVEL';
  customer: {
    name: string;
    location: string;
  };
  details: {
    quoteType: string;
    travelPack: string;
    travelProduct: string;
    premium: number;
    status: string;
    expiry: string;
    quotationNumber: string;
    riskInspectionStatus?: string;
  };
}

const QuotationCard: React.FC<QuotationCardProps> = ({
  date,
  type,
  customer,
  details,
}) => {
  const TypeIcon = type === 'MOTOR' ? Car : Plane;
  const isActive = details.status.toUpperCase() === 'ACTIVE';
  const isRiskRequired = details.riskInspectionStatus?.toUpperCase() === 'REQUIRED';

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              type === 'MOTOR' ? 'bg-orange-100' : 'bg-blue-100'
            }`}>
              <TypeIcon className={`w-5 h-5 ${
                type === 'MOTOR' ? 'text-orange-500' : 'text-blue-500'
              }`} />
            </div>
            <div className="ml-3">
              <h3 className="text-[#00BFB3] font-medium">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{date}</span>
            <span className={`ml-3 px-3 py-1 text-xs font-medium rounded ${
              type === 'MOTOR' 
                ? 'bg-orange-100 text-orange-600' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Quote Type</p>
            <p className="font-medium">{details.quoteType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Travel Pack</p>
            <p className="font-medium">{details.travelPack}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Travel Product</p>
            <p className="font-medium">{details.travelProduct}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Premium</p>
            <p className="font-medium">{details.premium.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className={`font-medium ${isActive ? 'text-green-600' : 'text-gray-900'}`}>
              {details.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Expiry</p>
            <p className="font-medium">{details.expiry}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Quotation Number</p>
            <p className="font-medium">{details.quotationNumber}</p>
          </div>
          {details.riskInspectionStatus && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Risk Inspection Status</p>
              <p className={`font-medium ${isRiskRequired ? 'text-orange-600' : 'text-gray-900'}`}>
                {details.riskInspectionStatus}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-4 bg-gray-50 text-center">
        <button className="text-[#00BFB3] font-medium hover:text-[#00BFB3]/80">
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

export default QuotationCard;