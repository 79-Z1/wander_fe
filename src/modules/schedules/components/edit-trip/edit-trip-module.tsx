'use client';
import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import FormCreateTrip, {IFormData} from '../create-trip/form-create-trip';

export type TEditTripModuleProps = IComponentBaseProps & {
  defaultValues?: IFormData;
};

const EditTripModule: FC<TEditTripModuleProps> = ({className, defaultValues}) => {
  console.log('🚀 ~ defaultValues:::', defaultValues);
  if (!defaultValues) return;
  defaultValues.startDate = new Date(defaultValues?.startDate || new Date());
  defaultValues.endDate = new Date(defaultValues?.endDate || new Date());
  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="EditTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Chỉnh sửa hành trình</h1>
      <FormCreateTrip defaultValues={defaultValues} />
    </div>
  );
};

EditTripModule.displayName = 'EditTripModule';

export default EditTripModule;
