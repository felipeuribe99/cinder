import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen gap-4 bg-light">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-semibold text-dark text-lg">404 - Not Found</h1>
            <h1 className="flex text-sm text-link-700">
              <Link href="/">Click here to go home</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
