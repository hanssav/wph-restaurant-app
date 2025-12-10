import { QueryKey, useQueryClient } from '@tanstack/react-query';

/**
 * Custom usePrefetchInfinite hook for prefetching infinite queries
 *
 * @example
 * const prefetchRestaurants = usePrefetchInfinite();
 *
 * <Link
 *   onMouseEnter={() => prefetchRestaurants(
 *     ['restaurants', filter],
 *     ({ pageParam = 1 }) => restaurantService.getAll({ ...filter, page: pageParam }),
 *     {
 *       getNextPageParam: (lastPage, allPages) => {
 *         if (!lastPage?.data?.restaurants?.length) return undefined;
 *         return allPages.length + 1;
 *       }
 *     }
 *   )}
 * >
 *   View Restaurants
 * </Link>
 */
export function usePrefetchInfinite() {
  const queryClient = useQueryClient();

  return <TData = unknown>(
    queryKey: QueryKey,
    queryFn: (context: { pageParam: number }) => Promise<TData>,
    options?: {
      staleTime?: number;
      initialPageParam?: number;
      getNextPageParam?: (
        lastPage: TData,
        allPages: TData[]
      ) => number | undefined;
    }
  ) => {
    return queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: options?.initialPageParam ?? 1,
      staleTime: options?.staleTime,
      getNextPageParam:
        options?.getNextPageParam ??
        ((lastPage, allPages) => {
          // Default implementation: return next page number
          return allPages.length + 1;
        }),
    });
  };
}
