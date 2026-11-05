'use client';

import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  disabled = false,
  hasError = false,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array of 6 characters
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  useEffect(() => {
    // Focus first input on mount if empty and not disabled
    if (!disabled && inputRefs.current[0] && !value) {
      inputRefs.current[0].focus();
    }
  }, [disabled, value]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digit = rawVal.replace(/\D/g, '').slice(-1); // take only the last entered digit

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newOtp = newDigits.join('');
    onChange(newOtp);

    // If a digit was entered, auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move to previous and clear it
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      } else if (digits[index]) {
        // Clear current
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    onChange(pastedData);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" role="group" aria-label="6-digit OTP verification code">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleInputChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of 6`}
          className={`h-12 w-11 sm:h-14 sm:w-13 rounded-xl bg-[#263344] text-center text-xl sm:text-2xl font-bold font-mono text-[#F8FAFC] transition-all outline-none border ${
            hasError
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/25'
              : 'border-[#303B4B] focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/30'
          } ${
            digits[i] ? 'border-[#A855F7]/60 shadow-sm shadow-[#A855F7]/15' : ''
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      ))}
    </div>
  );
}
