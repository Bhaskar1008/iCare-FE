import { useState } from 'react'
import { Header, Button } from '../../../components'

function AgentCreateAccount() {
  const [step, setStep] = useState(2)
  const [fileUploads, setFileUploads] = useState({
    newAgentProfile: null,
    examinationResult: null,
    accomplishedIC: null,
    sssID: null,
    tinID: null,
    itr: null,
    filingFee: null,
    otherIDs: null,
    arsp: null,
    loyaltyPlan: null,
    fcContract: null,
    trainingCertification: null,
    idPhoto: null
  })

  const handleBack = () => {
    window.location.href = '/agent-registration/form'
  }

  const handleNext = () => {
    // Navigate to the application status page
    window.location.href = '/agent-registration/status'
  }

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploads({
        ...fileUploads,
        [field]: e.target.files[0]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="container mx-auto p-4 max-w-4xl">
        {/* Registration Steps */}
        <div className="flex items-center mb-8 mt-8">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 text-white shadow-md">
              1
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">REGISTRATION FORM</div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-teal-500"></div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 text-white shadow-md">
              2
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">ACCOUNT FORM</div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-300"></div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-700 shadow-sm">
              3
            </div>
            <div className="absolute -bottom-6 whitespace-nowrap font-medium text-sm">APPLICATION STATUS</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-4 text-white">
              <h1 className="text-xl font-bold">Create Account</h1>
              <p className="text-blue-100 mt-1">Applicant Account Form</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Click here to open the form link, fill it out and submit.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-800">New Agent profile form</span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">Click to open</button>
                </div>
              </div>
            </div>
            
            {/* Footer with branded accent */}
            <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
          </div>

          <form className="space-y-6">
            {/* Examination Result */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    Examination Result (IC Or IIAP) (1 Page)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="examinationResult"
                      onChange={(e) => handleFileChange('examinationResult', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="examinationResult"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* Accomplished IC Application */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    Accomplished IC Application (4 Pages)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="accomplishedIC"
                      onChange={(e) => handleFileChange('accomplishedIC', e)}
                      className="hidden"
                      accept=".pdf"
                    />
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Download form here</a>
                    <label 
                      htmlFor="accomplishedIC"
                      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Browse
                    </label>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF file only</div>
              </div>
            </div>

            {/* SSS ID */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    SSS ID Or Any SSS Form Reflecting Name And Number. (1 Page)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="sssID"
                      onChange={(e) => handleFileChange('sssID', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="sssID"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* TIN ID */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    TIN ID Or TIN Verification. (1 Page)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="tinID"
                      onChange={(e) => handleFileChange('tinID', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="tinID"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* ITR In The Year */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    ITR In The Year Immediately Prior To Joining Salesverse
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="itr"
                      onChange={(e) => handleFileChange('itr', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="itr"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* Filing Fee */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    Filing Fee - P 1,645.00 Invoice (Official Receipt).
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="filingFee"
                      onChange={(e) => handleFileChange('filingFee', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="filingFee"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* 2 Other Valid Government-Issued IDs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    2 Other Valid Government-Issued IDs, If SSD ID Card Or TIN Card Does Have Embedded Pictures.
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="otherIDs"
                      onChange={(e) => handleFileChange('otherIDs', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      multiple
                    />
                  </div>
                  <label 
                    htmlFor="otherIDs"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* TO OBTAIN FINANCIAL CONSULTANT (FC) CODE */}
            <div className="mt-8 mb-4">
              <h3 className="text-base font-bold text-blue-900 uppercase">TO OBTAIN FINANCIAL CONSULTANT (FC) CODE</h3>
            </div>

            {/* Agent's Recruitment & Selection Profile */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    Agent's Recruitment & Selection Profile (ARSP)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="arsp"
                      onChange={(e) => handleFileChange('arsp', e)}
                      className="hidden"
                      accept=".pdf"
                    />
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Download form here</a>
                    <label 
                      htmlFor="arsp"
                      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Browse
                    </label>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF file only</div>
              </div>
            </div>

            {/* New Agent's Loyalty Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    New Agent's Loyalty Plan (For Group Insurance)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="loyaltyPlan"
                      onChange={(e) => handleFileChange('loyaltyPlan', e)}
                      className="hidden"
                      accept=".pdf"
                    />
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Download form here</a>
                    <label 
                      htmlFor="loyaltyPlan"
                      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Browse
                    </label>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF file only</div>
              </div>
            </div>

            {/* FC's Contract */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    FC's Contract
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="fcContract"
                      onChange={(e) => handleFileChange('fcContract', e)}
                      className="hidden"
                      accept=".pdf"
                    />
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Download form here</a>
                    <label 
                      htmlFor="fcContract"
                      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Browse
                    </label>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF file only</div>
              </div>
            </div>

            {/* Certification Of Completion Of Agent's Training */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    Certification Of Completion Of Agent's Training
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="trainingCertification"
                      onChange={(e) => handleFileChange('trainingCertification', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="trainingCertification"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Maximum 5 MB. PDF,PNG or JPG files</div>
              </div>
            </div>

            {/* 1-Piece 2x2 Picture */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">
                    <span className="text-red-500">* </span>
                    1-Piece 2x2 Picture. Colored. Attire: Dark Colors, Corporate. White Background
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-4">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      id="idPhoto"
                      onChange={(e) => handleFileChange('idPhoto', e)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </div>
                  <label 
                    htmlFor="idPhoto"
                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>
                <div className="mt-1 text-sm text-gray-500">Size: 2"×2 inch. Maximum 5 MB. PDF,PNG or JPG files only</div>
              </div>
            </div>
          </form>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 mb-8">
            <button 
              onClick={handleBack}
              className="flex-1 py-3 bg-white text-blue-800 font-medium rounded-lg border-2 border-blue-800 hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentCreateAccount 