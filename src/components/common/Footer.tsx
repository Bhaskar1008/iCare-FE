import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, FileText, Users, GraduationCap, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const navItems = [
    { path: '/dashboard', label: 'HOME', icon: Home },
    { path: '/performance', label: 'PERFORMANCE', icon: BarChart2 },
    { path: '/quotations', label: 'QUOTATIONS/POLICIES', icon: FileText },
    { path: '/customers', label: 'CUSTOMERS', icon: Users },
    { path: '/learning-center', label: 'LEARNING CENTER', icon: GraduationCap },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Bottom Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex flex-col items-center py-3 px-4
                    ${isActive ? 'text-primary' : 'text-gray-500'}
                    hover:text-primary transition-colors
                  `}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Section */}
            <div>
              <h3 className="text-gray-700 font-medium mb-4">Do you have any concerns?</h3>
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-gray-700 font-medium mb-4">Follow us on social</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-gray-700 font-medium mb-4">Don't miss out on any updates</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <button className="bg-primary text-white px-6 py-2 rounded-r-full hover:bg-primary/90 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-primary">Terms of Use & Service</a>
                <a href="#" className="text-gray-600 hover:text-primary">Report a Problem</a>
              </div>
              <p className="text-gray-600 mt-4 md:mt-0">
                Copyright © 2023 Insular Health Care, INC. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;