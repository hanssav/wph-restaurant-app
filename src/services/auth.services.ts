import { apiInstance } from '@/lib/api';
import { LoginFormData, RegisterFormData } from '@/lib/schema';
import { AuthResponse, ProfileResponse } from '@/types';

export const authService = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await apiInstance.post<AuthResponse>(
      '/auth/register',
      data
    );
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await apiInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiInstance.get<ProfileResponse>('/auth/profile');
    return response.data;
  },
};
