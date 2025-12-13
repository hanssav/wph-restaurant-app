'use client';
import { Footer } from '@/components/container/footer';
import Header from '@/components/container/header';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
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
