'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {IComponentBaseProps} from '@/common/interfaces';

import Register from './components/register/register';

export type TRegisterModuleProps = IComponentBaseProps;

const RegisterModule: FC<TRegisterModuleProps> = ({className}) => {
  return (
    <div className={classNames('register-module', className)}>
      <Register />
    </div>
  );
};

RegisterModule.displayName = 'RegisterModule';

export default RegisterModule;
