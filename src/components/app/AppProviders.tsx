
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import SafeTooltipProvider from "@/components/ui/SafeTooltipProvider";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SafeTooltipProvider>
          {children}
        </SafeTooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
