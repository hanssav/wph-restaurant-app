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

const queryClient = new QueryClient({
  // handle global error useQuery
  queryCache: new QueryCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  // handle global error useMutation
  mutationCache: new MutationCache({
    onError: (error) => toast.error(getErrorMessage(error)),
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
        <Toaster />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
