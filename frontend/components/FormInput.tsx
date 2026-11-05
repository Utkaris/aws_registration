'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
}

export default function FormInput({
  label,
  id,
  error,
  helperText,
  prefix,
  suffix,
  required,
  className = '',
  disabled,
  ...props
}: FormInputProps) {
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
        {prefix && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-xs font-semibold text-[#94A3B8] border-r border-[#303B4B] pr-2.5">
            {prefix}
          </div>
        )}

        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId || helperId}
          disabled={disabled}
          className={`w-full rounded-lg bg-[#263344] text-sm text-[#F8FAFC] placeholder-[#94A3B8]/60 transition-all outline-none border ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-[#303B4B] focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/25'
          } ${prefix ? 'pl-16 pr-4' : suffix ? 'pl-4 pr-12' : 'px-4'} py-2.5 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-xs text-[#94A3B8]">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5 animate-fadeIn" role="alert">
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
