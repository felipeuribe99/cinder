'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen gap-4 bg-light">
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 items-center">
                <h1 className="font-semibold text-dark text-lg">Error</h1>
                <button
                  className="text-sm font-semibold text-link-900 underline"
                  onClick={() => reset()}
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Error;
