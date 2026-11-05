'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import RegistrationLayout from '@/components/RegistrationLayout';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import PrimaryButton from '@/components/PrimaryButton';
import { useRegistration } from '@/context/RegistrationContext';
import { validateAcademic, BRANCH_OPTIONS, ACADEMIC_YEAR_OPTIONS } from '@/lib/validations';
import { ValidationErrors } from '@/types/registration';

export default function AcademicInfoPage() {
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

  const handleBlur = (field: 'studentNumber' | 'branch' | 'academicYear') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validateAcademic({
      studentNumber: data.studentNumber,
      branch: data.branch,
      academicYear: data.academicYear,
    });
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAcademic({
      studentNumber: data.studentNumber,
      branch: data.branch,
      academicYear: data.academicYear,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ studentNumber: true, branch: true, academicYear: true });
      return;
    }

    router.push('/register/contact');
  };

  const handleBack = () => {
    router.push('/register');
  };

  return (
    <RegistrationLayout
      currentStepId={2}
      title="Academic Information"
      subtitle="Provide your institutional student enrollment details for university cohort matching."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Student Number */}
        <div>
          <FormInput
            label="Student Number / Roll Number"
            id="studentNumber"
            name="studentNumber"
            placeholder="e.g. 2100290120045 or CS2024-089"
            value={data.studentNumber}
            onChange={(e) => handleChange('studentNumber', e.target.value)}
            onBlur={() => handleBlur('studentNumber')}
            error={touched.studentNumber ? errors.studentNumber : undefined}
            helperText="Your official college roll number or university registration number."
            required
            autoFocus
          />
        </div>

        {/* Branch */}
        <div>
          <FormSelect
            label="Branch / Specialization"
            id="branch"
            name="branch"
            placeholder="Select your engineering branch"
            options={BRANCH_OPTIONS}
            value={data.branch}
            onChange={(e) => handleChange('branch', e.target.value)}
            onBlur={() => handleBlur('branch')}
            error={touched.branch ? errors.branch : undefined}
            required
          />
        </div>

        {/* Academic Year */}
        <div>
          <FormSelect
            label="Academic Year"
            id="academicYear"
            name="academicYear"
            placeholder="Select your current year of study"
            options={ACADEMIC_YEAR_OPTIONS}
            value={data.academicYear}
            onChange={(e) => handleChange('academicYear', e.target.value)}
            onBlur={() => handleBlur('academicYear')}
            error={touched.academicYear ? errors.academicYear : undefined}
            required
          />
        </div>

        {/* Info banner */}
        <div className="flex items-center gap-2 rounded-lg bg-[#263344]/50 border border-[#303B4B] p-3 text-xs text-[#94A3B8]">
          <GraduationCap className="h-4 w-4 text-[#A855F7] shrink-0" />
          <span>
            Academic branches help us recommend relevant AWS learning paths and collegiate hackathons.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#303B4B]">
          <button
            type="button"
            onClick={handleBack}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Personal</span>
          </button>

          <PrimaryButton
            type="submit"
            className="w-full sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            <span>Continue to Contact</span>
          </PrimaryButton>
        </div>
      </form>
    </RegistrationLayout>
  );
}
