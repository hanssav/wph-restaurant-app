import { useInfiniteQuery, usePrefetch } from '@/lib/react-query';
import { restaurantService } from '@/services';
import { GetRestaurantParams, GetRestaurantsResponse } from '@/types';
import React from 'react';

export const useRestaurant = ({ filter }: { filter: GetRestaurantParams }) => {
  const restaurantQuery = useInfiniteQuery<
    GetRestaurantsResponse,
    GetRestaurantParams
  >(['restaurants', 'all', filter], restaurantService.getAll, filter);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = restaurantQuery;

  const restaurants = React.useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      if (page.success && 'restaurants' in page.data) {
        return page.data.restaurants;
      }
      return [];
    });
  }, [data]);

  const handleLoadMore = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const prefetch = usePrefetch();

  const handlePrefetchRestaurant = React.useCallback(
    (restoId: number) => {
      prefetch(
        ['restaurant', restoId],
        () => restaurantService.getId({ id: restoId }),
        { staleTime: 1000 * 60 }
      );
    },
    [prefetch]
  );

  return {
    restaurantQuery,
    restaurants,
    isLoading,
    error,
    hasNextPage,
    handleLoadMore,
    isFetchingNextPage,
    handlePrefetchRestaurant,
  };
};
