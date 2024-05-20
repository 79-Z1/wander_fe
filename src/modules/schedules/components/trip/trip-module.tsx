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
        <h1 className="text-xl font-bold">Lịch trình của tôi</h1>
      </div>
      {schedules && schedules.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {schedules.map((schedule, index) => (
            <TripCard key={index} schedule={schedule} onClick={() => handleClick(schedule._id)} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">Bạn chưa có lịch trình nào</div>
      )}
    </div>
  );
};

TripModule.displayName = 'TripModule';

export default TripModule;
