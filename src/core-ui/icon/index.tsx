'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {IconSizeType, ICoreUIBaseProps} from '../types';

interface IIconProps extends ICoreUIBaseProps {
  className?: string;
  name: string;
  size?: IconSizeType;
  onClick?: () => void;
}

const Icon: FC<IIconProps> = ({className, visible = true, name, size = 20, onClick, ...rest}) => {
  if (!visible) return null;

  return (
    <i
      className={classNames('abc-icon', onClick && 'cursor-pointer', className, name, `size-${size}`)}
      onClick={onClick}
      {...rest}
    ></i>
  );
};

export default Icon;
