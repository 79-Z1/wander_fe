import React, {FC} from 'react';
import classNames from 'classnames';

import {Button} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

import IconGoogle from './icon-google';

type ILoginGoogleProps = IComponentBaseProps & {
  onSign?: () => void;
};

const LoginGoogle: FC<ILoginGoogleProps> = ({className, disabled, onSign}) => {
  return (
    <Button
      className={classNames(
        'comp-google w-full rounded-lg bg-stone-900 p-3 text-center text-white',
        disabled ? 'opacity-60' : '',
        className
      )}
      disabled={disabled}
      onClick={onSign}
    >
      <IconGoogle />
      <span className="hidden font-normal lg:block">{'Đăng nhập với Google'}</span>
    </Button>
  );
};

LoginGoogle.displayName = 'Login Google';

export default LoginGoogle;
