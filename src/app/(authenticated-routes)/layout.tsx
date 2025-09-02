'use client';

import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useHome } from '../../providers/home-data-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData, isHomeDataLoading } = useHome();

  useLayoutEffect(() => {
    if (!homeData && !isHomeDataLoading) {
      redirect('/login');
    }
  }, [homeData, isHomeDataLoading]);

  return <>{children}</>;
}
