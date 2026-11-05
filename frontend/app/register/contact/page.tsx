'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, PhoneCall, ShieldAlert } from 'lucide-react';
import RegistrationLayout from '@/components/RegistrationLayout';
import FormInput from '@/components/FormInput';
import PrimaryButton from '@/components/PrimaryButton';
import { useRegistration } from '@/context/RegistrationContext';
import { validateContact, validatePersonal, validateAcademic } from '@/lib/validations';
import { registrationApi, ApiError } from '@/lib/api';
import { ValidationErrors } from '@/types/registration';

export default function ContactInfoPage() {
  const router = useRouter();
  const {
    data,
    updateData,
    isSubmitting,
    setIsSubmitting,
    apiError,
    setApiError,
  } = useRegistration();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handlePhoneChange = (val: string) => {
    // Only keep numeric digits and max 10
    const digitsOnly = val.replace(/\D/g, '').slice(0, 10);
    updateData({ phoneNumber: digitsOnly });
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const handleEmailChange = (val: string) => {
    updateData({ email: val.trim() });
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleBlur = (field: 'phoneNumber' | 'email') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validateContact({
      phoneNumber: data.phoneNumber,
      email: data.email,
    });
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate step 3 fields
    const contactErrors = validateContact({
      phoneNumber: data.phoneNumber,
      email: data.email,
    });

    if (Object.keys(contactErrors).length > 0) {
      setErrors(contactErrors);
      setTouched({ phoneNumber: true, email: true });
      return;
    }

    // Double check earlier steps just in case user jumped straight to contact
    const personalErrors = validatePersonal(data);
    if (Object.keys(personalErrors).length > 0) {
      router.push('/register');
      return;
    }

    const academicErrors = validateAcademic(data);
    if (Object.keys(academicErrors).length > 0) {
      router.push('/register/academic');
      return;
    }

    // Call backend API to initiate registration and send OTP
    setIsSubmitting(true);
    try {
      await registrationApi.initiateRegistration({
        firstName: data.firstName.trim(),
        middleName: data.middleName.trim() || undefined,
        lastName: data.lastName.trim(),
        studentNumber: data.studentNumber.trim(),
        branch: data.branch,
        academicYear: data.academicYear,
        phoneNumber: data.phoneNumber.trim(),
        email: data.email.trim().toLowerCase(),
      });

      // Navigate to OTP verification page upon backend success
      router.push('/register/verify-email');
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.fieldErrors) {
          const newErrors: ValidationErrors = {};
          if (err.fieldErrors.phoneNumber) {
            newErrors.phoneNumber = Array.isArray(err.fieldErrors.phoneNumber)
              ? err.fieldErrors.phoneNumber[0]
              : err.fieldErrors.phoneNumber;
          }
          if (err.fieldErrors.email) {
            newErrors.email = Array.isArray(err.fieldErrors.email)
              ? err.fieldErrors.email[0]
              : err.fieldErrors.email;
          }
          if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
          }
        }
        setApiError(err.message);
      } else {
        setApiError('An unexpected error occurred while initiating registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/register/academic');
  };

  return (
    <RegistrationLayout
      currentStepId={3}
      title="Contact Information"
      subtitle="Enter your communication channels for account verification and builder notifications."
      apiError={apiError}
      onDismissError={() => setApiError(null)}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Phone Number */}
        <div>
          <FormInput
            label="Mobile Number"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            prefix="+91"
            placeholder="98765 43210"
            value={data.phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleBlur('phoneNumber')}
            error={touched.phoneNumber ? errors.phoneNumber : undefined}
            helperText="10-digit Indian mobile number for SMS alerts and urgent updates."
            required
            autoFocus
          />
        </div>

        {/* Email Address */}
        <div>
          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="student@university.edu or student@gmail.com"
            value={data.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            helperText="We will send a 6-digit one-time password (OTP) to this address."
            required
            autoComplete="email"
          />
        </div>

        {/* Verification Note */}
        <div className="flex items-start gap-2.5 rounded-lg bg-[#263344]/50 border border-[#303B4B] p-3 text-xs text-[#94A3B8]">
          <Mail className="h-4 w-4 text-[#A855F7] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-[#F8FAFC]">Instant Verification Required:</span> When you click &ldquo;Send Verification Code&rdquo;, our verification service will dispatch a 6-digit OTP code to your inbox.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#303B4B]">
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Academic</span>
          </button>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Dispatching OTP..."
            className="w-full sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            <span>Send Verification Code</span>
          </PrimaryButton>
        </div>
      </form>
    </RegistrationLayout>
  );
}
