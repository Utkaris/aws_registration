'use client';

import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: readonly string[] | string[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormSelect({
  label,
  id,
  options,
  error,
  helperText,
  placeholder = 'Select an option',
  required,
  className = '',
  disabled,
  value,
  ...props
}: FormSelectProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          {label}
          {required && <span className="ml-1 text-[#A855F7]">*</span>}
          {!required && <span className="ml-1 text-[11px] font-normal text-[#94A3B8]/70">(Optional)</span>}
        </label>
      </div>

      <div className="relative flex items-center">
        <select
          id={id}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId || helperId}
          disabled={disabled}
          className={`w-full appearance-none rounded-lg bg-[#263344] text-sm text-[#F8FAFC] transition-all outline-none border pr-10 pl-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-[#303B4B] focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/25'
          } ${!value ? 'text-[#94A3B8]' : 'text-[#F8FAFC]'} ${className}`}
          {...props}
        >
          <option value="" disabled className="bg-[#1D2734] text-[#94A3B8]">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#1D2734] text-[#F8FAFC] py-1">
              {opt}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 pointer-events-none text-[#94A3B8]">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[#94A3B8] mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
