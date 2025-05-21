import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import Button from '../../../components/common/Button';

const documentSchema = z.object({
  validId: z.instanceof(File).optional(),
  nbiClearance: z.instanceof(File).optional(),
  tinCertificate: z.instanceof(File).optional(),
  photograph: z.instanceof(File).optional(),
});

interface DocumentUploadProps {
  formData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(documentSchema),
  });

  const documents = [
    { id: 'validId', label: 'Valid ID (Government Issued)' },
    { id: 'nbiClearance', label: 'NBI Clearance Certificate' },
    { id: 'tinCertificate', label: 'TIN Certificate' },
    { id: 'photograph', label: 'Photograph (2x2 with White Background)' },
  ];

  const handleDrop = useCallback((id: string, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setValue(id, file);
    }
  }, [setValue]);

  const handleRemove = (id: string) => {
    setValue(id, undefined);
  };

  const watchedFiles = watch();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Document Upload
      </h1>
      <p className="text-gray-600 mb-8">
        Please upload the required documents. Accepted formats: JPG, PDF
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {documents.map(({ id, label }) => (
            <div key={id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
              </label>

              {!watchedFiles[id] ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(id, e)}
                >
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.pdf"
                    {...register(id)}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag and drop your file here, or{' '}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => document.querySelector<HTMLInputElement>(`input[name="${id}"]`)?.click()}
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG or PDF (max. 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 rounded p-3">
                  <span className="text-sm text-gray-600">
                    {watchedFiles[id].name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {errors[id] && (
                <p className="mt-2 text-sm text-red-600">
                  {errors[id]?.message}
                </p>
              )}
            </div>
          ))}
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

export default DocumentUpload;