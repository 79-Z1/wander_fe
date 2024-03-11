'use client';

import React, {FC} from 'react';

import {ICoreUIBaseProps} from '../types';

interface IDatePickerProps extends ICoreUIBaseProps {
  onSelect?: (date: Date) => void;
}

const DatePicker: FC<IDatePickerProps> = () => {
  return <></>;
};

export default DatePicker;
