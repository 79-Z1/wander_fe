'use client';
import React, {FC} from 'react';

import CreateTripModule from '@/modules/schedules/components/create-trip/create-trip-module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TCreateTripPageProps = IComponentBaseProps;

const CreateTripPage: FC<TCreateTripPageProps> = ({className}) => {
  return (
    <div className={cn('create-trip-page h-full', className)} data-testid="CreateTripPage">
      <CreateTripModule />
    </div>
  );
};

CreateTripPage.displayName = 'CreateTripPage';

export default CreateTripPage;
