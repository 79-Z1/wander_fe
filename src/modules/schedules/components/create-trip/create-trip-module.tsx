import React, {FC} from 'react';

import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {IComponentBaseProps} from '@/common/interfaces';

import FormCreateTrip, {IFormData} from './form-create-trip';

export type TCreateTripModuleProps = IComponentBaseProps;

const CreateTripModule: FC<TCreateTripModuleProps> = ({className}) => {
  const scheduleState = useScheduleState();

  const onCreate = (formData: IFormData) => {
    formData.members = [];
    scheduleState.create(formData);
  };

  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="CreateTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Tạo hành trình mới</h1>
      <FormCreateTrip onCreate={onCreate} />
    </div>
  );
};

CreateTripModule.displayName = 'CreateTripModule';

export default CreateTripModule;
