import { PATH } from '@/constants';
import { useCart } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { setCarts } from '@/store/slice/cart-slice';
import { Handbag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = { count?: number; isHome?: boolean; isScrolled: boolean };

export const HeaderCart = ({ isHome = false, isScrolled }: Props) => {
  const { data: cart, isLoading } = useCart();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (cart && !isLoading) {
      dispatch(setCarts({ cart }));
    }
  }, [cart, isLoading, dispatch]);

  const router = useRouter();

  return (
    <div
      className='relative cursor-pointer'
      onClick={() => router.push(PATH.CART)}
    >
      <Handbag
        className={cn(
          'size-7 md:size-8 aspect-square ',
          !isScrolled && isHome ? 'stroke-white' : 'stroke-neutral-950'
        )}
      />
      <div className='absolute -top-1 -right-1 bg-accent-red text-white aspect-square rounded-full size-5 flex-center text-[12px]'>
        {cart?.summary.totalItems ?? 0}
      </div>
    </div>
  );
};
