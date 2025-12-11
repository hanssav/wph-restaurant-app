import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

const Spin = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className='min-h-56 flex items-center justify-center w-full'>
      <div
        className={cn(
          'animate-spin rounded-full h-12 w-12 border-b-2 border-primary-100',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Spin;
