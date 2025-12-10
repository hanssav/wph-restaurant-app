import { apiInstance } from '@/lib/api';
import {
  GetRestaurantDetailParams,
  GetRestaurantDetailResponse,
  GetRestaurantParams,
  GetRestaurantsResponse,
  GetRestoBestSellerResponse,
  GetRestoResponse,
  RestoParams,
} from '@/types';

export const restaurantService = {
  getId: async (
    params?: GetRestaurantDetailParams
  ): Promise<GetRestaurantDetailResponse> => {
    const { data } = await apiInstance.get<GetRestaurantDetailResponse>(
      `/resto/${params?.id}`,
      { params }
    );

    return data;
  },

  getAll: async (
    params: GetRestaurantParams
  ): Promise<GetRestaurantsResponse> => {
    const { data } = await apiInstance.get<GetRestaurantsResponse>(`/resto`, {
      params,
    });

    return data;
  },

  getBestSellers: async (
    params: RestoParams
  ): Promise<GetRestoBestSellerResponse> => {
    const { data } = await apiInstance.get<GetRestoBestSellerResponse>(
      `/resto/best-seller`,
      { params }
    );
    return data;
  },

  getNearby: async (params: RestoParams): Promise<GetRestoResponse> => {
    const { data } = await apiInstance.get<GetRestoResponse>(`/resto/nearby`, {
      params,
    });
    return data;
  },

  search: async (params: RestoParams): Promise<GetRestoResponse> => {
    const { data } = await apiInstance.get<GetRestoResponse>(`/resto/search`, {
      params,
    });
    return data;
  },
};
