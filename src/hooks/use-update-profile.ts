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
import { toast } from 'sonner';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
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

  const updateProfileMutation = useMutation(authService.updateProfile, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['profile'] });

      const previousUser = user;

      if (user) {
        const optimisticUser = {
          ...user,
          ...(newData.name && { name: newData.name }),
          ...(newData.email && { email: newData.email }),
          ...(newData.phone && { phone: newData.phone }),
          ...(newData.avatar && avatarPreview && { avatar: avatarPreview }),
        };

        dispatch(updateUser(optimisticUser));
      }

      toast.loading('Updating profile...', { id: 'update-profile' });

      return { previousUser };
    },

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to update profile', {
          id: 'update-profile',
        });
        return;
      }

      dispatch(updateUser(response.data));

      if (response.data.avatar) {
        setAvatarPreview(response.data.avatar);
      }

      form.setValue('avatar', undefined);

      queryClient.invalidateQueries({ queryKey: ['profile'] });

      toast.success(response.message || 'Profile updated successfully', {
        id: 'update-profile',
      });
    },

    onError: (error, _variables, context) => {
      if (context?.previousUser) {
        dispatch(updateUser(context.previousUser));
        setAvatarPreview(context.previousUser.avatar || '');
      }

      toast.error(error.message || 'Failed to update profile', {
        id: 'update-profile',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

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
    updateProfileMutation.mutate(data);
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
