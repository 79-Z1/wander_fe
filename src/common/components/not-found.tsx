import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import noResult from '@/assets/no-result.svg';

export type TNotFoundScreenProps = IComponentBaseProps;

const NotFoundScreen: FC<TNotFoundScreenProps> = ({className}) => {
  return (
    <div className={cn('compname', className)} data-testid="NotFoundScreen">
      <div className="grid min-h-screen place-items-center p-4 sm:p-8">
        <div className="text-center">
          <p className="text-body-dark mb-4 text-sm uppercase tracking-widest sm:mb-5">Error code: 404</p>
          <h1 className="text-bolder mb-5 text-2xl font-bold leading-normal sm:text-3xl">
            {"Oops! Looks like this isn'\t a page"}
          </h1>
          <div className="mb-11">
            <Image src={noResult} alt={'Error code: 404'} />
          </div>
          <Link
            href={'/'}
            className="text-bolder hover:text-body-dark inline-flex items-center underline hover:no-underline focus:outline-none sm:text-base"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
};

NotFoundScreen.displayName = 'NotFoundScreen';

export default NotFoundScreen;
