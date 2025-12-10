import { Footer } from '@/components/container/footer';
import Header from '@/components/container/header';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex flex-col relative bg-neutral-50'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
