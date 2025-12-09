'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HeaderLogo } from './header-logo';
import { PATH } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { HeaderAvatar } from './header-avatar';
import { HeaderCart } from './header-cart';
import { HeaderButtonAuth } from './header-button-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PROFILE_MENU } from './header-constants';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Avatar } from '../avatar';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname.includes(PATH.HOME);

  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const isLogin = !!token;

  if (!user) return;

  return (
    <header className='container-x flex-between py-3 md:py-4'>
      <HeaderLogo isHome={isHome} onClick={() => router.push(PATH.HOME)} />

      {isLogin ? (
        <div className='flex-start gap-4 md:gap-6 relative z-50'>
          <HeaderCart isHome={isHome} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <HeaderAvatar src={user.avatar} username={user?.name} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' sideOffset={20}>
              <DropdownMenuItem className='flex-start gap-2 px-3 py-3 border-b border-neutral-200'>
                <Avatar src={user.avatar} alt={user.name} />

                <p className='text-md-bold'>{user.name}</p>
              </DropdownMenuItem>
              {PROFILE_MENU.map((menu) => (
                <DropdownMenuItem
                  key={menu.href}
                  className={cn(
                    'group flex-start gap-2 px-3 py-2 w-56 rounded-md',
                    menu.className
                  )}
                >
                  <menu.icon
                    className={cn('group-hover:stroke-white', menu.className)}
                  />
                  <span className='group-hover:text-white'>{menu.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <div className='md:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <Menu className='stroke-white size-10' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='py-5 w-screen px-4'
                sideOffset={20}
              >
                <div className='flex-start gap-4'>
                  <HeaderButtonAuth className='flex-1' variant='outline'>
                    Sign In
                  </HeaderButtonAuth>
                  <HeaderButtonAuth className='flex-1'>
                    Sign Up
                  </HeaderButtonAuth>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex-start gap-4 hidden md:flex'>
            <HeaderButtonAuth
              variant='outline'
              className='text-neutral-25 border-neutral-25'
            >
              Sign In
            </HeaderButtonAuth>
            <HeaderButtonAuth variant='secondary'>Sign Up</HeaderButtonAuth>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
