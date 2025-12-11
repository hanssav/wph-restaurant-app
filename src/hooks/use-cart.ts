import { cartService } from '@/services';
import { GetCartResponse, CartData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const useCart = () => {
  const { data, isLoading } = useQuery<GetCartResponse>({
    queryKey: ['cart'],
    queryFn: cartService.getAll,
  });

  const carts = React.useMemo<CartData | undefined>(() => {
    if (data?.success) return data.data;
    return undefined;
  }, [data]);

  return { data: carts, isLoading };
};
