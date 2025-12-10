import {
  QueryKey,
  useInfiniteQuery as useReactInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

/**
 * Type constraint for responses that contain pagination
 */
type PaginatedData = {
  pagination: {
    page: number;
    totalPages: number;
  };
};

/**
 * Type constraint for API responses with success flag
 */
type ApiResponseWithPagination<T extends PaginatedData> = {
  success: boolean;
  data?: T;
};

/**
 * Reusable useInfiniteQuery hook for paginated data
 * Works with ApiResponse<T> where T contains pagination field
 *
 * @example
 * const { data, fetchNextPage } = useInfiniteQuery(
 *   ['restaurants', filters],
 *   restaurantService.getAll,
 *   { location: 'Jakarta' }
 * );
 */

export function useInfiniteQuery<
  TData extends PaginatedData,
  TResponse extends ApiResponseWithPagination<TData> = ApiResponseWithPagination<TData>,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TError = Error
>(
  queryKey: QueryKey,
  serviceFn: (
    params: TParams & { page: number; limit?: number }
  ) => Promise<TResponse>,
  filters?: TParams,
  options?: Omit<
    UseInfiniteQueryOptions<TResponse, TError, TResponse, QueryKey, number>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  return useReactInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      serviceFn({
        ...filters,
        page: pageParam,
        limit: (filters?.limit as number | undefined) || 10,
      } as TParams & { page: number; limit?: number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TResponse) => {
      if (lastPage.success && lastPage.data?.pagination) {
        const { pagination } = lastPage.data;
        if (pagination.page < pagination.totalPages) {
          return pagination.page + 1;
        }
      }

      return undefined;
    },
    ...options,
  });
}
