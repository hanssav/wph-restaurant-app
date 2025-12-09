import { Card, CardContent } from '@/components/ui/card';
import { CategoryMenuItem } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { ComponentProps } from 'react';

export const ListCategory = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  return (
    <section
      className={cn(
        'flex flex-wrap gap-2 md:gap-4 justify-center md:justify-between',
        className
      )}
      {...props}
    />
  );
};

ListCategory.displayName = 'ListCategory';

export const ListCategoryItems = ({ data }: { data: CategoryMenuItem }) => {
  return (
    <div className='space-y-1 md:space-y-1.5'>
      <Card className='w-[106px] lg:w-[161px] h-[100px] rounded-2xl'>
        <CardContent className='h-full flex flex-col items-center justify-center gap-2'>
          <div className='relative overflow-hidden flex-center rounded-2xl size-12 lg:size-16'>
            <Image
              alt={data.label}
              src={data.icon}
              fill
              className='object-contain'
              loading='lazy'
              sizes='(max-width: 1024px) 48px, 64px'
            />
          </div>
        </CardContent>
      </Card>
      <p className='text-sm-bold lg:text-lg-bold text-center line-clamp-1'>
        {data.label}
      </p>
    </div>
  );
};

ListCategoryItems.displayName = 'ListCategoryItems';
