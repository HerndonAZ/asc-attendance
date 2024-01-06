'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
const queryClient = new QueryClient();
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemeProvider
        enableSystem={true}
        attribute="class"
        defaultTheme="dark"
        // disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Suspense>
  );
}

export default Providers;
