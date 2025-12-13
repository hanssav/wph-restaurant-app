import { apiInstance } from '@/lib/api';
import {
  CheckoutRequestBody,
  GetOrdersParams,
  GetOrdersResponse,
} from '@/types';

export const checkoutService = {
  get: async (params: GetOrdersParams): Promise<GetOrdersResponse> => {
    const { data } = await apiInstance.get<GetOrdersResponse>(
      '/order/my-order',
      { params }
    );

    return data;
  },
  post: async (req: CheckoutRequestBody) => {
    const { data } = await apiInstance.post(`/order/checkout`, req);

    return data;
  },
};
