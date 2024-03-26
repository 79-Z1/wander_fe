import React, {FC} from 'react';
import {DateRange} from 'react-day-picker';
import {SubmitHandler, useForm} from 'react-hook-form';
import {IMember} from '@/common/entities';

// import {zodResolver} from '@hookform/resolvers/zod';
import {DateRangePicker, Label} from '@/core-ui';
import Input from '@/core-ui/input';
import Textarea from '@/core-ui/textarea';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

// import {CreateTripValidator} from '../../validators/create-trip.validator';
import FriendsSuggestion from './friends-suggestion';

export interface IFormData {
  topic: string;
  description: string;
  imageUrl: string;
  members: IMember[];
  startDate?: Date;
  endDate?: Date;
}

const defaultValues: IFormData = {
  topic: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  imageUrl: '',
  members: []
};

export type TFormCreateTripProps = IComponentBaseProps & {
  onCreate?: (formData: IFormData) => void;
};

const FormCreateTrip: FC<TFormCreateTripProps> = ({className, onCreate, ...rest}) => {
  const form = useForm<IFormData>({defaultValues});
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;

  const handleDateRangeChange = (newDateRange: DateRange) => {
    if (newDateRange) {
      form.setValue('startDate', newDateRange.from!);
      form.setValue('endDate', newDateRange.to!);
    }
  };

  const onSubmit: SubmitHandler<IFormData> = async formData => {
    onCreate?.(formData);
  };

  return (
    <div className={cn('form-login', className)} data-testid="form-login" {...rest}>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="flex w-full gap-6">
          <div className="flex basis-1/2 flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div>
                <Label text="Tiêu đề" color="dark" className="font-semibold" />
                <p className="text-gray-500">Bạn có thể thay đổi mục này sau</p>
              </div>
              <Input
                className={`text-gray-text-gray-400 w-full rounded-lg border-none bg-gray-100 px-2 py-3 text-xs md:text-sm`}
                placeholder={'Nhập tiêu đề lịch trình...'}
                {...register('topic')}
              />
              {errors.topic && <span className="text-rose-500">{errors.topic?.message?.toString()}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Thời gian" color="dark" className="font-semibold" />
              <DateRangePicker
                date={{from: form.getValues('startDate'), to: form.getValues('endDate')}}
                onChange={handleDateRangeChange}
              />
              <Input className={`hidden`} type="date" {...register('startDate')} />
              <Input className={`hidden`} type="date" {...register('endDate')} />
              {errors.startDate && <span className="text-rose-500">{errors.startDate?.message?.toString()}</span>}
              {errors.endDate && <span className="text-rose-500">{errors.endDate.message?.toString()}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label text="Mời bạn bè" color="dark" className="font-semibold" />
              <FriendsSuggestion restInput={register('members')} />
              {errors.members && <span className="text-rose-500">{errors.members?.message?.toString()}</span>}
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-col gap-2">
              <Label text="Hình ảnh" color="dark" className="font-semibold" />
              <input type="file" {...register('imageUrl')} />
            </div>
            <div className="flex h-max flex-col gap-2">
              <Label text="Mô tả" color="dark" className="font-semibold" />
              <Textarea className="grow rounded-lg pl-4 pt-3" rows={5} {...register('description')} />
              {errors.description && <span className="text-rose-500">{errors.description?.message?.toString()}</span>}
            </div>
          </div>
        </div>
        <button type="submit" className="w-full rounded-lg bg-orange-500 p-2 font-bold text-[#FCFCFC]">
          Continue
        </button>
      </form>
    </div>
  );
};

FormCreateTrip.displayName = 'FormCreateTrip';

export default FormCreateTrip;
