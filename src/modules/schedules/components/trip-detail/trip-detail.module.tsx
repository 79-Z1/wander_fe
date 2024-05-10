import React, {FC} from 'react';
import {IScheduleDetail} from '@/common/entities';

import {cn} from '@/components/utils';

import UserCard from '@/common/components/user-card';

import {IComponentBaseProps} from '@/common/interfaces';

import OwnerCardInfo from './owner-info-card';
import PlanTableCard from './plan-table-card';
import TripInfoCard from './trip-info-card';

export type TTripDetailModuleProps = IComponentBaseProps & {
  schedule: IScheduleDetail;
};

const TripDetailModule: FC<TTripDetailModuleProps> = ({className, schedule}) => {
  return (
    <div className={cn('TripDetailModule flex h-full flex-col gap-6', className)} data-testid="TripDetailModule">
      <TripInfoCard schedule={schedule} />
      <div className="grid grid-cols-2 gap-6">
        <OwnerCardInfo schedule={schedule} />
        <div className="rounded-lg bg-zinc-50 p-3 shadow">
          <p className="mb-3 text-[18px] font-bold">Thành viên</p>
          <div className="flex flex-wrap gap-3 px-3">
            {schedule?.members.map((member, index) => (
              <UserCard key={index} name={member.name} email={member.email} avatar={member.avatar} />
            ))}
          </div>
        </div>
      </div>
      <PlanTableCard plans={schedule.plans || []} />
    </div>
  );
};

TripDetailModule.displayName = 'TripDetailModule';

export default TripDetailModule;
