'use client';
import React, {FC} from 'react';

import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {IComponentBaseProps} from '@/common/interfaces';

import FormTrip, {IFormData} from '../form-trip';

export type TCreateTripModuleProps = IComponentBaseProps;

const defaultValues: IFormData = {
  topic: '',
  total: 0,
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  imageUrl: '',
  members: [],
  plans: []
};

const CreateTripModule: FC<TCreateTripModuleProps> = ({className}) => {
  const scheduleState = useScheduleState();

  function submitCreate(formData: IFormData) {
    scheduleState.create?.(formData);
  }

  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="CreateTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Tạo hành trình mới</h1>
      <FormTrip defaultValues={defaultValues} onSubmit={submitCreate} />
    </div>
  );
};

CreateTripModule.displayName = 'CreateTripModule';

export default CreateTripModule;
