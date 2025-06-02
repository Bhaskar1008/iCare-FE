import React from 'react'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  children: React.ReactNode
}

function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses = 'rounded-md font-medium focus:outline-none transition-colors duration-150 flex items-center justify-center'
  
  // Variant specific classes
  const variantClasses = {
    primary: 'bg-blue-800 text-white hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
  }
  
  // Size specific classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  }
  
  // State classes
  const stateClasses = 
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
          <span>{typeof children === 'string' ? 'Processing...' : children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button 