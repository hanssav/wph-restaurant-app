import { PATH } from '@/constants';
import { ErrorResponse } from '@/types';
import axios, { AxiosError } from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Auto attach token
apiInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = PATH.AUTH;
      }
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(err: unknown): string {
  // Handle Axios errors
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;

    // Priority: response.data.message > response.data.error > err.message
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.data?.errors[0] ??
      axiosError.message;

    return message || 'An error occurred';
  }

  // Handle standard Error objects
  if (err instanceof Error) {
    return err.message;
  }

  // Handle string errors
  if (typeof err === 'string') {
    return err;
  }

  // Handle object with message property
  if (err && typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return 'Unknown error';
}
