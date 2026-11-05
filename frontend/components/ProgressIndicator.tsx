'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, GraduationCap, Phone, ShieldCheck } from 'lucide-react';
import { StepDefinition } from '@/types/registration';

export const STEPS: StepDefinition[] = [
  {
    id: 1,
    key: 'personal',
    label: 'Personal Info',
    path: '/register',
    description: 'Name and identity',
  },
  {
    id: 2,
    key: 'academic',
    label: 'Academic Info',
    path: '/register/academic',
    description: 'College & branch',
  },
  {
    id: 3,
    key: 'contact',
    label: 'Contact Info',
    path: '/register/contact',
    description: 'Phone & email',
  },
  {
    id: 4,
    key: 'verify',
    label: 'Verification',
    path: '/register/verify-email',
    description: 'Email OTP code',
  },
];

interface ProgressIndicatorProps {
  currentStepId: number;
}

export default function ProgressIndicator({ currentStepId }: ProgressIndicatorProps) {
  const getStepIcon = (id: number) => {
    switch (id) {
      case 1:
        return User;
      case 2:
        return GraduationCap;
      case 3:
        return Phone;
      case 4:
        return ShieldCheck;
      default:
        return User;
    }
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentStepId - 1) / (STEPS.length - 1)) * 100)
  );

  return (
    <div className="w-full py-4" aria-label="Registration Progress">
      {/* Mobile view: Simple compact badge and progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2 font-medium">
          <span className="flex items-center gap-1.5 text-[#F8FAFC]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A855F7] text-white text-[11px] font-bold">
              {currentStepId}
            </span>
            <span>{STEPS.find((s) => s.id === currentStepId)?.label}</span>
          </span>
          <span>Step {currentStepId} of {STEPS.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#263344] border border-[#303B4B]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#A855F7] to-[#9333EA]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepId / STEPS.length) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Desktop view: Step nodes with connection line and icons */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute top-5 left-6 right-6 -z-0 h-0.5 bg-[#303B4B]" />

          {/* Animated Active Progress Line */}
          <div className="absolute top-5 left-6 right-6 -z-0 h-0.5">
            <motion.div
              className="h-full bg-[#A855F7]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>

          {STEPS.map((step) => {
            const isCompleted = step.id < currentStepId;
            const isCurrent = step.id === currentStepId;
            const IconComponent = getStepIcon(step.id);

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center group"
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Step Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.08 : 1,
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                    isCompleted
                      ? 'border-[#A855F7] bg-[#A855F7] text-white shadow-lg shadow-[#A855F7]/25'
                      : isCurrent
                      ? 'border-[#A855F7] bg-[#1D2734] text-[#A855F7] ring-4 ring-[#A855F7]/20 shadow-lg shadow-[#A855F7]/30'
                      : 'border-[#303B4B] bg-[#1D2734] text-[#94A3B8]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <IconComponent className="h-4 w-4" />
                  )}
                </motion.div>

                {/* Step Labels */}
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium transition-colors ${
                      isCurrent
                        ? 'text-[#F8FAFC] font-semibold'
                        : isCompleted
                        ? 'text-[#F8FAFC]'
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] hidden lg:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
