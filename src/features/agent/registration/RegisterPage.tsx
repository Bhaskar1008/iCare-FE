import { useState } from 'react'
import type { RegisterPageProps } from './types'
import WelcomeModal from './WelcomeModal'
import OtpVerificationModal from '../../../features/login/OtpVerificationModal'
import { Header } from '../../../components'

function RegisterPage({ onBack }: RegisterPageProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendOTP()
  }

  const handleSendOTP = () => {
    setIsLoading(true)
    // Simulate API call to send OTP
    setTimeout(() => {
      console.log('OTP sent to:', email)
      setIsLoading(false)
      // Show OTP verification modal after OTP is sent
      setShowOtpModal(true)
    }, 1000)
  }

  const handleOtpVerify = (otp: string) => {
    console.log('OTP verified:', otp)
    
    // Close modal and redirect to the agent create account page
    setShowOtpModal(false)
    window.location.href = '/agent-registration/account'
  }

  const handleContinueRegistration = () => {
    setShowWelcomeModal(false)
    // Navigate to the agent registration form
    window.location.href = '/agent-registration/form'
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {showWelcomeModal && (
        <WelcomeModal 
          onCancel={() => setShowWelcomeModal(false)}
          onContinue={handleContinueRegistration}
        />
      )}
      
      {/* OTP Verification Modal */}
      <OtpVerificationModal 
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
      />
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card with shadow effect */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            {/* Blue header section */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-8 py-6 text-white">
              <h2 className="text-2xl font-bold">Account Registration</h2>
              <p className="text-blue-100 mt-1">Enter your email to receive a verification code</p>
            </div>
            
            {/* Form section */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">* </span>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 mt-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>Sending Code...</span>
                    </div>
                  ) : (
                    'Get Verification Code'
                  )}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setShowWelcomeModal(true)}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
                    >
                      Register Now
                    </button>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Footer with branded accent */}
            <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
          </div>
          
          {/* Additional information */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Protected by industry-leading security practices</p>
            <div className="flex justify-center mt-3 space-x-4">
              <div className="text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Verification
              </div>
              <div className="text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage 