'use client';
import React, {FC} from 'react';
import {useRouter} from 'next/navigation';
import ChatApi from '@/common/api/chat.api';
import ScheduleApi from '@/common/api/schedule.api';
import {IScheduleDetail, IUser} from '@/common/entities';

import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import {ENUM_MEMBER_PERMISSION} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import UserCard from '../user-card';

import OwnerCardInfo from './owner-info-card';
import PlanTableCard from './plan-table-card';
import TripInfoCard from './trip-info-card';

export type TTripDetailModuleProps = IComponentBaseProps & {
  schedule: IScheduleDetail;
};

const TripDetailModule: FC<TTripDetailModuleProps> = ({className, schedule}) => {
  const router = useRouter();
  const {toast} = useToast();
  const [members, setMembers] = React.useState<(IUser & {permission?: ENUM_MEMBER_PERMISSION})[]>(schedule.members);

  const handleEditPermission = async (memberId: string, permission: ENUM_MEMBER_PERMISSION) => {
    try {
      const res = await ScheduleApi.editMemberPermission(schedule._id, memberId, permission);
      if (res.metadata) {
        toast({
          variant: 'success',
          title: `Cập nhật quyền thành công`,
          duration: 3000
        });
        setMembers(prev => prev.map(m => (m._id === memberId ? {...m, permission} : m)));
      } else {
        toast({
          variant: 'destructive',
          title: `Cập nhật quyền thất bại`,
          duration: 3000
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast({
        variant: 'destructive',
        title: `Cập nhật quyền thất bại`,
        duration: 3000
      });
    }
  };

  const handleEditClick = () => {
    router.push(`/trip/edit/${schedule._id}`);
  };

  const handleCreateGroupChat = async (name: string) => {
    try {
      if (!name) return;
      await ChatApi.createGroupChat(name, schedule._id);
      toast({
        variant: 'success',
        description: `Tạo nhóm chat thành công`,
        duration: 3000
      });
      router.push('/chat');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleDeleteSchedule = async (isYes: boolean) => {
    try {
      if (!isYes) return;
      await ScheduleApi.deleteSchedule(schedule._id);
      toast({
        variant: 'success',
        description: `Xóa lịch trình thành công`,
        duration: 3000
      });
      router.push('/trip');
    } catch (error) {
      toast({
        variant: 'success',
        description: `Xóa lịch trình thất bại`,
        duration: 3000
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <div className={cn('TripDetailModule flex h-full flex-col gap-6', className)} data-testid="TripDetailModule">
      <TripInfoCard
        schedule={schedule}
        handleEditClick={handleEditClick}
        handleCreateGroupChat={handleCreateGroupChat}
        handleDeleteSchedule={handleDeleteSchedule}
        handleWatchDetail={() => router.push(`/trip/${schedule._id}`)}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <OwnerCardInfo schedule={schedule} />
        <div className="rounded-lg bg-zinc-50 p-3 shadow">
          <p className="mb-3 text-[18px] font-bold">Thành viên</p>
          <div className="flex flex-wrap gap-3 px-3">
            {members.map((member, index) => (
              <UserCard
                key={index}
                member={member}
                ownerId={schedule.ownerId}
                isOwner={schedule?.isOwner}
                onEditMemberPermission={handleEditPermission}
              />
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
