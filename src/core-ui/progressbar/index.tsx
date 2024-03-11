'use client';

import React, {FC} from 'react';
import {useTranslations} from 'next-intl';
import classNames from 'classnames';

import Icon from '../icon';
import {ColorType, IconSizeType, ICoreUIBaseProps, XPosition} from '../types';

interface IProgressBarProps extends ICoreUIBaseProps {
  value?: number;
  max?: number;
  color?: ColorType;
  position?: XPosition;
  positionValue?: 'left' | 'right' | 'center';
  textClassName?: string;
  iconName?: string;
  fontSize?: string;
  iconSize?: IconSizeType;
}

const ProgressBar: FC<IProgressBarProps> = ({
  className,
  value = 0,
  max = 100,
  position = 'start',
  color = 'primary',
  positionValue = 'center',
  textClassName = '',
  iconName = 'ico-expired',
  iconSize = 18,
  ...rest
}) => {
  const t = useTranslations();

  const percent = (value / max) * 100;
  return (
    <div
      className={classNames('abc-progress relative', className, `theme-${color}`)}
      role="progressbar"
      data-testid="abc-progress"
      {...rest}
    >
      <div
        className={classNames(
          'abc-progress__bar',
          position === 'end' && 'absolute right-0',
          positionValue === 'left' ? 'text-left' : positionValue === 'right' ? 'text-right' : 'text-center'
        )}
        style={{width: percent + '%'}}
      >
        <div
          className={`abc-progress__text ${textClassName} relative z-2 mr-0 h-full overflow-hidden text-xs font-bold text-gray-50  transition-all md:text-base`}
        >
          <div className="flex h-full items-center justify-start gap-1">
            <Icon name={iconName} size={iconSize} />
            <span>{value}</span>
            {t('seconds')}
          </div>
        </div>
      </div>
      <div className="absolute left-0.5 top-0 z-1 flex h-full items-center gap-1 pl-2 text-xs font-bold text-violet-600 md:text-base">
        <Icon name={iconName} size={iconSize} />
        <span>{value}</span>
        {t('seconds')}
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
