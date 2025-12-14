'use client';

import React from 'react';
import { GetOrdersParams, GetOrdersResponse } from '@/types';
import { orderService } from '@/services';
import { useInfiniteQuery } from '@/lib/react-query';

export const useMyOrders = () => {
  const [params, setParams] = React.useState<GetOrdersParams>({
    status: 'done',
    page: 1,
    limit: 10,
  });

  const queryOrders = useInfiniteQuery<GetOrdersResponse, GetOrdersParams>(
    ['my-orders', params],
    orderService.get,
    params
  );
  const setSelectedStatus = React.useCallback(
    (status: GetOrdersParams['status']) => {
      setParams((prev) => ({
        ...prev,
        status,
      }));
    },
    []
  );

  const orders = React.useMemo(() => {
    if (!queryOrders.data?.pages) return;

    return queryOrders.data.pages.flatMap((page) => {
      if (page.success) return page.data.orders;
      return [];
    });
  }, [queryOrders.data]);

  return { params, setParams, queryOrders, setSelectedStatus, orders };
};
