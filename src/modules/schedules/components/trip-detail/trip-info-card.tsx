import React, {FC} from 'react';
import Image from 'next/image';
import {IScheduleDetail} from '@/common/entities';

import {Progress} from '@/components/ui/progress';
import {cn} from '@/components/utils';

import {ENUM_MEMBER_PERMISSION, IMAGE_URL} from '@/common/constants';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import TripActionDopdown from '../trip-action-dropdown';

export type TTripInfoCardProps = IComponentBaseProps & {
  schedule: IScheduleDetail;
  handleDeleteSchedule?: (isYes: boolean) => void;
  handleCreateGroupChat?: (name: string) => void;
  handleEditClick?: () => void;
  handleWatchDetail?: () => void;
};

const TripInfoCard: FC<TTripInfoCardProps> = ({
  className,
  schedule,
  handleDeleteSchedule,
  handleCreateGroupChat,
  handleEditClick,
  handleWatchDetail
}) => {
  return (
    <div
      className={cn('TripInfoCard flex flex-col gap-6 rounded-lg bg-zinc-50 p-3 shadow', className)}
      data-testid="TripInfoCard"
    >
      <div className="relative w-full pb-[50%] lg:pb-[30%]">
        <Image
          alt={schedule?.topic || 'Trip'}
          src={schedule?.imageUrl || IMAGE_URL.TRIP}
          fill
          className="absolute rounded-lg bg-black object-contain object-center"
        />
      </div>
      <div className="flex justify-between gap-2">
        <p className="flex flex-col space-y-3">
          <span className="text-[18px] font-bold">{schedule?.topic}</span>
          <span className="text-xs text-gray-400">{schedule?.description}</span>
        </p>
        <TripActionDopdown
          isOwner={schedule?.isOwner}
          canCreateGroupChat={schedule?.canCreateGroupChat}
          isEditable={schedule?.permission === ENUM_MEMBER_PERMISSION.EDIT}
          scheduleId={schedule?._id}
          onEdit={handleEditClick}
          onCreateChatGroup={handleCreateGroupChat}
          onDelete={handleDeleteSchedule}
          onWatchDetail={handleWatchDetail}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <section className="space-y-1">
          <p className="flex justify-between">
            <span>Tiến trình</span>
            <span>{schedule?.progress?.part}</span>
          </p>
          <Progress value={schedule?.progress?.percent || 0} max={100} className="w-full" />
        </section>
        <section className="space-y-1 md:text-center">
          <p>Số thành viên</p>
          <p className="font-bold">{schedule?.members?.length}</p>
        </section>
        <section className="space-y-1 md:text-center">
          <p>Ngày bắt đầu</p>
          <p className="font-bold">{formatVNDate(schedule?.startDate)}</p>
        </section>
        <section className="space-y-1 md:text-center">
          <p>Ngày kết thúc</p>
          <p className="font-bold">{formatVNDate(schedule?.endDate)}</p>
        </section>
      </div>
    </div>
  );
};

TripInfoCard.displayName = 'TripInfoCard';

export default TripInfoCard;
