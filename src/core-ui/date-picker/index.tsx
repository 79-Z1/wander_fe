'use client';

import React, {FC, useState} from 'react';
import dayjs from 'dayjs';
import {Calendar as CalendarIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TProps = IComponentBaseProps & {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
};

const DatePicker: FC<TProps> = ({className, defaultValue, onChange}) => {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  function handleChangeDate(date?: Date) {
    setDate(date || new Date());
    onChange?.(date || new Date());
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format('DD/MM/YYYY') : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={handleChangeDate}
          fromYear={1900}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
