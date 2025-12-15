'use client';
import { Avatar } from '@/components/container/avatar';
import { SectionWrapper } from '@/components/container/wrapper';
import { UpdateProfileForm } from '@/components/pages/profile/profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React from 'react';

const Profile = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [open, setOpen] = React.useState<boolean>(false);

  const profile = [
    { label: 'Name', value: user?.name },
    { label: 'Email', value: user?.email },
    { label: 'Nomor Handphone', value: user?.phone },
  ];

  return (
    <SectionWrapper title='Profile'>
      <Card className='w-full max-w-[524px] py-4 md:py-5 space-y-2'>
        <CardHeader>
          <Avatar src={user?.avatar} alt={user?.name} className='size-16!' />
        </CardHeader>
        <CardContent className='space-y-2 md:space-y-3'>
          {profile.map((p, idx) => (
            <div className='flex-between' key={idx}>
              <p className='desc'>{p.label}</p>
              <h4 className='desc font-bold'>{p.value}</h4>
            </div>
          ))}
          <div className='pt-6'>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='w-full h-11'>Update Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <VisuallyHidden>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>Update profile</DialogDescription>
                  </VisuallyHidden>
                </DialogHeader>
                <DialogContent>
                  <UpdateProfileForm setOpen={setOpen} />
                </DialogContent>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
};

export default Profile;
