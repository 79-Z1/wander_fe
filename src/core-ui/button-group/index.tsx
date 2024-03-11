'use client';

import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

interface IButtonGroupProps extends ICoreUIBaseProps {
  children?: ReactNode;
}

const ButtonGroup: FC<IButtonGroupProps> = ({className, visible = true, children, ...rest}) => {
  if (!visible) return null;

  return (
    <div className={classNames('abc-button-group', className)} {...rest}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ABCButtonGroup';

export default ButtonGroup;
