import { useState, useRef, useEffect } from 'react'
import type { OtpVerificationModalProps } from './types'
import { Button } from '../../components'

function OtpVerificationModal({ isOpen, onClose, onVerify }: OtpVerificationModalProps) {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]

  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs[0].current?.focus()
      }, 100)
      
      // Start countdown
      setCountdown(60)
      setIsVerifying(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || countdown <= 0) return
    
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [countdown, isOpen])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }
    
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleVerify = () => {
    if (otp.join('').length === 4) {
      setIsVerifying(true)
      // Wrap the onVerify in a setTimeout to simulate API call
      setTimeout(() => {
        onVerify(otp.join(''))
        setIsVerifying(false)
      }, 1000)
    }
  }

  const handleResendOtp = () => {
    if (countdown <= 0) {
      setCountdown(60)
      // Logic to resend OTP would go here
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Security Verification</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-gray-300 transition-colors duration-200 focus:outline-none"
            disabled={isVerifying}
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-center text-xl font-medium text-gray-800 mb-2">OTP Verification</h3>
          <p className="text-center text-gray-600 mb-6">
            We've sent a verification code to your registered email address
          </p>
          
          {/* OTP Inputs */}
          <div className="flex justify-center space-x-3 mb-6">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={otp[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                maxLength={1}
                disabled={isVerifying}
              />
            ))}
          </div>
          
          {/* Resend OTP */}
          <div className="text-center mb-6">
            <button 
              onClick={handleResendOtp}
              disabled={countdown > 0 || isVerifying}
              className={`text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 ${(countdown > 0 || isVerifying) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {countdown > 0 ? (
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Resend in {countdown}s
                </span>
              ) : 'Resend Verification Code'}
            </button>
          </div>
          
          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.join('').length !== 4 || isVerifying}
            className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify & Continue'
            )}
          </button>
          
          <div className="mt-5 text-center text-sm text-gray-600">
            <p>Having trouble? <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">Contact Support</a></p>
          </div>
        </div>
        
        {/* Footer with branded accent */}
        <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
      </div>
    </div>
  )
}

export default OtpVerificationModal 