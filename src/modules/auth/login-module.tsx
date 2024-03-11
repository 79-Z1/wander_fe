'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {IComponentBaseProps} from '@/common/interfaces';

import Login from './components/login/login';

export type TLoginModuleProps = IComponentBaseProps;

const LoginModule: FC<TLoginModuleProps> = ({className}) => {
  return (
    <div className={classNames('login-module', className)}>
      <Login />
    </div>
  );
};

LoginModule.displayName = 'LoginModule';

export default LoginModule;
