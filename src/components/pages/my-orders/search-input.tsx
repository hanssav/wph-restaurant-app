import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

export const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <div className='relative'>
      <Search className='absolute left-4 top-1/2 -translate-y-1/2 size-5 stroke-neutral-500' />
      <Input
        className={cn(
          'h-11 rounded-full pl-11 placeholder:text-neutral-500',
          className
        )}
        placeholder='Search'
        id='search'
        {...props}
      />
    </div>
  );
};
