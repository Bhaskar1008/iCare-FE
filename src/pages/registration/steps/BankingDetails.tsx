import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const bankingDetailsSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  branchName: z.string().min(1, 'Branch name is required'),
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
});

interface BankingDetailsProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const BankingDetails: React.FC<BankingDetailsProps> = ({ formData, onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bankingDetailsSchema),
    defaultValues: formData,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Agent Accreditation
      </h1>
      <p className="text-gray-600 mb-8">
        Please provide Bank Account Details For Crediting of Prospective Commissions.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Bank Name"
            required
            error={errors.bankName?.message}
            {...register('bankName')}
          />
          <Input
            label="Branch Name"
            required
            error={errors.branchName?.message}
            {...register('branchName')}
          />
          <Input
            label="Account Name"
            required
            error={errors.accountName?.message}
            {...register('accountName')}
          />
          <Input
            label="Account Number"
            required
            error={errors.accountNumber?.message}
            {...register('accountNumber')}
          />
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            fullWidth
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BankingDetails;