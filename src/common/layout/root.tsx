'use client';
import React, {FC, ReactNode} from 'react';
import {useSession} from 'next-auth/react';
import classNames from 'classnames';

import {IComponentBaseProps} from '@/common/interfaces/component.interface';

type RootProps = IComponentBaseProps & {
  children?: ReactNode;
};

const Root: FC<RootProps> = ({className, children}) => {
  const session = useSession();

  if (session.status === 'loading') {
    return null;
  }
  return <div className={classNames('root-app h-full', className)}>{children}</div>;
};

export default Root;
