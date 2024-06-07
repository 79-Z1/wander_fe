import React, {FC} from 'react';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {ENUM_SCHEDULE_TAB} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import ScheduleEmpty from '../schedule-empty';
import TripCard from '../trip-card';

export type TCompletedScheduleTabProps = IComponentBaseProps & {
  onClick?: (scheduleId: string) => void;
};

const CompletedScheduleTab: FC<TCompletedScheduleTabProps> = ({className, onClick}) => {
  const {schedules} = useScheduleState();
  return (
    <div className={cn('CompletedScheduleTab', className)} data-testid="CompletedScheduleTab">
      <TabsContent value={ENUM_SCHEDULE_TAB.COMPLETED} className="h-full">
        {schedules.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {schedules.map((value, index) => (
              <TripCard key={index} schedule={value} onClick={() => onClick?.(value._id)} />
            ))}
          </div>
        ) : (
          <ScheduleEmpty text="Bạn chưa có lịch trình sắp tới nào" />
        )}
      </TabsContent>
    </div>
  );
};

CompletedScheduleTab.displayName = 'CompletedScheduleTab';

export default CompletedScheduleTab;
