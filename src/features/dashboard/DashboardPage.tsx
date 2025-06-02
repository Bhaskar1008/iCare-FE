import { useState, useEffect } from 'react'
import { Header } from '../../components'

export interface DashboardPageProps {
  onLogout: () => void
}

function DashboardPage({ onLogout }: DashboardPageProps) {
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('home')
  const [activityDays, setActivityDays] = useState<{ day: string; date: string; isToday: boolean }[]>([])
  
  // Format the current date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(currentDate)
  
  // Format month and year for the activity tracker
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate)
  const currentYear = selectedDate.getFullYear().toString()

  // Generate dynamic days for the activity tracker
  useEffect(() => {
    const generateDays = () => {
      // Start from 4 days before the selected date
      const startDate = new Date(selectedDate)
      startDate.setDate(selectedDate.getDate() - 4)
      
      const days = []
      
      // Generate 9 days (today +/- 4 days)
      for (let i = 0; i < 9; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase()
        const dayNumber = date.getDate().toString()
        const isToday = date.toDateString() === currentDate.toDateString()
        
        days.push({
          day: dayName,
          date: dayNumber,
          isToday
        })
      }
      
      setActivityDays(days)
    }
    
    generateDays()
  }, [selectedDate, currentDate])
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() - 1)
      return newDate
    })
  }
  
  // Navigate to next month
  const goToNextMonth = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with modern styling */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="text-gray-700 mr-4 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-blue-600 text-xl font-bold">Salesverse</h1>
            </div>

            <div className="flex items-center">
              <p className="text-gray-600 mr-4 hidden md:block">Hello, JAEGER!</p>
              <button className="text-gray-700 hover:text-blue-600 transition-colors relative mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
              <button 
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout                
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Current Date Display */}
        <div className="mb-6 text-right">
          <p className="text-gray-600">{formattedDate}</p>
        </div>

        {/* My Card Section - Similar to banking card */}
        <div className="mb-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-medium text-gray-700 mb-3">My Dashboard</h2>
            <div className="bg-gray-900 text-white rounded-xl p-5 shadow-lg">
              <div className="flex flex-col mb-4">
                <p className="text-gray-400 text-sm">Good day! Welcome back</p>
                <h2 className="text-2xl font-bold mt-1">Hi JAEGER!</h2>
              </div>
              
              <div className="flex justify-between items-end mt-3">
                <div className="flex space-x-3 mt-2">
                  <button className="bg-white/20 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors text-sm">
                    Create an Event
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="bg-white/20 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors text-sm">
                    Add New Lead
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Financial Record Section */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Quick Access</h2>
              <div className="flex space-x-2">
                <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Month <span>▼</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* All Products */}
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex justify-between items-center border border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">All Products</h3>
                  <p className="text-gray-600 text-sm mt-1">View and manage your product catalog</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
              
              {/* Learning Center */}
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex justify-between items-center border border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Learning Center</h3>
                  <p className="text-gray-600 text-sm mt-1">Access training and educational resources</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Banner - Now in card format */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Woman with laptop" 
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-900/40"></div>
                <div className="absolute bottom-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-light italic drop-shadow-md">Smarter. Better. Fuller.</h2>
                </div>
                
                {/* Slider indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  <div className="w-6 h-1 bg-white rounded-full opacity-70"></div>
                  <div className="w-6 h-1 bg-blue-600 rounded-full"></div>
                  <div className="w-6 h-1 bg-white rounded-full opacity-70"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity Tracker Section */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Activity Tracker</h2>
              <div className="flex space-x-2">
                <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Weekly <span>▼</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              {/* Month Navigation */}
              <div className="px-5 py-4 flex justify-between items-center text-gray-800 border-b border-gray-100">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" onClick={goToPreviousMonth}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="font-medium text-center">{currentMonth.toUpperCase()} - {currentYear}</div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" onClick={goToNextMonth}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Date Selector */}
              <div className="flex overflow-x-auto py-4 px-4 space-x-2 bg-white relative">
                {activityDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer ${
                      day.isToday ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors'
                    }`}
                  >
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-lg font-bold">{day.date}</div>
                  </div>
                ))}             
              </div>
              
              {/* Activity Graph Area - Placeholder for chart */}
              <div className="border-t border-gray-100 px-5 py-6">
                <div className="h-48 w-full flex items-center justify-center">
                  {/* This would be where a chart/graph goes */}
                  <svg className="w-full h-full text-gray-200" viewBox="0 0 600 200">
                    <path d="M0,160 C100,100 200,190 300,120 C400,50 500,120 600,90" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M0,160 C100,100 200,190 300,120 C400,50 500,120 600,90" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>
              
              {/* Empty State */}
              <div className="bg-gray-50 p-8 flex flex-col items-center justify-center border-t border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Sorry, No Activity Found</p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  Create an Event
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6">
        <button className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-gray-200">
        <nav className="bg-white py-3 shadow-sm">
          <div className="container mx-auto flex justify-between items-center max-w-4xl px-4">
            <a href="#" className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600 transition-colors'}`} onClick={() => setActiveTab('home')}>
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5L12 4L21 9.5V20H3V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-medium">HOME</span>
            </a>
            
            <a href="#" className={`flex flex-col items-center ${activeTab === 'leads' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600 transition-colors'}`} onClick={() => setActiveTab('leads')}>
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7H4V21H8V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 4H16V21H20V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11H10V21H14V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-medium">LEADS</span>
            </a>
            
            <a href="#" className={`flex flex-col items-center ${activeTab === 'business' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600 transition-colors'}`} onClick={() => setActiveTab('business')}>
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8H17V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V8H4C2.89543 8 2 8.89543 2 10V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V10C22 8.89543 21.1046 8 20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 8V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-medium">BUSINESS</span>
            </a>
            
            <a href="#" className={`flex flex-col items-center ${activeTab === 'calendar' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600 transition-colors'}`} onClick={() => setActiveTab('calendar')}>
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-medium">CALENDAR</span>
            </a>
            
            <a href="#" className={`flex flex-col items-center ${activeTab === 'sales' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600 transition-colors'}`} onClick={() => setActiveTab('sales')}>
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-medium">SALES GUIDE</span>
            </a>
          </div>
        </nav>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-medium mb-3">Follow us on social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="mb-3">
                <span className="block md:inline-block mb-2 md:mb-0 md:mr-2">Do you have any concerns?</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Contact Us
                </button>
              </div>
              <div className="text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Use & Service</a>
              </div>
              <div className="text-sm mt-1 text-gray-400">
                Copyright © 2025 Salesverse Financial. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DashboardPage 