import { useQuery } from '@/lib/react-query';
import { restaurantService } from '@/services';
import {
  GetRestaurantDetailParams,
  GetRestaurantDetailResponse,
} from '@/types';
import React from 'react';

export const useRestaurantDetail = ({ id }: { id: number }) => {
  const [params, setParams] = React.useState<GetRestaurantDetailParams>({
    id,
  });

  const { data, isLoading } = useQuery<
    GetRestaurantDetailResponse,
    GetRestaurantDetailParams
  >(['restaurant', id], () => restaurantService.getId(params));

  const restaurant = React.useMemo(() => {
    if (!isLoading && data && data.success) {
      return data.data;
    }
    return undefined;
  }, [data, isLoading]);

  console.log(data, 'restaurant');

  return { restaurant };
};
