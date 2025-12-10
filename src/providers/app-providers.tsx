'use client';

import { Provider } from 'react-redux';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { rehydrateAuth } from '@/store/slice/auth-slice';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  // handle global error useQuery
  queryCache: new QueryCache({
    // META? custom show or hide toast
    onError: (error, query) => {
      if (query.meta?.suppressErrorToast) return;
      toast.error(getErrorMessage(error));
    },
  }),
  // handle global error useMutation
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressErrorToast) return;
      toast.error(getErrorMessage(error));
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // max fresh data
      gcTime: 1000 * 60 * 10, // cache time
    },
    mutations: {
      retry: false,
    },
  },
});

function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(rehydrateAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position='top-right' />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
