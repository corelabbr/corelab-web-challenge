'use client';

import { useEffect } from 'react';
import { useHome } from '../providers/home-data-provider';
import { redirect } from 'next/navigation';
import LoadingScreen from '../presentation/components/Loading';

export default function Home() {
  const { homeData, isHomeDataLoading } = useHome();

  useEffect(() => {
    (async () => {
      if (!homeData) {
        redirect('/login');
      } else {
        redirect('/dashboard');
      }
    })();
  }, [homeData]);

  return <>{isHomeDataLoading && <LoadingScreen />}</>;
}
