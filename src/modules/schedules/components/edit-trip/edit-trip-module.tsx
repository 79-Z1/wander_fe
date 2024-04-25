import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import FormCreateTrip from '../create-trip/form-create-trip';

export type TEditTripModuleProps = IComponentBaseProps;

const EditTripModule: FC<TEditTripModuleProps> = ({className}) => {
  return (
    <div
      className={cn('create-trip-module h-full w-full rounded-lg bg-zinc-50 p-6', className)}
      data-testid="EditTripModule"
    >
      <h1 className="px-4 pb-3 text-center text-2xl font-bold">Chỉnh sửa hành trình</h1>
      <FormCreateTrip />
    </div>
  );
};

EditTripModule.displayName = 'EditTripModule';

export default EditTripModule;
