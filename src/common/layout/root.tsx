import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {IComponentBaseProps} from '@/common/interfaces/component.interface';

type RootProps = IComponentBaseProps & {
  children?: ReactNode;
};

const Root: FC<RootProps> = ({className, children}) => {
  return <div className={classNames('root-app flex h-full grow flex-col', className)}>{children}</div>;
};

export default Root;
