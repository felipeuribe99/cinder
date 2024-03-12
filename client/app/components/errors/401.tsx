import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-dark text-lg">401 - Unauthorized</h1>
        <h1 className="flex text-sm text-link-700">
          <Link href="/auth/signin">Click here to sign in</Link>
        </h1>
      </div>
    </div>
  );
};

export default Unauthorized;
