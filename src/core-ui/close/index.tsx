'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import {ICoreUIBaseProps} from '../types';

interface ICloseProps extends ICoreUIBaseProps {
  onClick?: () => void;
}

const Close: FC<ICloseProps> = ({className, visible = true, onClick}) => {
  if (!visible) return null;

  return (
    <button className={classNames('abc-close', className)} onClick={onClick}>
      <Icon name="ico-x-circle" />
    </button>
  );
};

Close.displayName = 'ABCClose';

export default Close;
