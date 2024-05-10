import React, {FC} from 'react';
import Image from 'next/image';
import {IScheduleDetail} from '@/common/entities';

import {Progress} from '@/components/ui/progress';
import {cn} from '@/components/utils';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TTripInfoCardProps = IComponentBaseProps & {
  schedule: IScheduleDetail;
};

const TripInfoCard: FC<TTripInfoCardProps> = ({className, schedule}) => {
  return (
    <div
      className={cn('TripInfoCard flex flex-col gap-6 rounded-lg bg-zinc-50 p-3 shadow', className)}
      data-testid="TripInfoCard"
    >
      <div className="relative w-full pb-[50%] lg:pb-[30%]">
        <Image
          alt={schedule?.topic || 'Trip'}
          src={schedule?.imageUrl || ''}
          fill
          className="absolute rounded-lg bg-black object-contain object-center"
        />
      </div>
      <div className="space-y-3">
        <p className="text-[18px] font-bold">{schedule?.topic}</p>
        <p className="text-xs text-gray-400">{schedule?.description}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <section className="space-y-1">
          <p className="flex justify-between">
            <span>Tiến trình</span>
            <span>{schedule?.progress?.part}</span>
          </p>
          <Progress value={schedule?.progress?.percent || 0} max={100} className="w-full" />
        </section>
        <section className="space-y-1 text-center">
          <p>Ngày bắt đầu</p>
          <p className="font-bold">{formatVNDate(schedule?.startDate)}</p>
        </section>
        <section className="space-y-1 text-center">
          <p>Ngày kết thúc</p>
          <p className="font-bold">{formatVNDate(schedule?.endDate)}</p>
        </section>
        <section className="space-y-1 text-center">
          <p>Số thành viên</p>
          <p className="font-bold">{schedule?.members?.length + 1}</p>
        </section>
      </div>
    </div>
  );
};

TripInfoCard.displayName = 'TripInfoCard';

export default TripInfoCard;
