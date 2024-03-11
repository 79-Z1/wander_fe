'use client';

import React, {ChangeEvent, FC, ForwardedRef, forwardRef, InputHTMLAttributes, memo, ReactNode} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps, XPosition} from '../types';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  labelPosition?: XPosition;
  error?: ReactNode;
  color?: ColorType;
}

const Checkbox: FC<ICheckboxProps & ICoreUIBaseProps> = forwardRef(
  (
    {className, visible = true, color, label, labelPosition = 'end', disabled, error, onChange, ...rest},
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    if (!visible) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    return (
      <div className={classNames('abc-checkbox', color, disabled && 'disabled', error && 'error', className)}>
        <label>
          {label &&
            labelPosition === 'start' &&
            (typeof label === 'string' ? <span className="mr-2 block">{label}</span> : label)}
          <input {...rest} type="checkbox" className="form-checkbox" ref={ref} onChange={handleChange} />
          {label &&
            labelPosition === 'end' &&
            (typeof label === 'string' ? <span className="ml-2 block">{label}</span> : label)}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'ABCCheckbox';

export default memo(Checkbox);
