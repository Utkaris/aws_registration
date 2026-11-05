'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  GraduationCap,
  Mail,
  Hash,
  Download,
  Calendar,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrimaryButton from '@/components/PrimaryButton';
import { useRegistration } from '@/context/RegistrationContext';

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const { data, registrationResult, clearData, isHydrated } = useRegistration();

  const [registeredDate, setRegisteredDate] = React.useState('November 5, 2026');

  // Guard: If not verified / no registration result, redirect to register
  useEffect(() => {
    if (isHydrated && !registrationResult && !data.email) {
      router.replace('/register');
    }
  }, [isHydrated, registrationResult, data.email, router]);

  useEffect(() => {
    if (registrationResult?.registered_at) {
      setRegisteredDate(
        new Date(registrationResult.registered_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    } else {
      setRegisteredDate(
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    }
  }, [registrationResult]);

  const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' ');
  const referenceId =
    registrationResult?.registration_id ||
    registrationResult?.student_id ||
    `AWS-STU-${(data.studentNumber || '2026').replace(/\s+/g, '').toUpperCase()}`;

  const handleFinish = () => {
    clearData();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#161D28] text-[#F8FAFC]">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 bg-grid-pattern">
        {/* Radial purple glow */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl border border-[#303B4B] bg-[#1D2734]/95 p-6 sm:p-10 shadow-2xl text-center backdrop-blur-sm"
          >
            {/* Animated Checkmark Badge */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#A855F7] to-[#C084FC] text-white shadow-xl shadow-[#A855F7]/30"
              >
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <Check className="h-10 w-10 stroke-[3]" />
                </motion.div>
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#161D28] border border-[#303B4B] text-[#A855F7]">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            </div>

            {/* Success Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight"
            >
              Registration Successful!
            </motion.h1>

            {/* Confirmation message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed"
            >
              Welcome to the AWS Builder Center student community. Your collegiate profile and email have been officially verified.
            </motion.p>

            {/* Registration Reference Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#303B4B] bg-[#263344] px-4 py-1.5 text-xs text-[#94A3B8]"
            >
              <Hash className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Reference ID:</span>
              <span className="font-mono font-bold text-[#F8FAFC]">{referenceId}</span>
            </motion.div>

            {/* Registration Card Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 rounded-xl border border-[#303B4B] bg-[#263344]/50 p-5 text-left text-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#303B4B]/60 pb-2">
                <span className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#A855F7]" /> Student Name
                </span>
                <span className="font-semibold text-[#F8FAFC]">{fullName || 'Registered Student'}</span>
              </div>

              {data.studentNumber && (
                <div className="flex items-center justify-between border-b border-[#303B4B]/60 pb-2">
                  <span className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 text-[#A855F7]" /> Student Number
                  </span>
                  <span className="font-mono text-[#F8FAFC]">{data.studentNumber}</span>
                </div>
              )}

              {data.branch && (
                <div className="flex items-center justify-between border-b border-[#303B4B]/60 pb-2">
                  <span className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[#A855F7]" /> Branch & Year
                  </span>
                  <span className="text-[#F8FAFC] text-right truncate max-w-[220px]">
                    {data.branch} ({data.academicYear || '1st Year'})
                  </span>
                </div>
              )}

              {data.email && (
                <div className="flex items-center justify-between border-b border-[#303B4B]/60 pb-2">
                  <span className="text-[#94A3B8] font-medium flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#A855F7]" /> Verified Email
                  </span>
                  <span className="text-[#F8FAFC] truncate max-w-[220px]">{data.email}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#94A3B8]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-emerald-400" /> Date
                </span>
                <span>{registeredDate}</span>
              </div>
            </motion.div>

            {/* Next Steps Info */}
            <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-left text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-emerald-200">Confirmation Sent:</span> A welcome orientation package and invitation to the AWS Student Discord and GitHub org have been sent to your registered email.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton
                type="button"
                onClick={handleFinish}
                fullWidth
                icon={<ArrowRight className="h-4 w-4" />}
              >
                <span>Return to Home</span>
              </PrimaryButton>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
