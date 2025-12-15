import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '../avatar';

interface AvatarUploadProps {
  avatarUrl: string;
  avatarAlt: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhotoClick: () => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  avatarAlt,
  fileInputRef,
  onFileChange,
  onChangePhotoClick,
}) => {
  return (
    <div className='flex-col-start gap-4 w-full md:w-auto md:shrink-0'>
      <Avatar src={avatarUrl} alt={avatarAlt} className='size-[130px]!' />

      <Input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={onFileChange}
        className='hidden'
      />

      <Button type='button' variant='outline' onClick={onChangePhotoClick}>
        Change Photo
      </Button>
    </div>
  );
};
