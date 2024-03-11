'use client';

import React, {FC} from 'react';

import {ICoreUIBaseProps} from '../types';

type IMonthPickerProps = ICoreUIBaseProps;

const MonthPicker: FC<IMonthPickerProps> = ({...rest}) => {
  return <div {...rest} className="abc-Month-picker" />;
};

export default MonthPicker;
