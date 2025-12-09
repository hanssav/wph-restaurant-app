import { cn } from '@/lib/utils';
import { Handbag } from 'lucide-react';

type Props = { count?: number; isHome?: boolean };

export const HeaderCart = ({ count = 0, isHome = false }: Props) => {
  return (
    <div className='relative'>
      <Handbag
        className={cn(
          'size-7 md:size-8 aspect-square ',
          isHome ? 'stroke-white' : 'stroke-neutral-950'
        )}
      />
      <div className='absolute -top-1 -right-1 bg-accent-red text-white aspect-square rounded-full size-5 flex-center'>
        {count}
      </div>
    </div>
  );
};
