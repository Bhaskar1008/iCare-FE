import React from 'react';
import { Lead } from '../../types';

interface LeadCardProps {
  lead: Lead;
  onUpdate?: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onUpdate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${lead.initialsColor} flex items-center justify-center text-white text-xl font-semibold`}>
              {lead.initials}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">{lead.name}</h3>
              <p className="text-sm text-gray-500">{lead.code}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-sm font-medium rounded-full border border-cyan-500 text-cyan-500">
              {lead.status}
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-cyan-100 text-cyan-600">
              {lead.type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Created on</p>
            <p className="mt-1 font-medium">{lead.createdOn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allocated on</p>
            <p className="mt-1 font-medium">{lead.allocatedOn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Appointment on</p>
            <p className="mt-1 font-medium">{lead.appointmentOn || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mobile No.</p>
            <p className="mt-1 font-medium">{lead.mobileNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allocated by</p>
            <p className="mt-1 font-medium">{lead.allocatedBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allocated to</p>
            <p className="mt-1 font-medium">{lead.allocatedTo}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-4 bg-gray-50 text-center">
        <button
          onClick={onUpdate}
          className="text-cyan-600 font-medium hover:text-cyan-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default LeadCard;