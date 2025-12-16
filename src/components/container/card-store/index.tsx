import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { Restaurant, RestaurantDetail } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react';

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
  hasNextPage?: boolean;
  handleLoadMore?: () => void;
  isFetchingNextPage?: boolean;
  label?: string;
} & React.ComponentProps<'button'>) => {
  if (!hasNextPage) return;

  return (
    <div className='w-full flex-center mt-6'>
      <Button
        variant='outline'
        className=''
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
  prefix,
  store,
  onPrefetch,
  ...props
}: {
  store: Restaurant | RestaurantDetail;
  onPrefetch?: (id: number) => void;
} & React.ComponentProps<'div'>) => {
  // mock distance, no in api
  // mock distance, no in api
  const [distance] = React.useState(() => (Math.random() * 9 + 1).toFixed(1));

  const router = useRouter();

  const handleHover = React.useCallback(() => {
    onPrefetch?.(store.id);
  }, [store.id, onPrefetch]);

  const handleClick = React.useCallback(() => {
    router.push(`${PATH.RESTAURANT}/${store.id}`);
  }, [router, store.id]);

  const isDetail = prefix === 'detail';
  return (
    <Card
      className='cursor-pointer'
      onMouseEnter={handleHover}
      onClick={handleClick}
      {...props}
    >
      <CardContent
        className={cn('flex-start gap-2 md:gap-4 w-full', isDetail && 'px-0')}
      >
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
