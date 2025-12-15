'use client';
import { Avatar } from '@/components/container/avatar';
import { PROFILE_MENU } from '@/components/container/header/header-constants';
import { Spin } from '@/components/container/spin';
import { ContainerWrapper } from '@/components/container/wrapper';
import { Card } from '@/components/ui/card';
import { useLogout } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  const logout = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) return <Spin />;

  return (
    <ContainerWrapper>
      <div className='flex flex-col md:flex-row gap-8'>
        <aside className='hidden md:block w-full md:w-60 md:shrink-0'>
          <Card className='flex flex-col rounded-2xl py-5 gap-1'>
            <div className='flex-start gap-2 pb-6 mx-5 mb-5 border-b border-neutral-200'>
              <Avatar src={user.avatar} alt={user.name} />
              <p className='text-md-bold'>{user.name}</p>
            </div>

            {PROFILE_MENU.map((menu) => {
              const isActive = pathname === menu.href;

              return (
                <div
                  key={menu.href}
                  className={cn(
                    'group flex-start gap-2 cursor-pointer px-5 py-3 rounded-md transition-colors',
                    isActive
                      ? 'text-primary-100'
                      : 'text-neutral-950 hover:bg-primary-100 hover:text-white'
                  )}
                  onClick={() => {
                    if (menu.label === 'Logout') return logout();
                    router.push(menu.href);
                  }}
                >
                  <menu.icon
                    className={cn(
                      'transition-colors',
                      isActive
                        ? 'stroke-primary-100'
                        : 'stroke-neutral-950 group-hover:stroke-white'
                    )}
                  />
                  <p className='transition-colors text-md-regular'>
                    {menu.label}
                  </p>
                </div>
              );
            })}
          </Card>
        </aside>

        <main className='flex-1 w-full md:max-w-[928px]'>{children}</main>
      </div>
    </ContainerWrapper>
  );
};

export default ProfileLayout;
