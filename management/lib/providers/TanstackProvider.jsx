"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Cache data for 10 minutes
        staleTime: 10 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 3,
        refetchIntervalInBackground: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnReconnectDelay: 1000 * 30,
        refetchOnError: true,
        refetchOnIdle: true,
        refetchInterval: 10 * 60 * 1000,
        staleTime: Infinity,
        cacheTime: Infinity,
        errorRetryTime: 5000,
        retryDelay: (attemptNumber) => Math.min(attemptNumber * 1000, 30000),
        retryOnTimeout: true,
        retryOnNetworkError: true,
      },
      mutations: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        cacheTime: 10 * 60 * 1000,
        staleTime: 10 * 60 * 1000,
        retry: 3,
        refetchIntervalInBackground: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: 10 * 60 * 1000,
        staleTime: Infinity,
        cacheTime: Infinity,
        errorRetryTime: 5000,
        retryDelay: (attemptNumber) => Math.min(attemptNumber * 1000, 30000),
        retryOnTimeout: true,
        retryOnNetworkError: true,
        retryOn4xx: true,
        retryOn5xx: true,
        retryOnNetworkError: true,
        retryOn500: true,
        retryOnTooManyRequests: true,
        retryOnTooManyRedirects: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
