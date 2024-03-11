'use client';

import React, {ChangeEvent, FC, ForwardedRef, forwardRef, InputHTMLAttributes, KeyboardEvent, memo} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps, TextInputType} from '../types';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: ColorType;
  type?: TextInputType;
}

const Input: FC<IInputProps & ICoreUIBaseProps> = forwardRef(
  (
    {className, visible = true, type = 'text', onFocus, onChange, onKeyDown, ...rest},
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    if (!visible) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      switch (type) {
        case 'number':
          if (event.key === 'Backspace' || /^[0-9.]$/.test(event.key)) {
            return;
          }
          event.preventDefault();
          break;
      }
      onKeyDown?.(event);
    };

    return (
      <input
        {...rest}
        ref={ref}
        type={type}
        className={classNames('form-input', className)}
        onFocus={onFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

Input.displayName = 'ABCInput';

export default memo(Input);
