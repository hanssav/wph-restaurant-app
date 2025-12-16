'use client';
import { State } from '@/components/container/state';
import {
  ContainerWrapper,
  SectionWrapper,
} from '@/components/container/wrapper';
import {
  CartItem,
  CartItemMenu,
  CartItemRestaurant,
  CartItemSummary,
  Carts,
} from '@/components/pages/cart';
import { PATH } from '@/constants';
import { STATE_CONFIG } from '@/constants/state.constants';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cart: data } = useAppSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleClickCheckout = () => router.push(PATH.CHECKOUT);
  const handleClickRestaurant = (restaurantId: number) =>
    router.push(`${PATH.RESTAURANT}/${restaurantId}`);

  if (!data || data.cart.length === 0) {
    return (
      <ContainerWrapper>
        <SectionWrapper title='My Cart'>
          <State {...STATE_CONFIG.cart.empty} />
        </SectionWrapper>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <SectionWrapper title='My Cart'>
        <Carts>
          {data.cart.map((cart) => {
            const { items, restaurant, subtotal } = cart;

            return (
              <CartItem key={restaurant.id}>
                <CartItemRestaurant
                  restaurant={restaurant}
                  handleOnClick={() => handleClickRestaurant(restaurant.id)}
                />
                {items.map((item) => (
                  <CartItemMenu
                    key={item.id}
                    item={item}
                    restaurant={restaurant}
                    restaurantId={restaurant.id}
                  />
                ))}
                <div className='border-t border-dashed border-neutral-300' />
                <CartItemSummary
                  subTotal={subtotal}
                  handleClick={handleClickCheckout}
                />
              </CartItem>
            );
          })}
        </Carts>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default CartPage;
