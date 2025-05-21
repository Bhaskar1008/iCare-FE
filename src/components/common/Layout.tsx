import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleContentClick = () => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-black/30 md:hidden" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        <main 
          className="flex-1 md:ml-64 transition-all duration-300 ease-in-out"
          onClick={handleContentClick}
        >
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;