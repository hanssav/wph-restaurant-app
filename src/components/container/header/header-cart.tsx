import { PATH } from '@/constants';
import { usePrefetch } from '@/lib/react-query';
import { cn } from '@/lib/utils';
import { cartService } from '@/services';
import { Handbag } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = { count?: number; isHome?: boolean; isScrolled: boolean };

export const HeaderCart = ({
  count = 0,
  isHome = false,
  isScrolled,
}: Props) => {
  const prefetch = usePrefetch();
  const router = useRouter();
  const handleMouseEnter = () => {
    prefetch(['cart'], () => cartService.getAll(), { staleTime: 1000 * 60 });
  };

  return (
    <div
      className='relative cursor-pointer'
      onClick={() => router.push(PATH.CART)}
      onMouseEnter={handleMouseEnter}
    >
      <Handbag
        className={cn(
          'size-7 md:size-8 aspect-square ',
          !isScrolled && isHome ? 'stroke-white' : 'stroke-neutral-950'
        )}
      />
      <div className='absolute -top-1 -right-1 bg-accent-red text-white aspect-square rounded-full size-5 flex-center'>
        {count}
      </div>
    </div>
  );
};
