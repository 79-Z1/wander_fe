'use client';

import React, {FC} from 'react';

import {ICoreUIBaseProps} from '../types';

const TimePicker: FC<ICoreUIBaseProps> = ({...rest}) => {
  return <div {...rest} className="abc-time-picker" />;
};

export default TimePicker;
