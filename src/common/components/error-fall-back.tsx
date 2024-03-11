'use client';

import {FC, ReactNode} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {ErrorBoundary as ReactErrorBoundary, useErrorBoundary} from 'react-error-boundary';

import {Button} from '@/core-ui';

import noResult from '@/assets/no-result.svg';

type ErrorFallbackProps = {
  error: Error;
};

const ErrorFallback: FC<ErrorFallbackProps> = ({error}) => {
  const {resetBoundary} = useErrorBoundary();
  const router = useRouter();

  const handleOnClickBackToHomePage = () => {
    router.push('/');
  };

  return (
    <>
      <div role="alert" className="flex h-full flex-col items-center justify-center space-y-3 text-slate-50">
        <h3> {"Oops! Looks like this isn'\t a page"}</h3>
        <Image src={noResult} alt={'Error code: 404'} width={300} height={300} />
        <div className="space-x-3">
          <Button variant="contained" color="light" text="Refresh" onClick={resetBoundary} />
          <Button variant="contained" color="primary" text={'Take me home'} onClick={handleOnClickBackToHomePage} />
        </div>
      </div>
      <div className="invisible absolute">
        <p>{error.name}</p>
        <p>{error.message}</p>
      </div>
    </>
  );
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorBoundary: FC<ErrorBoundaryProps> = ({children}) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
