import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export const ContainerWrapper = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div className={cn('container-x container-y', className)} {...props} />
  );
};
