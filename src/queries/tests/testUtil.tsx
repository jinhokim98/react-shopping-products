import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <Suspense>{children}</Suspense>
  </QueryClientProvider>
);
