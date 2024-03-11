import React, {FC, InputHTMLAttributes, useState} from 'react';
import classNames from 'classnames';

import {Icon, Input} from '@/core-ui';
import {TextInputType} from '@/core-ui/types';

import {IComponentBaseProps} from '@/common/interfaces';

interface IInputPasswordProps extends IComponentBaseProps {
  placeholder?: string;
  restInput?: InputHTMLAttributes<HTMLInputElement>;
  errors?: boolean;
}

const InputPassword: FC<IInputPasswordProps> = ({className, placeholder, restInput, errors, ...rest}) => {
  const [passwordType, setPasswordType] = useState<TextInputType>('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  return (
    <div className={classNames('comp-input-password relative', className)} data-testid="comp-input-password" {...rest}>
      <Input
        className={classNames(
          'w-full rounded-lg border border-default-border p-3 text-xs text-gray-400 md:text-sm',
          errors && 'focus:border-red-600'
        )}
        {...restInput}
        placeholder={placeholder}
        type={passwordType}
      />
      <Icon
        name={passwordType === 'password' ? 'ico-eye' : 'ico-eye-off'}
        size={20}
        onClick={togglePassword}
        className="absolute right-3 top-3 text-gray-500"
      />
    </div>
  );
};

InputPassword.displayName = 'InputPassword';

export default InputPassword;
