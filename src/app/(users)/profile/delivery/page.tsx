import { Truck } from 'lucide-react';

const Delivery = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <div className='rounded-full bg-primary-100/10 p-6'>
        <Truck className='h-12 w-12 text-primary-100' />
      </div>
      <div className='text-center space-y-2'>
        <p className='font-semibold text-lg'>Coming Soon</p>
        <p className='text-muted-foreground text-sm'>
          Delivery tracking feature will be available in the future
        </p>
      </div>
    </div>
  );
};

export default Delivery;
