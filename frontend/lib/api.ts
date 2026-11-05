import {
  InitiateRegistrationPayload,
  InitiateRegistrationResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ResendOtpPayload,
  RegistrationStatusResponse,
} from '@/types/registration';

export class ApiError extends Error {
  public statusCode: number;
  public fieldErrors?: Record<string, string[] | string>;
  public isNetworkError: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    fieldErrors?: Record<string, string[] | string>,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
    this.isNetworkError = isNetworkError;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8000/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data: unknown;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json().catch(() => ({}));
    } else {
      const text = await response.text().catch(() => '');
      data = { detail: text };
    }

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let fieldErrors: Record<string, string[] | string> | undefined;

      if (data && typeof data === 'object') {
        const obj = data as Record<string, unknown>;
        if (typeof obj.detail === 'string') {
          errorMessage = obj.detail;
        } else if (typeof obj.error === 'string') {
          errorMessage = obj.error;
        } else if (typeof obj.message === 'string') {
          errorMessage = obj.message;
        } else if (obj.errors && typeof obj.errors === 'object') {
          fieldErrors = obj.errors as Record<string, string[] | string>;
          const firstKey = Object.keys(fieldErrors)[0];
          const firstVal = fieldErrors[firstKey];
          errorMessage = Array.isArray(firstVal) ? `${firstKey}: ${firstVal[0]}` : `${firstKey}: ${firstVal}`;
        } else {
          // Check for Django REST Framework field-level errors: { "email": ["Already in use"] }
          const entries = Object.entries(obj);
          if (entries.length > 0) {
            fieldErrors = {} as Record<string, string[] | string>;
            const messages: string[] = [];
            for (const [key, val] of entries) {
              if (Array.isArray(val)) {
                fieldErrors[key] = val.map(String);
                messages.push(`${key}: ${val[0]}`);
              } else if (typeof val === 'string') {
                fieldErrors[key] = val;
                messages.push(`${key}: ${val}`);
              }
            }
            if (messages.length > 0) {
              errorMessage = messages[0];
            }
          }
        }
      }

      throw new ApiError(errorMessage, response.status, fieldErrors);
    }

    return data as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }

    // Network or server unreachable error
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'Request timed out. Please check your connection.'
        : `Unable to connect to the backend server (${API_BASE_URL}). Please verify that your Django API is running.`;

    throw new ApiError(message, 0, undefined, true);
  }
}

/**
 * Centralized API Service for Student Registration Portal
 */
export const registrationApi = {
  /**
   * Step 1: Initiate registration & trigger email OTP dispatch
   * POST /registration/initiate/
   */
  async initiateRegistration(payload: InitiateRegistrationPayload): Promise<InitiateRegistrationResponse> {
    return request<InitiateRegistrationResponse>('/registration/initiate/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Step 2: Verify email OTP code and finalize registration
   * POST /registration/verify-otp/
   */
  async verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
    return request<VerifyOtpResponse>('/registration/verify-otp/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Resend OTP verification code
   * POST /registration/resend-otp/
   */
  async resendOtp(payload: ResendOtpPayload): Promise<{ message: string; expires_in_seconds?: number }> {
    return request<{ message: string; expires_in_seconds?: number }>('/registration/resend-otp/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Check registration status by email
   * GET /registration/status/?email={email}
   */
  async getRegistrationStatus(email: string): Promise<RegistrationStatusResponse> {
    const encoded = encodeURIComponent(email);
    return request<RegistrationStatusResponse>(`/registration/status/?email=${encoded}`, {
      method: 'GET',
    });
  },
};
