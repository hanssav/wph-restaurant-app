import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkout, clearCart } from '@/store/slice/cart-slice';
import { useMutation } from '@/lib/react-query';
import { cartService, checkoutService } from '@/services';
import { BANKS, BankName, deffaultAddress, PATH } from '@/constants';
import { CheckoutRequestBody } from '@/types';
import type { RootState } from '@/store/store';

export const useCheckout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { cart: data } = useAppSelector((state: RootState) => state.cart);

  const defaultBank: BankName = BANKS[0]?.name;
  const [selectedBank, setSelectedBank] = useState<BankName>(defaultBank);
  const [address, setAddress] = useState(deffaultAddress);

  const addCheckout = useMutation(checkoutService.post, {
    onSuccess: async () => {
      await cartService.clear();
      dispatch(clearCart());
      router.push(PATH.CHECKOUT_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleClickRestaurant = (restaurantId: number) => {
    router.push(`${PATH.RESTAURANT}/${restaurantId}`);
  };

  const handleCheckout = () => {
    if (!data || data.cart.length === 0) return;

    const restaurants = data.cart.flatMap((cart) => ({
      restaurantId: cart.restaurant.id,
      items: cart.items.flatMap((item) => ({
        menuId: item.menu.id,
        quantity: item.quantity,
      })),
    }));

    const addressReq = {
      phone: address.phone,
      deliveryAddress: address.deliveryAddress,
    };

    const req: CheckoutRequestBody = {
      restaurants,
      ...addressReq,
      paymentMethod: selectedBank,
      notes: '',
    };

    dispatch(
      checkout({
        checkout: {
          ...data.summary,
          bankName: selectedBank,
          date: Date.now(),
        },
      })
    );

    addCheckout.mutate(req);
  };

  return {
    data,
    address,
    setAddress,
    selectedBank,
    setSelectedBank,
    isCheckoutLoading: addCheckout.isPending,
    handleClickRestaurant,
    handleCheckout,
  };
};
