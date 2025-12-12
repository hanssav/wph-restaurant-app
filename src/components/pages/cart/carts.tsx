import { ItemCounter } from '@/components/container/item-counter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatMoney } from '@/lib/utils';
import { CartItem as CartItemType, CartRestaurant } from '@/types';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const Carts = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('space-y-5', className)} {...props} />
);

type CartItemProps = React.ComponentProps<'div'>;

export const CartItem = ({ children, className, ...props }: CartItemProps) => {
  return (
    <Card className={cn('md:py-5', className)} {...props}>
      <CardContent className='md:px-5 space-y-3 md:space-y-5'>
        {children}
      </CardContent>
    </Card>
  );
};

export const CartItemRestaurant = ({
  restaurant,
}: {
  restaurant: CartRestaurant;
}) => (
  <div className='flex-start gap-1 md:gap-2'>
    <div className='relative overflow-hidden size-8 aspect-square'>
      <Image
        src={restaurant.logo}
        alt={restaurant.name}
        fill
        sizes='32px'
        loading='lazy'
        className='object-cover'
      />
    </div>
    <h2 className='text-md-bold md:text-lg-bold'>{restaurant.name}</h2>
    <ChevronRight className='size-5 aspect-square' />
  </div>
);

export const CartItemMenu = ({
  className,
  item,
  ...props
}: { item: CartItemType } & React.ComponentProps<'div'>) => (
  <div className={cn('flex-between', className)} {...props}>
    <div className='flex-start gap-4'>
      <div className='relative overflow-hidden aspect-square size-16 md:size-20'>
        <Image
          fill
          loading='lazy'
          sizes='(max-width: 768px) 64px, 80px'
          src={item.menu.image}
          alt={item.menu.foodName}
          className='object-cover'
        />
      </div>

      <div className=''>
        <p className='desc'>{item.menu.foodName}</p>
        <h4 className='text-md-extrabold md:text-lg-extrabold'>
          {formatMoney(item.menu.price)}
        </h4>
      </div>
    </div>
    <ItemCounter count={1} />
  </div>
);

export const CartItemSummary = ({ subTotal }: { subTotal: number }) => (
  <div className='flex-col-start gap-3 md:flex-between'>
    <div className=''>
      <p className='desc font-medium'>Total</p>
      <h4 className='text-lg-extrabold md:text-xl-extrabold'>
        {formatMoney(subTotal)}
      </h4>
    </div>
    <Button className='w-full md:max-w-60 h-12'>Checkout</Button>
  </div>
);
