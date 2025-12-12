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
import { useHeaderScroll } from './use-header-scroll';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname.includes(PATH.HOME);
  const { isScrolled } = useHeaderScroll(50);

  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const isLogin = !!token;

  if (!user) return;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-600',
        isScrolled ? 'bg-white shadow-card' : 'bg-transparent'
      )}
    >
      <div className='container-x flex-between py-3 md:py-4 w-screen'>
        <HeaderLogo
          isHome={isHome}
          onClick={() => router.push(PATH.HOME)}
          isScrolled={isScrolled}
        />

        {isLogin ? (
          <div className='flex-start gap-4 md:gap-6 relative z-50'>
            <HeaderCart isHome={isHome} isScrolled={isScrolled} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <HeaderAvatar
                    isHome={isHome}
                    isScrolled={isScrolled}
                    src={user.avatar}
                    username={user?.name}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' sideOffset={20}>
                <DropdownMenuItem className='flex-start gap-2 px-3 py-3 border-b border-neutral-200'>
                  <Avatar src={user.avatar} alt={user.name} />

                  <p className={cn('text-md-bold')}>{user.name}</p>
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
                    <Menu
                      className={cn(
                        'size-10 transition-colors',
                        !isScrolled && isHome
                          ? 'stroke-white'
                          : 'stroke-neutral-900'
                      )}
                    />
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
                className={cn(
                  'transition-colors',
                  !isScrolled && isHome
                    ? 'text-neutral-25 border-neutral-25'
                    : 'text-neutral-900 border-neutral-300'
                )}
              >
                Sign In
              </HeaderButtonAuth>
              <HeaderButtonAuth
                variant={!isScrolled && isHome ? 'secondary' : 'default'}
              >
                Sign Up
              </HeaderButtonAuth>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
