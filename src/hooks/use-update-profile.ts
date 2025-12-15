import { useMutation } from '@/lib/react-query';
import { UpdateProfileReq, UpdateProfileSchema } from '@/lib/schema';
import { authService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from '@/store/slice/auth-slice';
import { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string>(
    user?.avatar ?? ''
  );

  const form = useForm<UpdateProfileReq>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const updateProfileMutation = useMutation(authService.updateProfile);

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue('avatar', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: UpdateProfileReq) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (response) => {
        if (!response.success) return;

        // dispatch(updateUser(response.data));

        if (response.data.avatar) {
          setAvatarPreview(response.data.avatar);
        }

        form.setValue('avatar', undefined);

        queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    });
  };

  return {
    user,
    updateProfileMutation,
    fileInputRef,
    avatarPreview,
    setAvatarPreview,
    form,
    handleFileOnChange,
    onSubmit,
  };
};
