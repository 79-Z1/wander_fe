'use client';

import React, {ChangeEvent, FC, ForwardedRef, forwardRef, InputHTMLAttributes, memo, ReactNode} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps, XPosition} from '../types';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  labelPosition?: XPosition;
  error?: ReactNode;
  color?: ColorType;
  variant?: 'filled' | 'outlined';
}

const Radio: FC<IRadioProps & ICoreUIBaseProps> = forwardRef(
  (
    {
      className,
      visible = true,
      disabled,
      color,
      variant = 'filled',
      label,
      labelPosition = 'end',
      error,
      onChange,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    if (!visible) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    return (
      <div className={classNames('abc-radio', variant, color, disabled && 'disabled', error && 'error')}>
        <label>
          {label &&
            labelPosition === 'start' &&
            (typeof label === 'string' ? <span className="mr-2">{label}</span> : label)}
          <input
            {...rest}
            type="radio"
            className={classNames('form-radio', variant, className)}
            ref={ref}
            onChange={handleChange}
          />
          {label &&
            labelPosition === 'end' &&
            (typeof label === 'string' ? <span className="ml-2">{label}</span> : label)}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'ABCRadio';

export default memo(Radio);
