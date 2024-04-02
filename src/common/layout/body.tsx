import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';
import Providers from '@/common/layout/providers';

import {Toaster} from '@/components/ui/toaster';

import {IComponentBaseProps} from '@/common/interfaces';

import BodyInjector from './body-injector';
// import VerifyUser from './vefiry-user';

type BodyProps = IComponentBaseProps & {
  children: ReactNode;
};

const Body: FC<BodyProps> = ({className, children}) => {
  return (
    <body suppressHydrationWarning={true} className={classNames('flex h-full flex-col', className)}>
      <Providers>
        {children}
        <BodyInjector />
        <Toaster />
      </Providers>
    </body>
  );
};

export default Body;
