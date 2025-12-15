import { apiInstance } from '@/lib/api';
import {
  LoginFormData,
  RegisterFormData,
  UpdateProfileReq,
} from '@/lib/schema';
import { AuthResponse, ProfileResponse, UpdateProfileResponse } from '@/types';

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

  updateProfile: async (
    data: UpdateProfileReq
  ): Promise<UpdateProfileResponse> => {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.avatar) formData.append('avatar', data.avatar);

    const res = await apiInstance.put<UpdateProfileResponse>(
      `/auth/profile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },
};
