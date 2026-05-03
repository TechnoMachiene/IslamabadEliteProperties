"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { PropertyStoreProvider } from "@/store/PropertyStoreContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5 * 60_000, gcTime: 10 * 60_000, retry: 2 } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PropertyStoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </PropertyStoreProvider>
    </QueryClientProvider>
  );
}
