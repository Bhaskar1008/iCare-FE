import { useState } from 'react'
import LoginForm from './LoginForm'
import OtpVerificationModal from './OtpVerificationModal'
import type { LoginCredentials, LoginPageProps } from './types'
import { Header } from '../../components'

function LoginPage({ onLoginSuccess, onRegister }: LoginPageProps) {
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleSubmit = (credentials: LoginCredentials) => {
    setIsLoginLoading(true)
    
    // Simulate API call - validate agent code
    setTimeout(() => {
      // Check if agent code matches our test code
      if (credentials.agentCode === '100000A') {
        // Show OTP verification modal
        setShowOtpModal(true)
      } else {
        // Show error (in a real app, you'd want to show an actual error message)
        console.error('Invalid agent code')
      }
      setIsLoginLoading(false)
    }, 1000)
  }

  const handleRegister = () => {
    setIsRegisterLoading(true)
    
    // Simulate a brief loading state before navigating
    setTimeout(() => {
      setIsRegisterLoading(false)
      onRegister()
    }, 500)
  }

  const handleOtpVerify = (otp: string) => {
    // No need to set loading state here as the OTP component handles its own loading state
    console.log('OTP verified:', otp)
    
    // Close modal and redirect to dashboard
    setShowOtpModal(false)
    
    // Call the onLoginSuccess callback to navigate to dashboard
    onLoginSuccess()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card with shadow effect */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            {/* Blue header section */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-8 py-6 text-white">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-blue-100 mt-1">Login to access your agent portal</p>
            </div>
            
            {/* Form section */}
            <div className="px-8 py-8">
              <LoginForm onSubmit={handleSubmit} isLoading={isLoginLoading} />

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-4 py-3 px-4 flex justify-center items-center bg-white text-blue-800 font-medium rounded-lg border-2 border-blue-800 hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isRegisterLoading || isLoginLoading}
                  onClick={handleRegister}
                >
                  {isRegisterLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-blue-800 border-t-transparent rounded-full mr-2"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Having trouble logging in?{' '}
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">Contact Support</a>
                </p>
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
                Secure Login
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

      {/* OTP Verification Modal */}
      <OtpVerificationModal 
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
      />
    </div>
  )
}

export default LoginPage 