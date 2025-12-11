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
};
