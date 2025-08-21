import DismissButton from '@/app/dismiss-button';
import { cookies } from 'next/headers';
import React from 'react';
async function SiteInBetaNotice() {
  const cookieStore = await cookies();
  const cookieString = 'site-beta-notice';
  const expirationTime = new Date(new Date().getTime() + 15 * 1440 * 1000); // In fifteen moinutes

  const isHidden = cookieStore.get(cookieString);
  console.log(isHidden);
  return (
    <React.Fragment>
      {!isHidden ? (
        <div
          id="alert-1"
          className="flex items-center justify-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 text-center "
          role="alert"
        >
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            We are still testing this tool. Please be gentle and report any
            errors to herndonr@azscience.org
          </div>
          <div className="px-4">
            <DismissButton
              cookieString={cookieString}
              expiration={expirationTime}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}

export default SiteInBetaNotice;
