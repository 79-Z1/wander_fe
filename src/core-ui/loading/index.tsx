'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {ColorType, ICoreUIBaseProps, LoadingSizeType, LoadingThicknessType} from '../types';

interface ILoadingProps extends ICoreUIBaseProps {
  color?: ColorType;
  size?: LoadingSizeType;
  thickness?: LoadingThicknessType;
}

const Loading: FC<ILoadingProps> = ({className, visible = true, color = 'light', size = 20, thickness = 3}) => {
  if (!visible) return null;

  return (
    <div className={classNames('abc-loading', className)} style={{width: `${size}px`, height: `${size}px`}}>
      <div className={classNames(color)} style={{borderWidth: `${thickness}px`}}></div>
    </div>
  );
};

export default Loading;
