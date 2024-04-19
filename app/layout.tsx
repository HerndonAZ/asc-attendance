import './globals.css';

import SiteInBetaNotice from '@/ui/Components/Notices/SiteInBetaNotice';
import { Analytics } from '@vercel/analytics/react';
import Providers from 'lib/providers';
import { Suspense } from 'react';
import Nav from './nav';
import Toast from './toast';

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
          <div className='hidden'>
          <SiteInBetaNotice />
          </div>
          <main className="h-full relative">
            <Suspense>{children}</Suspense>
          </main>

          <Analytics />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
