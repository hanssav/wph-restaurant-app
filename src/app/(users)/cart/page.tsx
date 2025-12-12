'use client';
import Spin from '@/components/container/spin';
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
import { useCart } from '@/hooks';

const CartPage = () => {
  const { data, isLoading } = useCart();

  console.log(data, 'data');

  if (isLoading) {
    return (
      <ContainerWrapper>
        <SectionWrapper title='My Cart'>
          <Spin />
        </SectionWrapper>
      </ContainerWrapper>
    );
  }

  if (!data || data.cart.length === 0) {
    return (
      <ContainerWrapper>
        <SectionWrapper title='My Cart'>
          <p>Your cart is empty</p>
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
                <CartItemRestaurant restaurant={restaurant} />
                {items.map((item) => (
                  <CartItemMenu key={item.id} item={item} />
                ))}
                <div className='border-t border-dashed border-neutral-300' />
                <CartItemSummary subTotal={subtotal} />
              </CartItem>
            );
          })}
        </Carts>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default CartPage;
