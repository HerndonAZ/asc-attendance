import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import Providers from 'lib/providers';

export const metadata = {
  title: 'ASC Realtime Attendance',
  description: 'Arizona Science Center realtime attendance reporting.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full bg-gray-50 dark:bg-gray-900 ">
        <Providers>
          <Suspense>
            <Nav />
          </Suspense>
          <main className="h-full relative">
            <Suspense>{children}</Suspense></main>

          <Analytics />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
