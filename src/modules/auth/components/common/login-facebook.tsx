import React, {FC} from 'react';
import classNames from 'classnames';

import {Button} from '@/core-ui';

import IconFacebook from '@/modules/auth/components/common/icon-facebook';

import {IComponentBaseProps} from '@/common/interfaces';

type ILoginFaceBookProps = IComponentBaseProps & {
  onSign?: () => void;
};

const LoginFaceBook: FC<ILoginFaceBookProps> = ({className, disabled, onSign}) => {
  return (
    <Button
      className={classNames(
        'comp-login-facebook',
        'w-full rounded-lg bg-stone-900 p-3 text-center text-white',
        disabled ? 'opacity-60' : '',
        className
      )}
      disabled={disabled}
      onClick={onSign}
    >
      <IconFacebook />
      <span className="hidden font-normal lg:block">{'Đăng nhập với Facebook'}</span>
    </Button>
  );
};

LoginFaceBook.displayName = 'LoginFaceBook';

export default LoginFaceBook;
