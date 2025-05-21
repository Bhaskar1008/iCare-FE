import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import Button from '../../../components/common/Button';

const personalDetailsSchema = z.object({
  applyAs: z.string().min(1, 'Please select agent type'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  pinCode: z.string().min(1, 'PIN code is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  gender: z.string().min(1, 'Gender is required'),
  phone: z.string().min(1, 'Phone number is required'),
  mobileNo: z.string().min(10, 'Mobile number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  tin: z.string().min(1, 'TIN is required'),
});

interface PersonalDetailsProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ formData, onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Agent Accreditation</h1>
        <p className="mt-2 text-gray-600">
          To know you better, fill out this form to complete your registration. Your details will be saved to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apply As <span className="text-red-500">*</span>
            </label>
            <select
              {...register('applyAs')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            >
              <option value="">Select Type of Agent</option>
              <option value="individual">Individual Agent</option>
              <option value="corporate">Corporate Agent</option>
            </select>
            {errors.applyAs && (
              <p className="mt-1 text-sm text-red-600">{errors.applyAs.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Isabella"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Middle Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('middleName')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter middle name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Mendoza"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('addressLine1')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter address line 1"
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              {...register('addressLine2')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter address line 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <select
              {...register('state')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            >
              <option value="">Select</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <select
              {...register('city')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            >
              <option value="">Select</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('pinCode')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter Pincode"
            />
            {errors.pinCode && (
              <p className="mt-1 text-sm text-red-600">{errors.pinCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('dateOfBirth')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="DD/MM/YYYY"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register('gender')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
            >
              <option value="">Enter middle name</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tel No <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter tel No"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value="+63 92345 67890"
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <span className="text-xs font-medium text-green-500 flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-20 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
                placeholder="Enter email id"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-cyan-500"
              >
                VERIFY
              </button>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              TIN No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('tin')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="Enter referral link"
            />
            {errors.tin && (
              <p className="mt-1 text-sm text-red-600">{errors.tin.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            variant="primary"
            className="bg-orange-500 hover:bg-orange-600"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;