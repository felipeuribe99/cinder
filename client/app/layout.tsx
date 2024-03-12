import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Topbar from './components/layout/topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen gap-4 bg-light">
          <Topbar />
          <div className="flex justify-center items-center">{children}</div>
        </div>
      </body>
    </html>
  );
}
