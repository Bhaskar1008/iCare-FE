import { useState } from 'react'
import type { WelcomeModalProps } from './types'

function WelcomeModal({ onCancel, onContinue }: WelcomeModalProps) {
  const [consentChecked, setConsentChecked] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Welcome to Salesverse</h2>
          <button
            onClick={onCancel}
            className="text-white text-2xl hover:text-gray-300 transition-colors duration-200 focus:outline-none"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-center text-xl font-medium text-gray-800 mb-2">Registration Checklist</h3>
          <p className="text-center text-gray-600 mb-6">
            Before we begin, please ensure you have all the necessary documents ready for the registration process.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-blue-800">Agency Licensing Checklist</p>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Download checklist')
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">
                I have read and agree to the Data Privacy Consent and Terms of Service
              </span>
            </label>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 bg-white text-blue-800 font-medium rounded-lg border-2 border-blue-800 hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={onContinue}
              disabled={!consentChecked}
              className="flex-1 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Continue Registration
            </button>
          </div>
        </div>
        
        {/* Footer with branded accent */}
        <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
      </div>
    </div>
  )
}

export default WelcomeModal 