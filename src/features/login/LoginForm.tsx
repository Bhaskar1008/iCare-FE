import { useState } from 'react'
import type { LoginCredentials, LoginFormProps } from './types'

function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [agentCode, setAgentCode] = useState('100000A')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ agentCode, termsAccepted })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="agentCode" className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-500">* </span>
          Agent Code
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <input
            id="agentCode"
            type="text"
            value={agentCode}
            onChange={(e) => setAgentCode(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
            disabled={isLoading}
            placeholder="Enter your agent code"
          />
        </div>
      </div>

      <div className="flex items-start mt-4">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
            required
            disabled={isLoading}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-600">
            I have read and accept the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Terms and Conditions</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Privacy Policy</a>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isLoading || !termsAccepted}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            <span>Logging in...</span>
          </div>
        ) : (
          'Login'
        )}
      </button>
    </form>
  )
}

export default LoginForm 