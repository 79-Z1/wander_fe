'use client';

import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode,
  Ref,
  useEffect,
  useState
} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps} from '../types';

interface ISwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: ReactNode;
  name?: string;
  color?: ColorType;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switcher: FC<ISwitcherProps & ICoreUIBaseProps> = forwardRef(
  (
    {className, visible = true, name, color, disabled, error, checked = false, onChange},
    ref: Ref<HTMLInputElement>
  ) => {
    const [value, setValue] = useState<boolean>(checked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      setValue(target.checked);
      onChange?.(event);
    };

    useEffect(() => {
      setValue(checked);
    }, [checked]);

    if (!visible) return null;

    return (
      <div
        className={classNames(
          'abc-switcher',
          className,
          color,
          disabled && 'abc-switcher--disabled',
          error && 'abc-switcher--error',
          value ? 'abc-switcher--checked' : 'abc-switcher--unchecked'
        )}
      >
        <label>
          <div className="abc-switcher__track">
            <div className="abc-switcher__dot"></div>
            <input
              type="checkbox"
              className="hidden"
              name={name}
              checked={value}
              disabled={!!disabled}
              ref={ref}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
    );
  }
);

Switcher.displayName = 'ABCSwitcher';

export default memo(Switcher);
