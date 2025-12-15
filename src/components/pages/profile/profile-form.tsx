import { FormFields } from '@/components/container/form-fields';
import { AvatarUpload } from '@/components/container/upload-filte';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { profileFormConfig } from '@/constants';
import { useUpdateProfile } from '@/hooks/use-update-profile';
import { Loader2 } from 'lucide-react';
import React from 'react';

export const UpdateProfileForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    avatarPreview,
    fileInputRef,
    form,
    handleFileOnChange,
    onSubmit,
    updateProfileMutation,
    user,
  } = useUpdateProfile();

  React.useEffect(() => {
    if (updateProfileMutation.isSuccess) {
      setOpen(false);
    }
  }, [updateProfileMutation.isSuccess, setOpen]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 md:space-y-6'
      >
        <AvatarUpload
          avatarUrl={avatarPreview}
          avatarAlt={user?.name || 'User avatar'}
          fileInputRef={fileInputRef}
          onFileChange={handleFileOnChange}
          onChangePhotoClick={() => fileInputRef.current?.click()}
        />
        {form.formState.errors.avatar && (
          <p className='text-sm text-destructive'>
            {form.formState.errors.avatar.message}
          </p>
        )}

        <div className='flex-1 w-full space-y-4'>
          {profileFormConfig.map((config) => (
            <FormFields
              key={config.name}
              control={form.control}
              config={config}
            />
          ))}
        </div>

        <div className='flex justify-end'>
          <Button type='submit' disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
