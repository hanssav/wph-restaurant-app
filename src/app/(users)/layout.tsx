import Header from '@/components/container/header';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen relative'>
      <Header />
      {children}
    </div>
  );
};

export default UserLayout;
