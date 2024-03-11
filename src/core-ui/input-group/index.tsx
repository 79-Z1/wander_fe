'use client';

import React, {FC, ReactNode} from 'react';
import classNames from 'classnames';

export interface IInputGroupProps {
  className?: string;
  children: ReactNode;
}

const InputGroup: FC<IInputGroupProps> = ({className, children}) => {
  return <div className={classNames('input-group', className)}>{children}</div>;
};

InputGroup.displayName = 'Input.Group';

export default InputGroup;
