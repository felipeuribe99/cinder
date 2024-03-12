'use client';
import { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from '../../components/ui/button';
import { inputClassName } from '../../utils/classNames';
import { useRouter } from 'next/navigation';
import create from '@/services/users/create';

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await create(name, email, password);
      if (!res) {
        throw new Error('Invalid credentials');
      }
      setSuccess('User created successfully');
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success &&
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-dark text-lg">200 - You successfully signed up</h1>
          <h1 className="flex text-sm text-link-700">
            <Link href="/auth/login">Click here to sign in</Link>
          </h1>
        </div>
      </div>
      }
      {!success && 
      <form
        className="flex flex-col text-center text-neutral-900 gap-4"
        onSubmit={onSubmit}
      >
        <h1>Sign in</h1>
        <input
          className={inputClassName}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
          Sign up
        </PrimaryButton>
        {error && <div className="text-xs text-red-500 text-left">{error}</div>}
        <p className="text-xs text-neutral-700">
          Already have an account?
          <Link href="/auth/login">
            <span className="text-link-500"> Sign in</span>
          </Link>
        </p>
      </form>}
    </div>
  );
};

export default Signin;
