'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, RotateCw, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import RegistrationLayout from '@/components/RegistrationLayout';
import OtpInput from '@/components/OtpInput';
import PrimaryButton from '@/components/PrimaryButton';
import { useRegistration } from '@/context/RegistrationContext';
import { registrationApi, ApiError } from '@/lib/api';
import { validateOtp } from '@/lib/validations';

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
  const router = useRouter();
  const {
    data,
    isSubmitting,
    setIsSubmitting,
    apiError,
    setApiError,
    setRegistrationResult,
    isHydrated,
  } = useRegistration();

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccessMessage, setResendSuccessMessage] = useState<string | null>(null);

  // If user navigates directly without entering an email, redirect to contact step
  useEffect(() => {
    if (isHydrated && !data.email) {
      router.replace('/register/contact');
    }
  }, [isHydrated, data.email, router]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
    if (otpError) setOtpError(null);
    if (apiError) setApiError(null);
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOtpError(null);
    setApiError(null);
    setResendSuccessMessage(null);

    const validationMsg = validateOtp(otp);
    if (validationMsg) {
      setOtpError(validationMsg);
      return;
    }

    if (!data.email) {
      setApiError('Email address is missing. Please return to the contact step.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await registrationApi.verifyOtp({
        email: data.email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      // Save verified registration result into context
      setRegistrationResult(response);

      // Navigate to success page
      router.push('/register/success');
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setOtpError(err.message);
      } else {
        setOtpError('Failed to verify OTP code. Please double-check your code and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending || !data.email) return;

    setIsResending(true);
    setOtpError(null);
    setApiError(null);
    setResendSuccessMessage(null);

    try {
      const res = await registrationApi.resendOtp({
        email: data.email.trim().toLowerCase(),
      });

      setResendCooldown(res.expires_in_seconds || RESEND_COOLDOWN_SECONDS);
      setResendSuccessMessage(res.message || 'A fresh 6-digit verification code was sent to your email.');
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setApiError(err.message);
      } else {
        setApiError('Unable to resend OTP at this time. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleBack = () => {
    router.push('/register/contact');
  };

  return (
    <RegistrationLayout
      currentStepId={4}
      title="Verify Your Email"
      subtitle="We sent a 6-digit verification code to confirm your email address."
      apiError={apiError}
      onDismissError={() => setApiError(null)}
    >
      <form onSubmit={handleVerify} noValidate className="space-y-6">
        {/* Email banner display */}
        <div className="flex items-center justify-between rounded-xl bg-[#263344] border border-[#303B4B] p-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A855F7]/15 text-[#A855F7]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-[#94A3B8]">Verification code sent to:</p>
              <p className="font-semibold text-[#F8FAFC] tracking-wide break-all">
                {data.email || 'your-email@domain.com'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBack}
            className="text-xs font-semibold text-[#A855F7] hover:text-[#C084FC] transition-colors shrink-0 ml-2"
          >
            Change
          </button>
        </div>

        {/* Resend success banner */}
        {resendSuccessMessage && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-3 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{resendSuccessMessage}</span>
          </div>
        )}

        {/* OTP Input Component */}
        <div className="pt-2 pb-1">
          <div className="text-center mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Enter 6-Digit Code
            </label>
          </div>

          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            disabled={isSubmitting}
            hasError={Boolean(otpError)}
          />

          {otpError && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{otpError}</span>
            </p>
          )}
        </div>

        {/* Resend & timer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94A3B8] border-t border-[#303B4B] pt-4">
          <span>Didn&apos;t receive the email? Check your spam folder or resend.</span>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isResending || isSubmitting}
            className="inline-flex items-center gap-1.5 font-semibold text-[#A855F7] hover:text-[#C084FC] disabled:text-[#94A3B8]/60 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? (
              <>
                <RotateCw className="h-3.5 w-3.5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : resendCooldown > 0 ? (
              <span>Resend code in {resendCooldown}s</span>
            ) : (
              <>
                <RotateCw className="h-3.5 w-3.5" />
                <span>Resend Code</span>
              </>
            )}
          </button>
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
            <span>Back to Contact</span>
          </button>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Verifying OTP..."
            className="w-full sm:w-auto"
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            <span>Verify & Complete Registration</span>
          </PrimaryButton>
        </div>
      </form>
    </RegistrationLayout>
  );
}
