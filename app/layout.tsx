import './globals.css';

import SiteInBetaNotice from '@/ui/Components/Notices/SiteInBetaNotice';
import { Analytics } from '@vercel/analytics/react';
import Providers from 'lib/providers';
import Script from 'next/script';
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
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/smr3juh.css"
        ></link>
      </head>
      <Script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogImRhZmVkZjE2LTc1ZTYtNGMwOS1hZWFmLTRlM2Q2MDEwYjA5OSIsICJpZCI6ICI4OTEwMjJhZi0xOGU4LTQ4N2UtYjdiNy02M2YxMjMxZjk1MzEiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.hmpG5z0MvTXwJl8WSHaUcyWkrLn3mb5pqLTlwGRD9C4"
      ></Script>
      <body className="h-full bg-gray-50 dark:bg-gray-900 font-Futura ">
        <Providers>
          <Suspense>
            <Nav />
          </Suspense>
          <div className="hidden">
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
