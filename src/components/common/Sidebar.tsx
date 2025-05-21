import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText,
  Calendar,
  CheckSquare,
  BookOpen,
  ChevronDown,
  ChevronRight,
  UserPlus
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const navigationItems = [
  { 
    path: '/dashboard', 
    label: 'Home',
    icon: <Home className="mr-3 h-5 w-5" /> 
  },
  { 
    path: '/channel-partner', 
    label: 'Channel Partner Recruitment',
    icon: <UserPlus className="mr-3 h-5 w-5" /> 
  },
  { 
    path: '/leads', 
    label: 'Leads',
    icon: <Users className="mr-3 h-5 w-5" />,
    children: [
      { path: '/leads?tab=all', label: 'All' },
      { path: '/leads?tab=for-today', label: 'For Today' },
      { path: '/leads?tab=open', label: 'Open' },
    ]
  },
  { 
    path: '/calendar', 
    label: 'Calendar',
    icon: <Calendar className="mr-3 h-5 w-5" />,
    state: { tab: 'calendar' }
  },
  { 
    path: '/calendar', 
    label: 'To Do',
    icon: <CheckSquare className="mr-3 h-5 w-5" />,
    state: { tab: 'todo' }
  },
  { 
    path: '/sales-guide', 
    label: 'Sales Guide',
    icon: <BookOpen className="mr-3 h-5 w-5" />,
    children: [
      { path: '/sales-guide/products', label: 'Products' },
      { path: '/sales-guide/documents', label: 'Documents' },
      { path: '/sales-guide/training', label: 'Training' },
    ]
  },
  { 
    path: '/quotations', 
    label: 'Quotations/Policies',
    icon: <FileText className="mr-3 h-5 w-5" /> 
  },
  { 
    path: '/customers', 
    label: 'Customers',
    icon: <Users className="mr-3 h-5 w-5" /> 
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path) 
        : [...prev, path]
    );
  };

  const handleNavigation = (item: any) => {
    if (item.children) {
      toggleExpand(item.path);
    } else {
      navigate(item.path, { state: item.state });
    }
  };

  return (
    <nav 
      className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white border-r border-gray-200 pt-16 shadow-md transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <ul className="mt-6 space-y-1 px-3">
          {navigationItems.map((item) => (
            <li key={`${item.path}-${item.label}`}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => handleNavigation(item)}
                    className="flex items-center w-full p-3 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.label}</span>
                    {expandedItems.includes(item.path) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedItems.includes(item.path) && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) => `block p-2 text-sm ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center w-full p-3 rounded-md text-gray-800 hover:bg-gray-100`}
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;