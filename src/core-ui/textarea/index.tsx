'use client';

import React, {ChangeEvent, FC, ForwardedRef, forwardRef, KeyboardEvent, memo, TextareaHTMLAttributes} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

type ITextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: FC<ITextareaProps & ICoreUIBaseProps> = forwardRef(
  (
    {className, visible = true, placeholder, onFocus, onChange, onKeyDown, ...rest},
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    if (!visible) return null;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(event);
    };

    return (
      <textarea
        {...rest}
        ref={ref}
        className={classNames(
          'scrollbar h-full w-full resize-none border-0 border-transparent text-center focus:border-none focus:outline-none focus:ring-0',
          className
        )}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></textarea>
    );
  }
);

Textarea.displayName = 'ABCTextarea';

export default memo(Textarea);
