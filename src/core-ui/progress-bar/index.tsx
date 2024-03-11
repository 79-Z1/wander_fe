'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps, XPosition} from '../types';

interface IProgressBarProps extends ICoreUIBaseProps {
  value?: number;
  max?: number;
  color?: ColorType;
  position?: XPosition;
}

const ProgressBar: FC<IProgressBarProps> = ({
  className,
  value = 0,
  max = 100,
  position = 'start',
  color = 'primary'
}) => {
  const percent = (value / max) * 100;
  return (
    <div className={classNames('abc-progress', className, `theme-${color}`)} role="progressbar">
      <div
        className={classNames('abc-progress__bar', position === 'end' && 'absolute right-0')}
        style={{width: percent + '%'}}
      >
        <span className="abc-progress__text">{value}</span>
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
