import { cn } from '@/lib/utils';
import { Avatar } from '../avatar';

export const HeaderAvatar = ({
  src,
  username,
  isScrolled,
  isHome,
}: {
  src: string;
  username: string;
  isScrolled: boolean;
  isHome: boolean;
}) => {
  return (
    <div className='flex-center overflow-hidden gap-4 max-w-[137px]'>
      <Avatar src={src} alt={username ?? 'user-avatar'} />
      <p
        className={cn(
          'hidden md:block text-lg-semibold truncate text-white',
          !isScrolled && isHome ? 'text-neutral-25' : 'text-neutral-950'
        )}
      >
        {username}
      </p>
    </div>
  );
};
