import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is "fresh" for 2 minutes. During this window,
      // navigating away and back shows cached data without refetching.
      staleTime: 2 * 60 * 1000,

      // Keep unused data in cache for 5 minutes before garbage collecting.
      // If the user revisits a page within 5 min, cached data is available.
      gcTime: 5 * 60 * 1000,

      // Retry failed requests 2 times before showing error state.
      retry: 2,

      // Don't refetch when the browser tab regains focus.
      // For crypto this could go either way, but it prevents
      // hammering the free API tier every time you switch tabs.
      refetchOnWindowFocus: false,
    },
  },
});
