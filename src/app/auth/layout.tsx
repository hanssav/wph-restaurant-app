'use client';

import { IMAGES, PATH } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push(PATH.HOME);
    }
  }, [isAuthenticated, router]);

  return (
    <div className='min-h-screen flex-start'>
      <div className='hidden md:flex flex-1 relative overflow-hidden min-h-screen'>
        <Image
          src={IMAGES.AUTH_COVER}
          alt='auth-image'
          fill
          loading='eager'
          sizes='100vh'
          className='object-cover'
        />
      </div>

      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default AuthLayout;
