import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppProps } from 'next/app';

import { globalStyles } from '../../shared/styles';

const cache = createCache({ key: 'next' });

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        {globalStyles}
        <ToastContainer autoClose={5000} />
        <Component {...pageProps} />
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
