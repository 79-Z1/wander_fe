import React, {FC} from 'react';
import {useRouter} from 'next/navigation';
import {ISchedule} from '@/common/entities';

import TripCard from '@/modules/schedules/components/trip-card';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TScheduleListProps = IComponentBaseProps & {
  schedules: ISchedule[];
};

const ScheduleList: FC<TScheduleListProps> = ({className, schedules}) => {
  const router = useRouter();

  function handleClick(id: string) {
    router.push(`/trip/${id}`);
  }
  return (
    <div className={cn('ScheduleList', 'flex h-full w-full flex-col gap-4', className)} data-testid="ScheduleList">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold lg:text-lg">Lịch trình đã làm</h1>
      </div>
      {schedules && schedules.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {schedules.map((schedule, index) => (
            <TripCard key={index} schedule={schedule} onClick={() => handleClick(schedule._id)} showAction={false} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">Chưa có lịch trình nào</div>
      )}
    </div>
  );
};

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
