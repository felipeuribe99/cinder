'use client';
import { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from '../../components/ui/button';
import { inputClassName } from '../../utils/classNames';
import { useRouter } from 'next/navigation';
import signin from '@/services/login';

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signin(email, password);
      router.push('/');
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col text-center text-neutral-900 gap-4"
      onSubmit={onSubmit}
    >
      <h1>Sign in</h1>
      <input
        className={inputClassName}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className={inputClassName}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <PrimaryButton type="submit" loading={loading}>
        Sign in
      </PrimaryButton>
      {error && <div className="text-xs text-red-500 text-left">{error}</div>}
      <p className="text-xs text-neutral-700">
        Don't have an account?
        <Link href="/auth/signup">
          <span className="text-link-500"> Sign up</span>
        </Link>
      </p>
    </form>
  );
};

export default Signin;
