'use client';

import {FC, useEffect, useState} from 'react';
import dayjs from 'dayjs';

import {Icon} from '@/core-ui';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import {TimePickerDemo} from './time-picker-demo';

export type TDateTimeProps = IComponentBaseProps & {
  defaultDate?: Date;
  onChange?: (date: Date) => void;
  fromDate?: Date;
};
const DateTimePicker: FC<TDateTimeProps> = ({defaultDate, onChange, fromDate, className}) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  useEffect(() => {
    if (defaultDate) setDate(defaultDate);
  }, [defaultDate]);

  const handleSelectDate = (dateSelected?: Date) => {
    if (dateSelected) onChange?.(dateSelected);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('items-center justify-between font-normal', !date && 'text-muted-foreground', className)}
        >
          <span>{date ? String(dayjs(date).format('DD/MM/YYYY HH:mm:ss')) : 'DD/MM/YYYY HH:mm:ss'}</span>
          <Icon name="ico-calendar" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" fromDate={fromDate} selected={date} onSelect={handleSelectDate} initialFocus />
        <div className="border-t border-border p-3">
          <TimePickerDemo setDate={handleSelectDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default DateTimePicker;
