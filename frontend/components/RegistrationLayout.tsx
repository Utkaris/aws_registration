'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ProgressIndicator from './ProgressIndicator';
import { AlertTriangle, X } from 'lucide-react';

interface RegistrationLayoutProps {
  children: React.ReactNode;
  currentStepId?: number;
  title: string;
  subtitle: string;
  apiError?: string | null;
  onDismissError?: () => void;
}

export default function RegistrationLayout({
  children,
  currentStepId,
  title,
  subtitle,
  apiError,
  onDismissError,
}: RegistrationLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#161D28] text-[#F8FAFC]">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 bg-grid-pattern">
        {/* Ambient Purple Radial Glow in Background */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl">
          {/* Progress Indicator */}
          {currentStepId && (
            <div className="mb-6">
              <ProgressIndicator currentStepId={currentStepId} />
            </div>
          )}

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full rounded-2xl border border-[#303B4B] bg-[#1D2734]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-sm"
          >
            {/* Header */}
            <div className="mb-6 border-b border-[#303B4B] pb-4">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC]">
                {title}
              </h1>
              <p className="mt-1 text-sm text-[#94A3B8]">{subtitle}</p>
            </div>

            {/* API Error Banner */}
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start justify-between gap-3 rounded-lg border border-rose-500/40 bg-rose-950/30 p-3.5 text-sm text-rose-300"
                role="alert"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                  <div className="leading-snug">
                    <p className="font-semibold text-rose-200">Registration Notice</p>
                    <p className="mt-0.5 text-xs text-rose-300/90">{apiError}</p>
                  </div>
                </div>
                {onDismissError && (
                  <button
                    type="button"
                    onClick={onDismissError}
                    className="rounded p-1 text-rose-400 hover:bg-rose-900/50 hover:text-rose-200 transition-colors"
                    aria-label="Dismiss error"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            )}

            {/* Form Content */}
            {children}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
