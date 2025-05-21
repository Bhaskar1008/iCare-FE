import React from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md hover:bg-gray-100"
            aria-expanded={isSidebarOpen}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-3xl font-bold text-orange-500">iCare</span>
              <span className="text-3xl text-teal-400">*</span>
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative p-1 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          {user && (
            <div className="relative inline-block">
              <a 
                href="/profile"
                className="flex items-center space-x-1"
              >
                <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center text-sm font-medium">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;