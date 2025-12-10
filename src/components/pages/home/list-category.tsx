import { Card, CardContent } from '@/components/ui/card';
import { CategoryId, CategoryMenuItem, PATH } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react';

export const ListCategory = ({
  className,
  ...props
}: ComponentProps<'section'>) => {
  return (
    <section
      className={cn('flex flex-wrap gap-2 justify-between', className)}
      {...props}
    />
  );
};

ListCategory.displayName = 'ListCategory';

export const ListCategoryItems = ({
  data,
  category,
  setCategory,
  onPrefetch,
}: {
  data: CategoryMenuItem;
  category: CategoryId;
  setCategory: React.Dispatch<React.SetStateAction<CategoryId>>;
  onPrefetch?: (categoryId: CategoryId) => void;
}) => {
  const router = useRouter();
  const isActive = category === data.id;

  const handleClick = React.useCallback(() => {
    if (data.id === 'all-restaurant') {
      router.push(PATH.CATEGORY);
      return;
    }
    setCategory(data.id);
  }, [data.id, router, setCategory]);

  const handleHover = React.useCallback(() => {
    onPrefetch?.(data.id);
  }, [data.id, onPrefetch]);

  return (
    <div
      className='relative space-y-1 md:space-y-1.5 cursor-pointer'
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      <Card
        className={cn(
          'w-[106px] lg:w-[161px] h-[100px] rounded-2xl',
          isActive && 'bg-primary-100'
        )}
      >
        <CardContent className='h-full flex flex-col items-center justify-center gap-2'>
          <div className='relative overflow-hidden flex-center rounded-2xl size-12 lg:size-16'>
            <Image
              alt={data.label}
              src={data.icon}
              fill
              className='object-contain pointer-events-none'
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
