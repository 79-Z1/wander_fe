import React, {FC} from 'react';
import {ISchedule} from '@/common/entities';

import {Icon} from '@/core-ui';

import {cn} from '@/components/utils';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TTripCardInfoProps = IComponentBaseProps & {
  schedule?: ISchedule;
};

const TripCardInfo: FC<TTripCardInfoProps> = ({className, schedule}) => {
  return (
    <div
      className={cn('trip-card-info', 'flex flex-col items-start justify-center gap-3', className)}
      data-testid="TripCardInfo"
    >
      <h1 className="text-xl font-bold">{schedule?.topic}</h1>
      <div className="flex items-center gap-3 text-gray-400">
        <p className="flex items-center gap-1">
          <Icon name="ico-calendar" />
          <span>{`${formatVNDate(schedule?.startDate)} - ${formatVNDate(schedule?.endDate)}`}</span>
        </p>
      </div>
    </div>
  );
};

TripCardInfo.displayName = 'TripCardInfo';

export default TripCardInfo;
