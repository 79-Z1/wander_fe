'use client';

import React, {FC} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';

type ISpacerProps = ICoreUIBaseProps;

const Spacer: FC<ISpacerProps> = ({className, visible = true}) => {
  if (!visible) return null;

  return <div className={classNames('abc-spacer', className)}></div>;
};

Spacer.displayName = 'ABCSpacer';

export default Spacer;
