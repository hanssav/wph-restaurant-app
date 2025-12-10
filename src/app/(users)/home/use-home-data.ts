import { CATEGORY_MENU, CategoryId } from '@/constants';
import {
  useInfiniteQuery,
  usePrefetch,
  usePrefetchInfinite,
} from '@/lib/react-query';
import { restaurantService } from '@/services';
import {
  GetRestaurantParams,
  GetRestaurantsResponse,
  GetRestoBestSellerResponse,
  RestoParams,
  GetRestoResponse,
} from '@/types';
import React from 'react';

export const useHomeData = () => {
  const [category, setCategory] = React.useState<CategoryId>(
    CATEGORY_MENU[0].id
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState<RestoParams>({
    page: 1,
    limit: 10,
  });

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        q: searchQuery.trim() || undefined,
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (!searchQuery.trim()) {
      setCategory('all-restaurant');
    }
  };

  const allRestaurantsQuery = useInfiniteQuery<
    GetRestaurantsResponse,
    GetRestaurantParams
  >(['restaurants', 'all', filter], restaurantService.getAll, filter, {
    enabled: category === 'all-restaurant',
  });

  const bestSellersQuery = useInfiniteQuery<
    GetRestoBestSellerResponse,
    RestoParams
  >(
    ['restaurants', 'best-seller', filter],
    restaurantService.getBestSellers,
    filter,
    {
      enabled: category === 'best-seller',
    }
  );

  const nearbyQuery = useInfiniteQuery<GetRestoBestSellerResponse, RestoParams>(
    ['restaurants', 'nearby', filter],
    restaurantService.getNearby,
    filter,
    {
      enabled: category === 'nearby',
      meta: {
        suppressErrorToast: true,
      },
    }
  );

  const searchQueryResult = useInfiniteQuery<GetRestoResponse, RestoParams>(
    ['restaurants', 'search', filter],
    restaurantService.search,
    filter,
    {
      enabled: !!filter.q && filter.q.trim().length > 0,
    }
  );

  const getActiveQuery = () => {
    if (filter.q && filter.q.trim().length > 0) {
      return searchQueryResult;
    }

    switch (category) {
      case 'all-restaurant':
        return allRestaurantsQuery;
      case 'best-seller':
        return bestSellersQuery;
      case 'nearby':
        return nearbyQuery;
      default:
        return allRestaurantsQuery;
    }
  };

  const prefetchInfinite = usePrefetchInfinite();

  const handlePrefetchCategory = React.useCallback(
    (categoryId: CategoryId) => {
      switch (categoryId) {
        case 'all-restaurant':
          prefetchInfinite(
            ['restaurants', 'all', filter],
            ({ pageParam }) =>
              restaurantService.getAll({ ...filter, page: pageParam }),
            {
              initialPageParam: 1,
              getNextPageParam: (_, allPages) => allPages.length + 1,
            }
          );
          break;

        case 'best-seller':
          prefetchInfinite(
            ['restaurants', 'best-seller', filter],
            ({ pageParam }) =>
              restaurantService.getBestSellers({ ...filter, page: pageParam }),
            {
              initialPageParam: 1,
              getNextPageParam: (_, allPages) => allPages.length + 1,
            }
          );
          break;

        case 'nearby':
          prefetchInfinite(
            ['restaurants', 'nearby', filter],
            ({ pageParam }) =>
              restaurantService.getNearby({ ...filter, page: pageParam }),
            {
              initialPageParam: 1,
              getNextPageParam: (_, allPages) => allPages.length + 1,
            }
          );
          break;
      }
    },
    [filter, prefetchInfinite]
  );

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

  const activeQuery = getActiveQuery();

  return {
    searchQuery,
    setSearchQuery,
    handleSearchFocus,
    activeQuery,
    category,
    setCategory,
    handlePrefetchCategory,
    handlePrefetchRestaurant,
  };
};
