'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import RegistrationLayout from '@/components/RegistrationLayout';
import FormInput from '@/components/FormInput';
import PrimaryButton from '@/components/PrimaryButton';
import { useRegistration } from '@/context/RegistrationContext';
import { validatePersonal } from '@/lib/validations';
import { ValidationErrors } from '@/types/registration';

export default function PersonalInfoPage() {
  const router = useRouter();
  const { data, updateData } = useRegistration();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof typeof data, value: string) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: 'firstName' | 'middleName' | 'lastName') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validatePersonal({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    });
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validatePersonal({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ firstName: true, middleName: true, lastName: true });
      return;
    }

    // Advance to Academic Information step
    router.push('/register/academic');
  };

  return (
    <RegistrationLayout
      currentStepId={1}
      title="Personal Information"
      subtitle="Please enter your official legal name as printed on your student ID card."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="sm:col-span-1">
            <FormInput
              label="First Name"
              id="firstName"
              name="firstName"
              placeholder="e.g. Rahul"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              error={touched.firstName ? errors.firstName : undefined}
              required
              autoComplete="given-name"
              autoFocus
            />
          </div>

          {/* Middle Name */}
          <div className="sm:col-span-1">
            <FormInput
              label="Middle Name"
              id="middleName"
              name="middleName"
              placeholder="e.g. Kumar"
              value={data.middleName}
              onChange={(e) => handleChange('middleName', e.target.value)}
              onBlur={() => handleBlur('middleName')}
              error={touched.middleName ? errors.middleName : undefined}
              autoComplete="additional-name"
            />
          </div>

          {/* Last Name */}
          <div className="sm:col-span-2">
            <FormInput
              label="Last Name"
              id="lastName"
              name="lastName"
              placeholder="e.g. Sharma"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              error={touched.lastName ? errors.lastName : undefined}
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        {/* Security / Verification hint */}
        <div className="flex items-center gap-2 rounded-lg bg-[#263344]/50 border border-[#303B4B] p-3 text-xs text-[#94A3B8]">
          <User className="h-4 w-4 text-[#A855F7] shrink-0" />
          <span>
            Your official name will appear on AWS certificates, event badges, and verification records.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#303B4B]">
          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <PrimaryButton
            type="submit"
            className="w-full sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            <span>Continue to Academic</span>
          </PrimaryButton>
        </div>
      </form>
    </RegistrationLayout>
  );
}
