'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function PrimaryButton({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText,
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}: PrimaryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161D28] disabled:opacity-50 disabled:cursor-not-allowed select-none px-5 py-2.5';

  const variantClasses = {
    primary:
      'bg-[#A855F7] text-white hover:bg-[#9333EA] shadow-md shadow-[#A855F7]/25 active:bg-[#7E22CE] border border-transparent',
    secondary:
      'bg-[#263344] text-[#F8FAFC] hover:bg-[#303B4B] border border-[#303B4B] shadow-sm',
    outline:
      'bg-transparent text-[#F8FAFC] hover:bg-[#263344] border border-[#303B4B]',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#263344]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-current" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
