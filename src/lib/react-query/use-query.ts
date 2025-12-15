import {
  QueryKey,
  useQuery as useReactQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

/**
 * Custom useQuery hook wrapper
 *
 * @example
 * // Without params
 * const { data } = useQuery(['users'], userService.getAll);
 *
 * // With params
 * const { data } = useQuery(['user', id], userService.getById, id);
 *
 * // With options
 * const { data } = useQuery(
 *   ['user', id],
 *   () => userService.getById(id),
 *   { enabled: !!id }
 * );
 *
 * // with type
 *   const { data: resData } = useQuery<
 *    GetRestaurantsResponse,
 *    GetRestaurantParams
 *   >(['restaurants', filter], restaurantService.getAll, filter);
 */

type QueryOptionsWithoutKeyAndFn<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

export function useQuery<TData = unknown, TParams = void, TError = Error>(
  queryKey: QueryKey,
  queryFn: TParams extends void
    ? () => Promise<TData>
    : (params: TParams) => Promise<TData>,
  paramsOrOptions?: TParams extends void
    ? QueryOptionsWithoutKeyAndFn<TData, TError>
    : TParams,
  options?: QueryOptionsWithoutKeyAndFn<TData, TError>
) {
  const hasParams =
    paramsOrOptions !== undefined &&
    !('enabled' in ((paramsOrOptions as object) || {}));

  return useReactQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn: hasParams
      ? () =>
          (queryFn as (params: TParams) => Promise<TData>)(
            paramsOrOptions as TParams
          )
      : (queryFn as () => Promise<TData>),
    ...(hasParams
      ? options
      : (paramsOrOptions as QueryOptionsWithoutKeyAndFn<TData, TError>)),
  });
}
