'use client';
import { Footer } from '@/components/container/footer';
import Header from '@/components/container/header';
import { useProfile } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!!user) useProfile();

  const pathname = usePathname();
  const isUseLayout = !pathname.includes('success');

  return (
    <div className='min-h-screen flex flex-col relative bg-white'>
      {isUseLayout && <Header />}
      <div className={cn(isUseLayout && 'flex-1 mt-16 md:mt-20')}>
        {children}
      </div>
      {isUseLayout && <Footer />}
    </div>
  );
};

export default UserLayout;
