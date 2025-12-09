import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import React from 'react';

export const HeaderButtonAuth = ({
  className,
  variant,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <Button
      variant={variant}
      className={cn('min-w-[163px] px-4 py-2', className)}
      {...props}
    />
  );
};
