import React from 'react';
import { Customer } from '../../types';
import { Trash2, MessageSquare, Phone } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  onDelete?: () => void;
  onMessage?: () => void;
  onCall?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onDelete,
  onMessage,
  onCall
}) => {
  return (
    <div className="border-l-4 border-cyan-500 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-cyan-500">{customer.name}</h3>
              <p className="text-sm text-gray-600">Customer since {customer.customerSince}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-600">
            {customer.importance}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Gender</p>
            <p className="font-medium">{customer.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Birthdate</p>
            <p className="font-medium">{customer.birthdate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Lead ID</p>
            <p className="font-medium">{customer.leadId}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onDelete}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={onMessage}
              className="flex items-center text-cyan-600 hover:text-cyan-700"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </button>
            <button
              onClick={onCall}
              className="flex items-center text-cyan-600 hover:text-cyan-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;