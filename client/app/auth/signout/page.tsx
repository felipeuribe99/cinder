'use client';

import { logout } from '../../../services/auth/logout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Signout = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/auth/signout/confirm');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-dark text-lg">Signing you out...</h1>
    </div>
  );
};

export default Signout;
