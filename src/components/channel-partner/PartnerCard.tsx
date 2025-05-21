import React from 'react';
import { ChannelPartner } from '../../types';
import { Building2, Mail, Phone, MapPin, Briefcase, User } from 'lucide-react';

interface PartnerCardProps {
  partner: ChannelPartner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const isIndividual = partner.type === 'INDIVIDUAL';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${partner.avatar?.bgColor || 'bg-gray-100'} flex items-center justify-center text-white font-semibold text-lg`}>
              {partner.avatar?.initials}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">{partner.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                {isIndividual ? (
                  <User className="w-4 h-4 mr-1" />
                ) : (
                  <Building2 className="w-4 h-4 mr-1" />
                )}
                <span>ID{partner.id}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-600">
              {partner.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Created On</p>
            <p className="font-medium">{partner.createdOn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email ID</p>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-1" />
              <p className="font-medium">{partner.emailId}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Mobile No</p>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-1" />
              <p className="font-medium">{partner.mobileNo}</p>
            </div>
          </div>

          {isIndividual ? (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Work Experience</p>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 text-gray-400 mr-1" />
                  <p className="font-medium">{partner.workExperience}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Previous Company</p>
                <p className="font-medium">{partner.previousCompany}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-1">Representative Name</p>
                <p className="font-medium">{partner.representativeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Designation</p>
                <p className="font-medium">{partner.designation}</p>
              </div>
            </>
          )}
          <div>
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
              <p className="font-medium">{partner.location}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-cyan-50 p-4 text-center">
        <button className="text-cyan-600 font-medium hover:text-cyan-700">
          VIEW REGISTRATION
        </button>
      </div>
    </div>
  );
};

export default PartnerCard;