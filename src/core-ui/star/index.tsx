'use client';

import React, {FC, memo} from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import {IconSizeType, ICoreUIBaseProps} from '../types';

interface IStarProps extends ICoreUIBaseProps {
  className?: string;
  color?: string;
  size?: IconSizeType;
  count: number;
}

const Star: FC<IStarProps> = ({className, visible = true, color = 'text-yellow-500', size = 16, count = 0}) => {
  if (!visible) return null;

  const renderStar = Array.from({length: count}).map((_, i) => (
    <Icon key={i} name="ico-custom-star" size={size} className={classNames(color)} />
  ));

  return <div className={classNames(className)}>{renderStar}</div>;
};

Star.displayName = 'ABCStar';

export default memo(Star);
