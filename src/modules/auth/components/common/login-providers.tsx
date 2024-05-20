'use client';

import {FC} from 'react';
import classNames from 'classnames';

import LoginGoogle from '@/modules/auth/components/common/login-google';

import {IComponentBaseProps} from '@/common/interfaces';

type ILoginProvidersProps = IComponentBaseProps & {
  onSignGoogle?: () => void;
};

const LoginProviders: FC<ILoginProvidersProps> = ({className, disabled, onSignGoogle, ...rest}) => {
  return (
    <div className={classNames('comp-login-providers', className)} data-testid="login-providers" {...rest}>
      <div className="flex gap-x-2">
        <LoginGoogle disabled={disabled} onSign={onSignGoogle} />
      </div>
    </div>
  );
};

LoginProviders.displayName = 'LoginProviders';

export default LoginProviders;
