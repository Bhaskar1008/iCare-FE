import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import Button from '../components/common/Button';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile header */}
        <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-700 text-white">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white text-blue-800 flex items-center justify-center text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name.toUpperCase()}</h1>
                <div className="flex items-center mt-1">
                  <span className="text-sm">Employee Code: {user.employeeCode}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">iCare agent since Feb 2025</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-200 text-teal-800 text-xs font-medium">
                TIER 1
              </span>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
          <div className="p-4 text-center border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Premiums</h3>
            <div className="mt-2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">₱0</span>
            </div>
          </div>
          
          <div className="p-4 text-center md:border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Premiums Due</h3>
            <div className="mt-2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">₱0</span>
            </div>
          </div>
          
          <div className="p-4 text-center border-t md:border-t-0 md:border-r border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">For Renewal</h3>
            <div className="mt-2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">0</span>
            </div>
          </div>
          
          <div className="p-4 text-center border-t md:border-t-0 border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Expiring quotes</h3>
            <div className="mt-2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">0</span>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">EMAIL</p>
                <p className="mt-1">{user.email || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">PHONE</p>
                <p className="mt-1">{user.phone || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">ADDRESS</p>
                <p className="mt-1">{user.address || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">BANK</p>
                <p className="mt-1">-</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={logout}
              variant="outline" 
              fullWidth
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;