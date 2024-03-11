'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import {IconSizeType, ICoreUIBaseProps} from '../types';

interface IIconButtonProps extends ICoreUIBaseProps {
  name: string;
  size?: IconSizeType;
  onClick?: () => void;
}

const IconButton: FC<IIconButtonProps> = ({className, visible = true, disabled = false, name, size = 24, onClick}) => {
  if (!visible) return null;

  return (
    <button className={classNames('icon-btn', className)} onClick={onClick} disabled={disabled}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default IconButton;
