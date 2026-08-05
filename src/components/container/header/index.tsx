'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants';
import { useLogout } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from '../avatar';
import { HeaderAvatar } from './header-avatar';
import { HeaderButtonAuth } from './header-button-auth';
import { HeaderCart } from './header-cart';
import { PROFILE_MENU } from './header-constants';
import { HeaderLogo } from './header-logo';
import { useHeaderScroll } from './use-header-scroll';

const Header = () => {
  const logout = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname.includes(PATH.HOME);

  const { isScrolled } = useHeaderScroll(50);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const isLogin = !!user;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
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
                {PROFILE_MENU.map((menu) => {
                  const isActive = pathname === menu.href;

                  return (
                    <DropdownMenuItem
                      key={menu.href}
                      className={cn(
                        'group flex-start gap-2 px-3 py-2 w-56 rounded-md transition-colors cursor-pointer',
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
                      <span className='transition-colors text-md-regular'>
                        {menu.label}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
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
                    <HeaderButtonAuth
                      tab='sign-in'
                      className='flex-1'
                      variant='outline'
                    >
                      Sign In
                    </HeaderButtonAuth>
                    <HeaderButtonAuth tab='sign-up' className='flex-1'>
                      Sign Up
                    </HeaderButtonAuth>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex-start gap-4 hidden md:flex'>
              <HeaderButtonAuth
                tab='sign-in'
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
                tab='sign-up'
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
