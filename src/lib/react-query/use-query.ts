import {
  QueryKey,
  useQuery as useReactQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

/**
 * Custom useQuery hook wrapper
 *
 * @example
 * const { data } = useQuery(
 *   ['user', id],
 *   () => userService.getById(id),
 *   { enabled: !!id }
 * );
 */
export function useQuery<TData, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  return useReactQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}
