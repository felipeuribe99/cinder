'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Confirm = () => {
  const router = useRouter();
  router.refresh();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-dark text-lg">
          You were successfully signed in!
        </h1>
        <h1 className="flex text-sm font-semibold text-link-900 underline">
          <Link href="/">Click here to go home</Link>
        </h1>
      </div>
    </div>
  );
};

export default Confirm;
