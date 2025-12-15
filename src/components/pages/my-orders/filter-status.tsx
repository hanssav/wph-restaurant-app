import { cn } from '@/lib/utils';
import React from 'react';

export const FilterStatus = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex-start gap-2 md:gap-3 overflow-x-auto', className)}
      {...props}
    />
  );
};
