import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { logout, setCredentials, updateUser } from '@/store/slice/auth-slice';
import { LoginFormData, RegisterFormData } from '@/lib/schema';
import { authService } from '@/services';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: (response) => {
      dispatch(setCredentials(response.data));
      router.push('/home');
    },
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      dispatch(setCredentials(response.data));
      router.push('/dashboard');
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

  return () => {
    dispatch(logout());
    queryClient.clear();
    router.push('/login');
  };
};
