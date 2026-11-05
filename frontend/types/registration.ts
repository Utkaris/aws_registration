export interface RegistrationData {
  firstName: string;
  middleName: string;
  lastName: string;
  studentNumber: string;
  branch: string;
  academicYear: string;
  phoneNumber: string;
  email: string;
}

export type RegistrationStep = 'personal' | 'academic' | 'contact' | 'verify' | 'success';

export interface StepDefinition {
  id: number;
  key: RegistrationStep;
  label: string;
  path: string;
  description: string;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[] | string>;
}

export interface InitiateRegistrationPayload {
  firstName: string;
  middleName?: string;
  lastName: string;
  studentNumber: string;
  branch: string;
  academicYear: string;
  phoneNumber: string;
  email: string;
}

export interface InitiateRegistrationResponse {
  message: string;
  email: string;
  expires_in_seconds?: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  registration_id?: string;
  student_id?: string;
  registered_at?: string;
  student?: {
    name: string;
    studentNumber: string;
    branch: string;
    academicYear: string;
    email: string;
  };
}

export interface ResendOtpPayload {
  email: string;
}

export interface RegistrationStatusResponse {
  status: 'PENDING' | 'VERIFIED' | 'COMPLETED' | 'NOT_FOUND';
  email: string;
  step?: string;
}
