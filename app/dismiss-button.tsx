'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DismissButton({cookieString, expiration} : {cookieString: string, expiration?: any}) {
  const router = useRouter();

  return (
    <button
      className="contents text-sm underline text-black dark:text-white pl-4"
      onClick={() => {
        Cookies.set(cookieString, 'true', {expires: expiration ? expiration : undefined});
        router.refresh();
      }}
    >
      Dismiss →
    </button>
  );
}
