import { ItemCounter } from '@/components/container/item-counter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartActions } from '@/hooks';
import { cn, formatMoney } from '@/lib/utils';
import { CartItem as CartItemType, CartRestaurant } from '@/types';
import { ChevronRight } from 'lucide-react';
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
  handleOnClick,
}: {
  restaurant: CartRestaurant;
  handleOnClick: () => void;
}) => {
  return (
    <div className='flex-start gap-1 md:gap-2' onClick={handleOnClick}>
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
};

export const CartItemMenu = ({
  className,
  item,
  restaurantId,
  restaurant,
  ...props
}: {
  item: CartItemType;
  restaurant: CartRestaurant;
  restaurantId: number;
} & React.ComponentProps<'div'>) => {
  const { handleAddCart, handleRemoveCart, getMenuQuantity, isMenuLoading } =
    useCartActions({
      restaurantId,
      restaurant: restaurant
        ? {
            id: restaurant.id,
            logo: restaurant.logo,
            name: restaurant.name,
            menuItem: item.menu,
          }
        : undefined,
    });

  const qty = getMenuQuantity(item.menu.id) ?? 0;

  return (
    <div className={cn('flex-between', className)} {...props}>
      <div className='flex-start gap-4'>
        <div className='relative overflow-hidden aspect-square size-16 md:size-20 rounded-[12px]'>
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
      <ItemCounter
        count={qty}
        isLoading={isMenuLoading(item.menu.id)}
        onAdd={() => handleAddCart(item.menu.id)}
        onRemove={() => handleRemoveCart(item.menu.id)}
      />
    </div>
  );
};

export const CartItemSummary = ({
  subTotal,
  handleClick,
}: {
  subTotal: number;
  handleClick: () => void;
}) => (
  <div className='flex-col-start gap-3 md:flex-between'>
    <div className=''>
      <p className='desc font-medium'>Total</p>
      <h4 className='text-lg-extrabold md:text-xl-extrabold'>
        {formatMoney(subTotal)}
      </h4>
    </div>
    <Button onClick={handleClick} className='w-full md:max-w-60 h-12'>
      Checkout
    </Button>
  </div>
);

export const CartItemOrderId = ({
  transactionId,
}: {
  transactionId: string;
}) => (
  <div className='mb-4 pb-3 border-b border-neutral-200'>
    <p className='text-sm text-neutral-600'>Order ID: {transactionId}</p>
  </div>
);

export const CartItemOrderMenu = ({
  item,
}: {
  item: {
    menuId: number;
    image: string;
    menuName: string;
    quantity: number;
    price: number;
  };
}) => (
  <div className='flex gap-4'>
    <div className='relative overflow-hidden aspect-square size-16 md:size-20 rounded-xl shrink-0'>
      <Image
        fill
        loading='lazy'
        sizes='(max-width: 768px) 64px, 80px'
        src={item.image}
        alt={item.menuName}
        className='object-cover'
      />
    </div>

    <div className='flex-1 min-w-0'>
      <p className='desc text-neutral-600 mb-1'>{item.menuName}</p>
      <h4 className='text-md-extrabold md:text-lg-extrabold'>
        {item.quantity}x {formatMoney(item.price)}
      </h4>
    </div>
  </div>
);

export const OrderSummary = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'bg-neutral-50 rounded-lg px-2 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3',
      className
    )}
    {...props}
  />
);

export const OrderSummaryInfo = ({
  restaurantName,
  subtotal,
}: {
  restaurantName: string;
  subtotal: number;
}) => (
  <div className='flex-1'>
    <p className='text-sm text-neutral-600 mb-1'>
      Subtotal from {restaurantName}
    </p>
    <h4 className='text-lg-extrabold md:text-xl-extrabold'>
      {formatMoney(subtotal)}
    </h4>
  </div>
);
