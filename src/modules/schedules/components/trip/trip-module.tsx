'use client';
import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {IComponentBaseProps} from '@/common/interfaces';

import TripCard from './trip-card';

export type TTripModuleProps = IComponentBaseProps;

const TripModule: FC<TTripModuleProps> = ({className}) => {
  const {getAll, schedules} = useScheduleState();
  const router = useRouter();

  useEffect(() => {
    getAll();
  }, [getAll]);

  function handleClick(id: string) {
    router.push(`/trip/${id}`);
  }

  return (
    <div className={cn('Trip-module', 'flex h-full w-full flex-col gap-4', className)} data-testid="TripModule">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My trip</h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {schedules.map((schedule, index) => (
          <TripCard key={index} schedule={schedule} onClick={() => handleClick(schedule._id)} />
        ))}
      </div>
    </div>
  );
};

TripModule.displayName = 'TripModule';

export default TripModule;
