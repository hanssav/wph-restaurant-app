'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'border-input text-primary',
        'aspect-square size-6 shrink-0 rounded-full border shadow-xs',
        'transition-[color,box-shadow,background-color] outline-none',
        'focus-visible:ring-[3px] focus-visible:border-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary-100',
        'data-[state=checked]:border-primary-100',
        'data-[state=checked]:text-white',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='relative flex items-center justify-center'>
        <CircleIcon
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'size-2.5 fill-current'
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
