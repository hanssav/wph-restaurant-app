'use client';

import {
  ContainerWrapper,
  SectionWrapper,
} from '@/components/container/wrapper';
import {
  CartItem,
  CartItemMenu,
  CartItemRestaurant,
  Carts,
} from '@/components/pages/cart';
import {
  CheckoutAddress,
  CheckoutPaymentMethod,
} from '@/components/pages/checkout';
import { useCheckout } from '@/hooks';

const CheckoutPage = () => {
  const {
    data,
    address,
    selectedBank,
    setSelectedBank,
    isCheckoutLoading,
    handleClickRestaurant,
    handleCheckout,
  } = useCheckout();

  if (!data || data.cart.length === 0) {
    return (
      <ContainerWrapper>
        <SectionWrapper title='Checkout'>
          <p>Your Checkout is empty</p>
        </SectionWrapper>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <SectionWrapper title='Checkout'>
        <div className='flex-col-start md:flex-row gap-4 md:gap-5'>
          <div className='w-full flex-col-start gap-4 md:gap-5'>
            <CheckoutAddress address={address} />
            <Carts className='w-full'>
              {data.cart.map((cart) => {
                const { items, restaurant } = cart;

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
                  </CartItem>
                );
              })}
            </Carts>
          </div>

          <CheckoutPaymentMethod
            handleBuy={handleCheckout}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            summary={data.summary}
            isCheckoutLoading={isCheckoutLoading}
          />
        </div>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default CheckoutPage;
