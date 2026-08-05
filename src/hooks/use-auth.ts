import { PATH } from '@/constants';
import { clearAuthCookie, setAuthCookie } from '@/lib/action';
import { LoginFormData, RegisterFormData } from '@/lib/schema';
import { authService } from '@/services';
import { useAppDispatch } from '@/store/hooks';
import { logout, setCredentials, updateUser } from '@/store/slice/auth-slice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: (response) => {
      dispatch(setCredentials(response.data));
      router.push(PATH.HOME);
    },
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: async (response) => {
      dispatch(setCredentials(response.data));
      await setAuthCookie(response.data.token);
      router.push(PATH.HOME);
    },
  });
};

export const useProfile = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await authService.getProfile();
      dispatch(updateUser(response.data));
      return response.data;
    },
    retry: false,
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    dispatch(logout());
    queryClient.clear();
    await clearAuthCookie();
    router.push(PATH.AUTH);
  };
};
