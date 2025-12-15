import { FormFields } from '@/components/container/form-fields';
import { AvatarUpload } from '@/components/container/upload-filte';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { profileFormConfig } from '@/constants';
import { useUpdateProfile } from '@/hooks/use-update-profile';
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
    user,
  } = useUpdateProfile();

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    setOpen(false);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
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

        <div className='flex justify-end gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type='submit'>Update Profile</Button>
        </div>
      </form>
    </Form>
  );
};
