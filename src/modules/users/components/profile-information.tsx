import React, {FC} from 'react';
import {IUser} from '@/common/entities';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TProfileInfomationProps = IComponentBaseProps & {
  user?: IUser;
};

const ProfileInfomation: FC<TProfileInfomationProps> = ({className, user}) => {
  return (
    <div
      className={cn(
        'ProfileInfomation space-y-1 rounded-lg bg-zinc-50 p-3 text-xs lg:space-y-3 lg:text-base',
        className
      )}
      data-testid="ProfileInfomation"
    >
      <p className="mb-3 text-base font-bold text-gray-800 lg:text-lg">Thông tin cá nhân</p>
      <p className="flex gap-2">
        <span className="text-[#6B7280]">Họ và tên:</span>
        <span className="text-[#9CA3AF]">{user?.name}</span>
      </p>
      <p className="flex gap-2">
        <span className="text-[#6B7280]">Email:</span>
        <span className="text-[#9CA3AF]">{user?.email}</span>
      </p>
      <p className="flex gap-2">
        <span className="text-[#6B7280]">Số điện thoại:</span>
        <span className="text-[#9CA3AF]">{user?.phoneNumber}</span>
      </p>
      <p className="flex gap-2">
        <span className="text-[#6B7280]">Địa chỉ:</span>
        <span className="text-[#9CA3AF]">{user?.address}</span>
      </p>
    </div>
  );
};

ProfileInfomation.displayName = 'ProfileInfomation';

export default ProfileInfomation;
