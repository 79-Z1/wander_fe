'use client';

import * as React from 'react';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {DateRange, SelectRangeEventHandler} from 'react-day-picker';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/components/utils';

interface IDateRangePickerProps {
  className?: string;
  date?: DateRange;
  onChange?: (date: DateRange) => void;
}

export function DateRangePicker({className, date, onChange}: IDateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(date);

  const handleDateRangeChange: SelectRangeEventHandler = newDateRange => {
    if (newDateRange) {
      setDateRange(newDateRange);
      onChange?.(newDateRange);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !dateRange && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a dateRange</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
