import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const educationSchema = z.object({
  education: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    yearCompleted: z.string().min(1, 'Year completed is required'),
  })).min(1, 'At least one education record is required'),
});

interface EducationalDetailsProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const EducationalDetails: React.FC<EducationalDetailsProps> = ({ formData, onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: formData.education || [{ degree: '', institution: '', yearCompleted: '' }],
    },
  });

  const education = watch('education');

  const addEducation = () => {
    setValue('education', [...education, { degree: '', institution: '', yearCompleted: '' }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setValue('education', education.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Educational Details
      </h1>
      <p className="text-gray-600 mb-8">
        Please provide your educational background information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {education.map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Education #{index + 1}
              </h3>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Degree/Course"
                required
                error={errors.education?.[index]?.degree?.message}
                {...register(`education.${index}.degree`)}
              />
              <Input
                label="Institution"
                required
                error={errors.education?.[index]?.institution?.message}
                {...register(`education.${index}.institution`)}
              />
              <Input
                label="Year Completed"
                type="number"
                required
                error={errors.education?.[index]?.yearCompleted?.message}
                {...register(`education.${index}.yearCompleted`)}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education
        </Button>

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

export default EducationalDetails;