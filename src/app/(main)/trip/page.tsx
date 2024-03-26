'use client';
import React, {FC} from 'react';

import TripModule from '@/modules/schedules/components/trip/trip-module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TTripPageProps = IComponentBaseProps;

const TripPage: FC<TTripPageProps> = ({className}) => {
  return (
    <div className={cn('Trip-page', className)} data-testid="TripPage">
      <TripModule />
    </div>
  );
};

TripPage.displayName = 'TripPage';

export default TripPage;
