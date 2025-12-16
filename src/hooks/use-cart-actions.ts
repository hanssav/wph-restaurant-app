import { useMutation } from '@/lib/react-query';
import { cartService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from '@/store/slice/cart-slice';
import { RootState } from '@/store/store';
import { CartItem, CartMenu, CartRestaurant, RestaurantMenu } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useMemo, useCallback } from 'react';

type UseCartActionsProps = {
  restaurantId: number;
  restaurant?: {
    id: number;
    logo: string;
    name: string;
    menus?: RestaurantMenu[];
    menuItem?: CartMenu;
  };
};

export const useCartActions = ({
  restaurantId,
  restaurant,
}: UseCartActionsProps) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const [loadingMenuIds, setLoadingMenuIds] = useState<Set<number>>(new Set());

  const addToCart = useMutation(cartService.add, {
    onMutate: (variables) => {
      setLoadingMenuIds((prev) => new Set(prev).add(variables.menuId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onSettled: (data, error, variables) => {
      setLoadingMenuIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(variables.menuId);
        return newSet;
      });
    },
  });

  const updateCart = useMutation(cartService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteCartItem = useMutation(cartService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const menusInCart = useMemo(() => {
    const found = cart?.cart.find(
      (item) => item.restaurant.id === restaurantId
    );
    return found?.items ?? [];
  }, [cart, restaurantId]);

  // Helper: Get quantity menu di cart
  const getMenuQuantity = useCallback(
    (menuId: number) => {
      const item = menusInCart.find((i) => i.menu.id === menuId);
      return item?.quantity ?? 0;
    },
    [menusInCart]
  );

  const isMenuLoading = useCallback(
    (menuId: number) => {
      return loadingMenuIds.has(menuId);
    },
    [loadingMenuIds]
  );

  const handleAddCart = useCallback(
    (menuId: number) => {
      if (!restaurant || !menuId) return;

      const menu = restaurant.menus
        ? restaurant.menus.find((m) => m.id === menuId)
        : restaurant.menuItem;

      if (!menu) return;

      const _restaurant: CartRestaurant = {
        id: restaurant.id,
        logo: restaurant.logo,
        name: restaurant.name,
      };

      const item: CartItem = {
        id: 0,
        menu: {
          id: menu.id,
          foodName: menu.foodName,
          price: menu.price,
          type: menu.type,
          image: menu.image,
        },
        quantity: 1,
        itemTotal: menu.price * 1,
      };

      // Update Redux (optimistic)
      dispatch(
        addCartItems({
          item,
          restaurant: _restaurant,
        })
      );

      addToCart.mutate({
        menuId,
        quantity: 1,
        restaurantId: restaurant.id,
      });
    },
    [restaurant, dispatch, addToCart]
  );

  const handleRemoveCart = useCallback(
    (menuId: number) => {
      if (!restaurant || !menuId) return;

      const cartGroup = cart?.cart.find(
        (item) => item.restaurant.id === restaurant.id
      );

      if (!cartGroup) return;

      const cartItem = cartGroup.items.find((i) => i.menu.id === menuId);
      if (!cartItem) return;

      const cartId = cartItem.id;

      setLoadingMenuIds((prev) => new Set(prev).add(menuId));

      if (cartItem.quantity > 1) {
        const newQuantity = cartItem.quantity - 1;

        // Update Redux
        dispatch(
          updateCartItemQuantity({
            restaurantId: restaurant.id,
            menuId,
            quantity: newQuantity,
          })
        );

        updateCart.mutate(
          {
            cartId,
            quantity: newQuantity,
          },
          {
            onSettled: () => {
              setLoadingMenuIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(menuId);
                return newSet;
              });
            },
          }
        );
      } else {
        // Jika quantity = 1, hapus
        dispatch(
          removeCartItem({
            restaurantId: restaurant.id,
            menuId,
          })
        );

        deleteCartItem.mutate(
          {
            cartId,
          },
          {
            onSettled: () => {
              setLoadingMenuIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(menuId);
                return newSet;
              });
            },
          }
        );
      }
    },
    [restaurant, cart, dispatch, updateCart, deleteCartItem]
  );

  return {
    menusInCart,

    getMenuQuantity,
    isMenuLoading,

    handleAddCart,
    handleRemoveCart,

    isAdding: addToCart.isPending,
    isUpdating: updateCart.isPending,
    isDeleting: deleteCartItem.isPending,
  };
};
