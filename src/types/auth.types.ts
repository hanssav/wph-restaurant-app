import { ApiResponse, ApiSuccessResponse } from './api.types';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

export type AuthResponse = ApiSuccessResponse<{
  user: User;
  token: string;
}>;

export type ProfileResponse = ApiSuccessResponse<User>;

export type ErrorResponse = {
  success: false;
  message: string;
  errors: string[];
};

// export type RegisterData = {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// };

// export type LoginData = {
//   email: string;
//   password: string;
// };

export type Profile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileResponse = ApiResponse<Profile>;
