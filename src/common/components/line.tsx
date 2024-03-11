import React, {FC} from 'react';
import classNames from 'classnames';

import {IComponentBaseProps} from '@/common/interfaces';

const Line: FC<IComponentBaseProps> = ({className, visible = false}) => {
  if (visible) return null;
  return <div className={classNames('comp-line border-b border-gray-500', className)}></div>;
};

Line.displayName = 'Line';

export default Line;
