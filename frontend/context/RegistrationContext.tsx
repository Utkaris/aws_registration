'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RegistrationData, VerifyOtpResponse } from '@/types/registration';

const INITIAL_DATA: RegistrationData = {
  firstName: '',
  middleName: '',
  lastName: '',
  studentNumber: '',
  branch: '',
  academicYear: '',
  phoneNumber: '',
  email: '',
};

const STORAGE_KEY = 'aws_reg_form_data';
const RESULT_KEY = 'aws_reg_result';

interface RegistrationContextType {
  data: RegistrationData;
  updateData: (fields: Partial<RegistrationData>) => void;
  clearData: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (loading: boolean) => void;
  apiError: string | null;
  setApiError: (err: string | null) => void;
  registrationResult: VerifyOtpResponse | null;
  setRegistrationResult: (result: VerifyOtpResponse | null) => void;
  isHydrated: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RegistrationData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [registrationResult, setRegistrationResultState] = useState<VerifyOtpResponse | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted non-sensitive registration progress from sessionStorage
  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData((prev) => ({ ...prev, ...parsed }));
      }
      const savedResult = sessionStorage.getItem(RESULT_KEY);
      if (savedResult) {
        setRegistrationResultState(JSON.parse(savedResult));
      }
    } catch {
      // Ignore sessionStorage parsing errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const updateData = useCallback((fields: Partial<RegistrationData>) => {
    setData((prev) => {
      const next = { ...prev, ...fields };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore quota/access errors
      }
      return next;
    });
  }, []);

  const setRegistrationResult = useCallback((result: VerifyOtpResponse | null) => {
    setRegistrationResultState(result);
    try {
      if (result) {
        sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
      } else {
        sessionStorage.removeItem(RESULT_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const clearData = useCallback(() => {
    setData(INITIAL_DATA);
    setRegistrationResultState(null);
    setApiError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(RESULT_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        data,
        updateData,
        clearData,
        isSubmitting,
        setIsSubmitting,
        apiError,
        setApiError,
        registrationResult,
        setRegistrationResult,
        isHydrated,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
