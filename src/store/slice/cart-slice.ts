import { CartData, CartItem, CartRestaurant, CartSummary } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Checkout extends CartSummary {
  bankName: string;
  date: Date | number;
}

interface CartState {
  cart: CartData | null;
  checkout: Checkout | null;
}

const initialState: CartState = {
  cart: null,
  checkout: null,
};

const updateCartSummary = (cart: CartData) => {
  cart.summary.restaurantCount = cart.cart.length;
  cart.summary.totalItems = cart.cart.reduce(
    (sum, group) => sum + group.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  cart.summary.totalPrice = cart.cart.reduce(
    (sum, group) => sum + group.subtotal,
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<{ cart: CartData }>) => {
      state.cart = action.payload.cart;
    },

    addCartItems: (
      state,
      action: PayloadAction<{
        item: CartItem;
        restaurant: CartRestaurant;
      }>
    ) => {
      const { item, restaurant } = action.payload;
      const { menu, quantity } = item;
      const itemTotal = menu.price * quantity;

      if (!state.cart) {
        state.cart = {
          cart: [
            {
              items: [{ ...item, id: Date.now(), itemTotal }],
              restaurant,
              subtotal: itemTotal,
            },
          ],
          summary: {
            restaurantCount: 1,
            totalPrice: itemTotal,
            totalItems: quantity,
          },
        };
        return;
      }

      const restaurantGroupIdx = state.cart.cart.findIndex(
        (group) => group.restaurant.id === restaurant.id
      );

      if (restaurantGroupIdx !== -1) {
        const group = state.cart.cart[restaurantGroupIdx];
        const existingItemIndex = group.items.findIndex(
          (i) => i.menu.id === menu.id
        );

        if (existingItemIndex !== -1) {
          const cartItem = group.items[existingItemIndex];
          cartItem.quantity += quantity;
          cartItem.itemTotal = cartItem.menu.price * cartItem.quantity;
        } else {
          group.items.push({ ...item, id: Date.now(), itemTotal });
        }

        group.subtotal = group.items.reduce((sum, i) => sum + i.itemTotal, 0);
      } else {
        state.cart.cart.push({
          restaurant,
          items: [{ ...item, id: Date.now(), itemTotal }],
          subtotal: itemTotal,
        });
      }

      updateCartSummary(state.cart);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        restaurantId: number;
        menuId: number;
        quantity: number;
      }>
    ) => {
      if (!state.cart) return;

      const { restaurantId, menuId, quantity } = action.payload;
      const groupIdx = state.cart.cart.findIndex(
        (group) => group.restaurant.id === restaurantId
      );

      if (groupIdx === -1) return;

      const group = state.cart.cart[groupIdx];
      const itemIdx = group.items.findIndex((i) => i.menu.id === menuId);

      if (itemIdx === -1) return;

      const item = group.items[itemIdx];
      item.quantity = quantity;
      item.itemTotal = item.menu.price * item.quantity;

      group.subtotal = group.items.reduce((sum, i) => sum + i.itemTotal, 0);
      updateCartSummary(state.cart);
    },

    removeCartItem: (
      state,
      action: PayloadAction<{
        restaurantId: number;
        menuId: number;
      }>
    ) => {
      if (!state.cart) return;

      const { menuId, restaurantId } = action.payload;
      const groupIdx = state.cart.cart.findIndex(
        (group) => group.restaurant.id === restaurantId
      );

      if (groupIdx === -1) return;

      const group = state.cart.cart[groupIdx];
      group.items = group.items.filter((i) => i.menu.id !== menuId);

      if (group.items.length === 0) {
        state.cart.cart.splice(groupIdx, 1);

        if (state.cart.cart.length === 0) {
          state.cart = null;
          return;
        }
      } else {
        group.subtotal = group.items.reduce((sum, i) => sum + i.itemTotal, 0);
      }

      updateCartSummary(state.cart);
    },

    removeCartGroup: (
      state,
      action: PayloadAction<{ restaurantId: number }>
    ) => {
      if (!state.cart) return;

      const groupIdx = state.cart.cart.findIndex(
        (group) => group.restaurant.id === action.payload.restaurantId
      );

      if (groupIdx === -1) return;

      state.cart.cart.splice(groupIdx, 1);

      if (state.cart.cart.length === 0) {
        state.cart = null;
        return;
      }

      updateCartSummary(state.cart);
    },

    checkout: (state, action: PayloadAction<{ checkout: Checkout }>) => {
      state.checkout = action.payload.checkout;
    },

    clearCart: (state) => {
      state.cart = null;
    },
  },
});

export const {
  setCarts,
  addCartItems,
  updateCartItemQuantity,
  removeCartItem,
  removeCartGroup,
  checkout,
  clearCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
