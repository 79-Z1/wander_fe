'use client';

import React, {ChangeEvent, FC, ForwardedRef, forwardRef, SelectHTMLAttributes} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

type ISelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<ISelectProps & ICoreUIBaseProps> = forwardRef(
  ({className, visible = true, children, onChange, ...rest}, ref: ForwardedRef<HTMLSelectElement>) => {
    if (!visible) return null;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event);
    };

    return (
      <select {...rest} ref={ref} className={classNames('abc-select form-select', className)} onChange={handleChange}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'ABCSelect';

export default Select;
