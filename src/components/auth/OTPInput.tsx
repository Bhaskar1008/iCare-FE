import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  isDisabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value,
  onChange,
  autoFocus = true,
  isDisabled = false,
}) => {
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize inputRefs with length
  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  // Auto focus on first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const target = e.target;
    let targetValue = target.value;
    
    // Keep only the last character if multiple are pasted/entered
    targetValue = targetValue.slice(-1);
    
    // Ensure input is numeric
    if (targetValue && !targetValue.match(/^[0-9]$/)) {
      return;
    }
    
    // Update the value
    const newValue = value.split('');
    newValue[index] = targetValue;
    onChange(newValue.join(''));

    // Move to next input if current one is filled
    if (targetValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // When backspace is pressed on an empty input, move to previous input
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const pasteData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted data is numeric and of expected length
    if (!pasteData.match(/^[0-9]+$/) || pasteData.length > length) {
      return;
    }
    
    // Update all inputs
    const newValue = pasteData.padEnd(length, '').split('').slice(0, length).join('');
    onChange(newValue);
    
    // Focus the field after the last pasted character
    const lastNonEmptyIndex = Math.min(pasteData.length, length) - 1;
    if (lastNonEmptyIndex < length - 1) {
      inputRefs.current[lastNonEmptyIndex + 1]?.focus();
      setActiveInput(lastNonEmptyIndex + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          ref={el => (inputRefs.current[index] = el)}
          value={value[index] || ''}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          onFocus={() => setActiveInput(index)}
          aria-label={`digit ${index + 1} of verification code`}
          className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-md focus:border-primary focus:outline-none transition-all disabled:bg-gray-100 disabled:opacity-70"
          style={{ caretColor: 'transparent' }}
          autoComplete="off"
          disabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default OTPInput;