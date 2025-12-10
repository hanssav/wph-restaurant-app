import {
  useMutation as useReactMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

/**
 * Custom useMutation hook wrapper
 *
 * @example
 * const { mutate } = useMutation(
 *   userService.create,
 *   {
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
 *   }
 * );
 */

export function useMutation<
  TData = unknown,
  TVariables = void,
  TError = Error,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
) {
  return useReactMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
}
