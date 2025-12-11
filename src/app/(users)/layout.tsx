import { Footer } from '@/components/container/footer';
import Header from '@/components/container/header';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex flex-col relative bg-white'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
