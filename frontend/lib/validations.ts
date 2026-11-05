import { RegistrationData, ValidationErrors } from '@/types/registration';

export const BRANCH_OPTIONS = [
  'Information Technology (IT)',
  'Computer Science and Engineering (CSE)',
  'CSE - Artificial Intelligence and Machine Learning',
  'CSE - Data Science',
  'Electronics and Communication Engineering (ECE)',
  'Electrical Engineering (EN)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
] as const;

export const ACADEMIC_YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
] as const;

export function validatePersonal(data: Pick<RegistrationData, 'firstName' | 'middleName' | 'lastName'>): ValidationErrors {
  const errors: ValidationErrors = {};

  const trimmedFirst = data.firstName?.trim() || '';
  if (!trimmedFirst) {
    errors.firstName = 'First name is required.';
  } else if (trimmedFirst.length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  } else if (!/^[A-Za-z\s'-]+$/.test(trimmedFirst)) {
    errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes.';
  }

  const trimmedMiddle = data.middleName?.trim() || '';
  if (trimmedMiddle && !/^[A-Za-z\s'-]+$/.test(trimmedMiddle)) {
    errors.middleName = 'Middle name can only contain letters, spaces, hyphens, and apostrophes.';
  }

  const trimmedLast = data.lastName?.trim() || '';
  if (!trimmedLast) {
    errors.lastName = 'Last name is required.';
  } else if (trimmedLast.length < 1) {
    errors.lastName = 'Last name must be at least 1 character.';
  } else if (!/^[A-Za-z\s'-]+$/.test(trimmedLast)) {
    errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes.';
  }

  return errors;
}

export function validateAcademic(data: Pick<RegistrationData, 'studentNumber' | 'branch' | 'academicYear'>): ValidationErrors {
  const errors: ValidationErrors = {};

  const trimmedStudentNumber = data.studentNumber?.trim() || '';
  if (!trimmedStudentNumber) {
    errors.studentNumber = 'Student number is required.';
  } else if (!/^[a-zA-Z0-9-]{3,20}$/.test(trimmedStudentNumber)) {
    errors.studentNumber = 'Please enter a valid student number (3-20 alphanumeric characters).';
  }

  if (!data.branch || !BRANCH_OPTIONS.includes(data.branch as typeof BRANCH_OPTIONS[number])) {
    errors.branch = 'Please select a valid branch from the list.';
  }

  if (!data.academicYear || !ACADEMIC_YEAR_OPTIONS.includes(data.academicYear as typeof ACADEMIC_YEAR_OPTIONS[number])) {
    errors.academicYear = 'Please select your academic year.';
  }

  return errors;
}

export function validateContact(data: Pick<RegistrationData, 'phoneNumber' | 'email'>): ValidationErrors {
  const errors: ValidationErrors = {};

  // Clean non-digits for validation
  const cleanPhone = (data.phoneNumber || '').replace(/\D/g, '');
  if (!cleanPhone) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (cleanPhone.length !== 10) {
    errors.phoneNumber = 'Phone number must be exactly 10 digits.';
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number starting with 6-9.';
  }

  const trimmedEmail = (data.email || '').trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. student@college.edu).';
  }

  return errors;
}

export function validateOtp(otp: string): string | null {
  const cleanOtp = (otp || '').trim();
  if (!cleanOtp) {
    return 'Please enter the 6-digit verification code.';
  }
  if (!/^\d{6}$/.test(cleanOtp)) {
    return 'The verification code must consist of exactly 6 numeric digits.';
  }
  return null;
}
