'use client';

import React, {ReactNode} from 'react';
import {SessionProvider} from 'next-auth/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import {CoreUIProvider, defaultTheme} from '@/core-ui';
import Tracking from '@/core-ui/third-party/tracking';

import {MediaContextProvider} from '@/common/components/media';

import ErrorBoundary from './error-fall-back';
import ServiceWorker from './service-worker';

import '@/libs/tailwindcss/tailwind.scss';
import '@/libs/tailwindcss/theme.scss';
import '@/libs/abc-icons/dist/abc.scss';
import '@/app/globals.css';

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 60 * 60 * 0.5, // 30 minutes
      // staleTime: 100000 // 10 seconds,
      refetchOnWindowFocus: false,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

type ProvidersProps = {
  children: ReactNode;
};

function Providers({children}: ProvidersProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister: asyncStoragePersister}}>
      <ErrorBoundary>
        <Tracking />
        <ServiceWorker />
        <CoreUIProvider theme={defaultTheme}>
          <MediaContextProvider disableDynamicMediaQueries>
            <SessionProvider>{children}</SessionProvider>
          </MediaContextProvider>
        </CoreUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
    </PersistQueryClientProvider>
  );
}

export default Providers;
