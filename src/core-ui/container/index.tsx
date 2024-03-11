'use client';

import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

interface IContainerProps extends ICoreUIBaseProps {
  children?: ReactNode;
}

const Container: FC<IContainerProps> = ({className, visible = true, children}) => {
  if (!visible) return null;

  return <div className={classNames('container', className)}>{children}</div>;
};

Container.displayName = 'ABCContainer';

export default Container;
