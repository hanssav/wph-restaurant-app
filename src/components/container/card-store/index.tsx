import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { Restaurant } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react';

export const StoreError = () => (
  <div className='flex-center py-12'>
    <p className='text-lg text-primary-100'>
      Failed to load restaurants. Please try again.
    </p>
  </div>
);

export const StoreNotFound = () => (
  <div className='flex-center py-12 w-full'>
    <p className='text-lg text-neutral-500'>No restaurants found.</p>
  </div>
);

export const StoreList = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5',
        className
      )}
      {...props}
    />
  );
};

export const InfiniteButton = ({
  hasNextPage,
  handleLoadMore,
  isFetchingNextPage,
  label,
  children,
  ...props
}: {
  hasNextPage: boolean;
  handleLoadMore: () => void;
  isFetchingNextPage: boolean;
  label?: string;
} & React.ComponentProps<'button'>) => {
  if (!hasNextPage) return;

  return (
    <div className='w-full flex-center mt-6'>
      <Button
        variant='outline'
        className='w-full md:w-fit'
        onClick={handleLoadMore}
        disabled={isFetchingNextPage}
        {...props}
      >
        {isFetchingNextPage && label ? 'Loading...' : label}
        {!label && children}
      </Button>
    </div>
  );
};

export const StoreCard = ({
  store,
  onPrefetch,
}: {
  store: Restaurant;
  onPrefetch?: (id: number) => void;
}) => {
  // mock distance, no in api
  const distance = (Math.random() * 9 + 1).toFixed(1);
  const router = useRouter();

  const handleHover = React.useCallback(() => {
    onPrefetch?.(store.id);
  }, [store.id, onPrefetch]);

  const handleClick = React.useCallback(() => {
    router.push(`${PATH.RESTAURANT}/${store.id}`);
  }, [router, store.id]);

  return (
    <Card
      className='cursor-pointer'
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      <CardContent className='flex-start gap-2 md:gap-4 w-full'>
        <div className='relative overflow-hidden size-[90px] md:size-[120ox] rounded-[12px]'>
          <Image
            fill
            alt={store.name ?? 'store image'}
            src={store.logo}
            priority
            sizes='100vh'
            className='object-cover'
          />
        </div>
        <div className='space-y-0.5'>
          <h2 className='text-md-bold md:text-lg-bold text-neutral-950'>
            {store.name}
          </h2>
          <div className='flex-start gap-1'>
            <Star className='stroke-none fill-[#FFAB0D] size-4 aspect-square' />
            <p className='desc'>{store.star}</p>
          </div>
          <span className='flex items-center gap-1 desc'>
            {store.place}
            <span className='mx-1'>•</span>
            {distance} km
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
