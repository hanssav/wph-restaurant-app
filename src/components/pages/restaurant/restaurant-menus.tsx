import { ItemCounter } from '@/components/container/item-counter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatMoney } from '@/lib/utils';
import { CartItem, RestaurantMenu } from '@/types';
import Image from 'next/image';
import React from 'react';

export const FilterMenu = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex-start gap-2 md:gap-3', className)} {...props} />
  );
};

export const Menus = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-5 md:gap-y-6',
      className
    )}
    {...props}
  />
);

export const MenusItems = ({
  menu,
  onAdd,
  menusInCart,
  onRemove,
  isLoading,
}: {
  menu: RestaurantMenu;
  onAdd: () => void;
  onRemove: () => void;
  menusInCart: CartItem[];
  isLoading: boolean;
}) => {
  const hasCart = menusInCart.filter((mn) => mn.menu.id === menu.id);
  const { quantity } = hasCart[0] ?? [];

  return (
    <Card className='p-0'>
      <CardContent className='px-0 rounded-2xl'>
        <div className='relative overflow-hidden aspect-square w-full rounded-t-2xl'>
          <Image
            src={menu.image}
            alt={menu.foodName}
            fill
            sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw'
            className='object-cover object-top'
            loading='eager'
            priority
          />
        </div>
        <div className='p-3 md:p-4 flex-col-start gap-4 md:flex-between'>
          <div className=''>
            <p className='desc font-medium'>{menu.foodName}</p>
            <h4 className='text-md-extrabold md:text-lg-extrabold'>
              {formatMoney(menu.price)}
            </h4>
          </div>
          {hasCart.length > 0 ? (
            <ItemCounter
              count={quantity ?? 0}
              onAdd={onAdd}
              onRemove={onRemove}
              isLoading={isLoading}
            />
          ) : (
            <Button
              disabled={isLoading}
              onClick={onAdd}
              className={cn(
                'w-full md:w-fit h-9 md:h-10',
                isLoading && 'disabled:opacity-100'
              )}
            >
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
