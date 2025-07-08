'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Create a client
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Default stale time: 5 minutes
        staleTime: 5 * 60 * 1000,
        // Default cache time: 30 minutes
        gcTime: 30 * 60 * 1000, // Updated from cacheTime to gcTime
        // Retry failed requests 1 time
        retry: 1,
        // Don't refetch on window focus by default
        refetchOnWindowFocus: false,
        // Don't refetch on reconnect by default
        refetchOnReconnect: 'always',
      },
      mutations: {
        // Retry failed mutations 0 times
        retry: 0,
      },
    },
  });
};

export default function Providers({ children }) {
  // Create a new QueryClient instance for each request
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
