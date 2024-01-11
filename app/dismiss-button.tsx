'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DismissButton({cookieString} : {cookieString: string}) {
  const router = useRouter();

  return (
    <button
      className="contents underline text-blue-600"
      onClick={() => {
        Cookies.set(cookieString, 'true');
        router.refresh();
      }}
    >
      Dismiss →
    </button>
  );
}
