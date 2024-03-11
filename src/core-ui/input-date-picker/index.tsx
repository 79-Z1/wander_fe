'use client';

import {FC, useEffect, useState} from 'react';
import dayjs from 'dayjs';

import Icon from '../icon';
import Input from '../input';
import Popover, {IFilterItem} from '../popover';

interface IInputDatePickerProps {
  value?: string;
  onChange?: (date?: Date) => void;
  reset?: boolean;
}

const InputDatePicker: FC<IInputDatePickerProps> = ({value, reset, onChange}) => {
  const [selected, setSelected] = useState<Date>();
  const [items, setItems] = useState<IFilterItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClickItem = (open: boolean) => {
    setIsOpen(open);
    setItems([
      {
        component: <div className="w-fit bg-white px-3 py-2"></div>
      }
    ]);
  };

  const handleClearDate = () => {
    setItems([]);
    setSelected(undefined);
    onChange?.();
  };

  useEffect(() => {
    if (value) setSelected(dayjs(value.split('/').reverse().join('-')).toDate());
  }, [value]);

  return (
    <Popover
      trigger={
        <div className="relative">
          <div className="flex w-full cursor-pointer items-center" onClick={() => onClickItem(!isOpen)}>
            <Input
              className="cursor-pointer"
              type="text"
              value={selected && !reset ? dayjs(selected).format('DD/MM/YYYY') : ''}
            />
            <div className="relative min-h-[24px]">
              <Icon className="absolute right-2" name="ico-calendar" size={24} />
            </div>
          </div>
          {selected && !reset ? (
            <Icon name="ico-times" className="absolute right-8 top-1/2 -translate-y-2/4" onClick={handleClearDate} />
          ) : null}
        </div>
      }
      onHandleClick={onClickItem}
      isOpen={isOpen}
      placement={'bottom-end'}
      items={items}
    />
  );
};

InputDatePicker.displayName = 'InputDatePicker';

export default InputDatePicker;
