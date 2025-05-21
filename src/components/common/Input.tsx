import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className={clsx('flex flex-col', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'block px-4 py-2.5 rounded-md border shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition duration-200',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-primary',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-1.5">
            {error ? (
              <p id={`${inputId}-error`} className="text-sm text-red-600">
                {error}
              </p>
            ) : helperText ? (
              <p id={`${inputId}-helper`} className="text-sm text-gray-500">
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;