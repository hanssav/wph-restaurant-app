import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckoutAddressType, ICONS } from '@/constants';
import Image from 'next/image';

export const CheckoutAddress = ({
  address,
}: {
  address: CheckoutAddressType;
}) => {
  return (
    <Card className='w-full py-4 md:py-5 rounded-2xl'>
      <CardContent className='px-4 md:px-5 space-y-4 md:space-y-5'>
        <div className='space-y-1'>
          <div className='flex-start gap-2'>
            <div className='relative overflow-hidden size-6 aspect-square md:size-8'>
              <Image
                src={ICONS.PIN_LOCATION}
                alt='location-icon'
                fill
                sizes='24px'
                loading='lazy'
              />
            </div>
            <h4 className='title'>{address.label}</h4>
          </div>
          <p className='desc'>{address.deliveryAddress}</p>
          <p className='desc'>{address.phone}</p>
        </div>
        <Button
          variant={'outline'}
          className='h-8 md:h-10 w-full max-w-[100px]'
        >
          Change
        </Button>
      </CardContent>
    </Card>
  );
};
