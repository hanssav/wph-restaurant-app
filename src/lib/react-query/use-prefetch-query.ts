import { QueryKey, useQueryClient } from '@tanstack/react-query';

/**
 * Custom usePrefetch hook for prefetching queries
 *
 * @example
 * const prefetchUser = usePrefetch();
 *
 * // Prefetch on hover
 * <Link
 *   onMouseEnter={() => prefetchUser(['user', id], () => userService.getById(id))}
 * >
 *   View User
 * </Link>
 */

export function usePrefetch() {
  const queryClient = useQueryClient();

  return <TData = unknown>(
    queryKey: QueryKey,
    queryFn: () => Promise<TData>,
    options?: {
      staleTime?: number;
    }
  ) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: options?.staleTime,
    });
  };
}
