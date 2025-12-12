import { Button } from '@/components/ui/button';
import { PATH } from '@/constants';
import { formatMoney } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { Handbag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CheckoutAction = () => {
  const router = useRouter();
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const summary = cart?.summary;

  if (!summary?.totalItems) return;

  return (
    <div className='fixed py-4 bg-white bottom-0 w-full shadow-card'>
      <div className='flex-between container-x'>
        <div className='space-y-0.5 flex-1'>
          <div className='flex-start gap-2'>
            <Handbag className='size-5' />
            <p className='desc'>{summary.totalItems} Items</p>
          </div>
          <h4 className='text-md-extrabold md:text-xl-extrabold'>
            {formatMoney(summary.totalPrice)}
          </h4>
        </div>

        <Button
          className='p-2 h-10 md:h-11 w-full md:max-w-[230px] flex-1'
          onClick={() => router.push(PATH.CHECKOUT)}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
