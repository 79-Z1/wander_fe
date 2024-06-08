import React, {FC} from 'react';
import Image from 'next/image';
import {IUser} from '@/common/entities';

import {cn} from '@/components/utils';

import {ENUM_MEMBER_PERMISSION, IMAGE_URL} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import MemberActionDopdown from './member-action-dropdown';

export type TUserCardProps = IComponentBaseProps & {
  member: IUser & {permission?: ENUM_MEMBER_PERMISSION};
  ownerId?: string;
  isOwner?: boolean;
  onEditMemberPermission?: (memberId: string, permission: ENUM_MEMBER_PERMISSION) => void;
};

const UserCard: FC<TUserCardProps> = ({className, member, isOwner, ownerId, onEditMemberPermission}) => {
  const handleEditPermission = async () => {
    onEditMemberPermission?.(
      member._id as string,
      (member?.permission as ENUM_MEMBER_PERMISSION) === ENUM_MEMBER_PERMISSION.EDIT
        ? ENUM_MEMBER_PERMISSION.VIEW
        : ENUM_MEMBER_PERMISSION.EDIT
    );
  };
  return (
    <div className={cn('UserCard flex cursor-pointer items-center justify-between', className)} data-testid="UserCard">
      <div className="flex items-center gap-2">
        <Image
          alt={member?.name || 'Member'}
          src={member?.avatar || IMAGE_URL.USER}
          width={40}
          height={40}
          className="rounded-lg bg-black object-cover object-center"
        />
        <div>
          <p className="font-bold">{member?.name}</p>
          <p className="text-sm text-gray-600">{member?.email}</p>
        </div>
      </div>
      {isOwner && ownerId !== member?._id && (
        <MemberActionDopdown onEdit={handleEditPermission} permission={member?.permission} />
      )}
    </div>
  );
};

UserCard.displayName = 'UserCard';

export default UserCard;
