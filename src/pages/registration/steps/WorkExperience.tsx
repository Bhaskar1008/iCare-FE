import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const experienceSchema = z.object({
  experience: z.array(z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
  })),
});

interface WorkExperienceProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ formData, onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: formData.experience || [{ company: '', position: '', startDate: '', endDate: '', current: false }],
    },
  });

  const experience = watch('experience');

  const addExperience = () => {
    setValue('experience', [...experience, { company: '', position: '', startDate: '', endDate: '', current: false }]);
  };

  const removeExperience = (index: number) => {
    if (experience.length > 1) {
      setValue('experience', experience.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Work Experience
      </h1>
      <p className="text-gray-600 mb-8">
        Please provide your work experience details.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {experience.map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Experience #{index + 1}
              </h3>
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company"
                required
                error={errors.experience?.[index]?.company?.message}
                {...register(`experience.${index}.company`)}
              />
              <Input
                label="Position"
                required
                error={errors.experience?.[index]?.position?.message}
                {...register(`experience.${index}.position`)}
              />
              <Input
                label="Start Date"
                type="date"
                required
                error={errors.experience?.[index]?.startDate?.message}
                {...register(`experience.${index}.startDate`)}
              />
              <div className="space-y-2">
                <Input
                  label="End Date"
                  type="date"
                  disabled={watch(`experience.${index}.current`)}
                  error={errors.experience?.[index]?.endDate?.message}
                  {...register(`experience.${index}.endDate`)}
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    {...register(`experience.${index}.current`)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I currently work here
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Experience
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

export default WorkExperience;