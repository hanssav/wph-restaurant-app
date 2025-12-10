import {
  QueryKey,
  useInfiniteQuery as useReactInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query';

/**
 * Custom useInfiniteQuery hook for paginated data
 *
 * @example
 * const { data } = useInfiniteQuery(
 *   ['restaurants', filters],
 *   restaurantService.getAll,
 *   filters
 * );
 *
 * // Access data - TypeScript will infer correctly!
 * data?.pages[0]?.data?.restaurants
 */
export function useInfiniteQuery<
  TResponse,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TError = Error
>(
  queryKey: QueryKey,
  serviceFn: (
    params: TParams & { page: number; limit?: number }
  ) => Promise<TResponse>,
  filters?: TParams,
  options?: Omit<
    UseInfiniteQueryOptions<
      TResponse,
      TError,
      InfiniteData<TResponse>,
      QueryKey,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  return useReactInfiniteQuery<
    TResponse,
    TError,
    InfiniteData<TResponse>,
    QueryKey,
    number
  >({
    queryKey,
    queryFn: ({ pageParam }) =>
      serviceFn({
        ...filters,
        page: pageParam,
        limit: (filters?.limit as number | undefined) || 10,
      } as TParams & { page: number; limit?: number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isValidResponse =
        lastPage &&
        typeof lastPage === 'object' &&
        'success' in lastPage &&
        lastPage.success &&
        'data' in lastPage;

      if (!isValidResponse) return undefined;

      const data = lastPage.data as {
        pagination: {
          page: number;
          totalPages: number;
        };
      };

      const { page, totalPages } = data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    ...options,
  });
}
