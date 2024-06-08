import React, {FC} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import ChatApi from '@/common/api/chat.api';
import {ISchedule} from '@/common/entities';
import {IUser} from '@/common/entities/user.entity';

import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {ENUM_MEMBER_PERMISSION, IMAGE_URL} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import tripBGImage from '@/assets/images/trip-bg.jpg';

import TripCardInfo from './trip/trip-card-info';
import TripActionDopdown from './trip-action-dropdown';

export type TTripCardProps = IComponentBaseProps & {
  showAction?: boolean;
  schedule: ISchedule;
  onClick?: () => void;
};

const TripCard: FC<TTripCardProps> = ({className, schedule, showAction = true, onClick}) => {
  const router = useRouter();
  const session = useSession();
  const {toast} = useToast();
  const {deleteSchedule} = useScheduleState();
  const handleEditClick = () => {
    router.push(`/trip/edit/${schedule._id}`);
  };

  const handleCreateGroupChat = async (name: string) => {
    try {
      await ChatApi.createGroupChat(name, schedule._id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleDeleteSchedule = async (isYes: boolean) => {
    try {
      if (!isYes) return;
      deleteSchedule(schedule._id);
      toast({
        variant: 'success',
        description: `Xóa lịch trình thành công`,
        duration: 3000
      });
    } catch (error) {
      toast({
        variant: 'success',
        description: `Xóa lịch trình thất bị`,
        duration: 3000
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div
      className={cn('trip-card', 'cursor-pointer gap-2 rounded-lg bg-zinc-50 p-3', className)}
      data-testid="TripCard"
    >
      <div onClick={onClick} className="space-y-2">
        <div className="relative aspect-[2/1] w-full rounded-lg pb-[50%]">
          <Image
            alt={schedule?.topic || 'Trip'}
            src={schedule?.imageUrl || tripBGImage}
            fill
            className="absolute rounded-lg object-cover object-center"
          />
        </div>
        <TripCardInfo schedule={schedule} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Image
            src={session?.data?.user?.avatar || IMAGE_URL.USER}
            alt="Avatar"
            className={cn('rounded-full border-[1px] border-gray-300 bg-black', {
              '-mr-4': schedule?.members.length > 0
            })}
            width={40}
            height={40}
          />
          {(schedule?.members as IUser[])?.map((member, index) => (
            <Image
              key={index}
              src={member?.avatar || IMAGE_URL.USER}
              alt="Avatar"
              className={cn('rounded-full border-[1px] border-gray-300 bg-black', {
                '-mr-4': schedule?.members.length > 1
              })}
              width={40}
              height={40}
            />
          ))}
        </div>
        {showAction && (
          <TripActionDopdown
            isOwner={schedule?.isOwner}
            scheduleId={schedule?._id}
            canCreateGroupChat={schedule?.canCreateGroupChat}
            isEditable={schedule?.permission === ENUM_MEMBER_PERMISSION.EDIT}
            onEdit={handleEditClick}
            onCreateChatGroup={handleCreateGroupChat}
            onDelete={handleDeleteSchedule}
            onWatchDetail={() => router.push(`/trip/${schedule?._id}`)}
          />
        )}
      </div>
    </div>
  );
};

TripCard.displayName = 'TripCard';

export default TripCard;
