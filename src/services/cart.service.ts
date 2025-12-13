import { apiInstance } from '@/lib/api';
import { AddCartParams, AddCartResponse, GetCartResponse } from '@/types';

export const cartService = {
  getAll: async (): Promise<GetCartResponse> => {
    const { data } = await apiInstance.get<GetCartResponse>(`/cart`);
    return data;
  },

  add: async (req: AddCartParams): Promise<AddCartResponse> => {
    const { data } = await apiInstance.post<AddCartResponse>('/cart', req);

    return data;
  },

  update: async (req: { cartId: number; quantity: number }) => {
    const { data } = await apiInstance.put(`/cart/${req.cartId}`, req);
    return data;
  },

  remove: async (req: { cartId: number }) => {
    const { data } = await apiInstance.delete(`/cart/${req.cartId}`);
    return data;
  },

  clear: async () => {
    const { data } = await apiInstance.delete('/cart');

    return data;
  },
};
