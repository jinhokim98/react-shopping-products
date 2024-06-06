import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: 0,
    },
  },
});

export default queryClient;
