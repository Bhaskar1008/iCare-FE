import { useState } from 'react'
import { Header, Button } from '../../../components'

function AgentApplicationStatus() {
  const [step, setStep] = useState(3)
  
  // Example application ID - in a real app this would come from an API or context
  const applicationId = 'APP25057802713'

  const handleBack = () => {
    window.location.href = '/agent-registration/account'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto p-4 max-w-4xl">
        {/* Registration Steps */}
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 text-white">
              1
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">REGISTRATION FORM</div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-teal-500"></div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 text-white">
              2
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">ACCOUNT FORM</div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-teal-500"></div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 text-white">
              3
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">APPLICATION STATUS</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16 flex flex-col items-center">
          {/* Illustration */}
          <div className="w-64 h-64 mb-8">
            <img 
              src="/verification-illustration.png" 
              alt="Verification" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22100%22 height%3D%22100%22 viewBox%3D%220 0 100 100%22%3E%3Ccircle cx%3D%2250%22 cy%3D%2250%22 r%3D%2240%22 stroke%3D%22%234338ca%22 stroke-width%3D%221%22 fill%3D%22%23e0e7ff%22 %2F%3E%3Cpath d%3D%22M30 50L45 65L70 35%22 stroke%3D%22%234338ca%22 stroke-width%3D%223%22 fill%3D%22none%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22 %2F%3E%3C%2Fsvg%3E'
              }}
            />
          </div>
          
          <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">Verifying Details</h1>
          
          <div className="text-center mb-6">
            <p className="text-gray-700 font-medium">Application ID: #{applicationId}</p>
          </div>
          
          <div className="max-w-md text-center mb-8">
            <p className="text-gray-700 mb-4">
              Our team is verifying your documents before you are officially onboarded on the Salesdrive Platform.
            </p>
            <p className="text-gray-700">
              You may come back to this page to check on your account status. You will be notified via email once validation is completed.
            </p>
          </div>
          
          <div className="mt-8">
            <Button
              variant="secondary"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentApplicationStatus 