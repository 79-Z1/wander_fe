'use client';

import {FC} from 'react';
import classNames from 'classnames';

import LoginGoogle from '@/modules/auth/components/common/login-google';

import {IComponentBaseProps} from '@/common/interfaces';

import LoginFaceBook from './login-facebook';

type ILoginProvidersProps = IComponentBaseProps & {
  onSignGoogle?: () => void;
  onSignFacebook?: () => void;
};

const LoginProviders: FC<ILoginProvidersProps> = ({className, disabled, onSignGoogle, onSignFacebook, ...rest}) => {
  return (
    <div className={classNames('comp-login-providers', className)} data-testid="login-providers" {...rest}>
      <div className="flex gap-x-2">
        <LoginGoogle disabled={disabled} onSign={onSignGoogle} />
        <LoginFaceBook disabled={disabled} onSign={onSignFacebook} />
      </div>
    </div>
  );
};

LoginProviders.displayName = 'LoginProviders';

export default LoginProviders;
