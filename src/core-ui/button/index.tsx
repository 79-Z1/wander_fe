'use client';

import React, {ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode} from 'react';
import classNames from 'classnames';

import {AnchorTargetType, ButtonVariantType, ColorType, ICoreUIBaseProps} from '../types';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  text?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: ColorType;
  variant?: ButtonVariantType;
  target?: AnchorTargetType;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Button: FC<IButtonProps & ICoreUIBaseProps> = ({
  className,
  children,
  href,
  text,
  target = '_self',
  color = 'primary',
  type = 'button',
  variant = 'default',
  visible = true,
  disabled = false,
  onClick,
  ...rest
}) => {
  const content = text ? <p>{text}</p> : children;

  if (href) {
    return (
      <a className={classNames('abc-btn', variant, color, className)} target={target} href={href} rel="noreferrer">
        {content}
      </a>
    );
  }

  if (!visible) return null;

  return (
    <button
      className={classNames('abc-btn', variant, color, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

Button.displayName = 'AIButton';

export default Button;
