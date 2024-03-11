import React, {FC} from 'react';
import classNames from 'classnames';

import {Icon} from '@/core-ui';
import {ColorType, IconSizeType} from '@/core-ui/types';

import {IComponentBaseProps} from '@/common/interfaces';

interface ILabelProps extends IComponentBaseProps {
  iconName?: string;
  iconSize?: IconSizeType;
  text?: string;
  onClick?: () => void;
  color?: ColorType;
  backgroundColor?: ColorType;
  iconClassName?: string;
}

const Label: FC<ILabelProps> = ({
  iconName,
  iconSize = 18,
  text,
  className,
  iconClassName,
  color = 'light',
  backgroundColor = 'transparent',
  onClick,
  ...rest
}) => {
  if (!text && !iconName) return null;
  let labelColor: string;
  let labelBackgroundColor: string;

  switch (color) {
    case 'dark':
      labelColor = 'text-slate-700';
      break;
    case 'light':
      labelColor = 'text-gray-50';
      break;
    case 'primary':
      labelColor = 'text-primary-500';
      break;
    case 'secondary':
      labelColor = 'text-slate-500';
      break;
    case 'danger':
      labelColor = 'text-red-500';
      break;
    case 'warning':
      labelColor = 'text-amber-500';
      break;
    case 'success':
      labelColor = 'text-emerald-500';
      break;
    case 'info':
      labelColor = 'text-sky-500';
      break;
    default:
      labelColor = 'text-gray-50';
      break;
  }

  switch (backgroundColor) {
    case 'dark':
      labelBackgroundColor = 'bg-slate-700';
      break;
    case 'light':
      labelBackgroundColor = 'bg-gray-50';
      break;
    case 'primary':
      labelBackgroundColor = 'bg-primary-500';
      break;
    case 'secondary':
      labelBackgroundColor = 'bg-slate-500';
      break;
    case 'danger':
      labelBackgroundColor = 'bg-red-500';
      break;
    case 'warning':
      labelBackgroundColor = 'bg-amber-500';
      break;
    case 'success':
      labelBackgroundColor = 'bg-emerald-500';
      break;
    case 'info':
      labelBackgroundColor = 'bg-sky-500';
      break;
    case 'transparent':
      labelBackgroundColor = 'bg-transparent';
      break;
    default:
      labelBackgroundColor = 'bg-transparent';
      break;
  }

  return (
    <div
      className={classNames(
        'abc-label flex items-center gap-3 text-sm md:text-base',
        className,
        labelColor,
        labelBackgroundColor
      )}
      onClick={onClick}
      data-testid="label"
      {...rest}
    >
      {iconName && <Icon className={iconClassName} size={iconSize} name={iconName} />}
      {text && <span>{text}</span>}
    </div>
  );
};

export default Label;
