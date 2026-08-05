import { Button, buttonVariants } from '@/components/ui/button';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React from 'react';

interface HeaderButtonAuthProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  tab?: 'sign-in' | 'sign-up';
}

export const HeaderButtonAuth = ({
  className,
  variant,
  tab = 'sign-in',
  onClick,
  ...props
}: HeaderButtonAuthProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    const targetPath = tab ? `${PATH.AUTH}?tab=${tab}` : PATH.AUTH;
    router.push(targetPath);
  };
  return (
    <Button
      variant={variant}
      className={cn('min-w-[163px] px-4 py-2', className)}
      onClick={handleClick}
      {...props}
    />
  );
};
