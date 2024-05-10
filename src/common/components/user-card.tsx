import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TUserCardProps = IComponentBaseProps & {
  name?: string;
  email?: string;
  avatar?: string;
};

const UserCard: FC<TUserCardProps> = ({className, name, email, avatar}) => {
  return (
    <div className={cn('UserCard flex cursor-pointer items-center gap-2', className)} data-testid="UserCard">
      <Image
        alt={name || 'Member'}
        src={avatar || ''}
        width={40}
        height={40}
        className="rounded-lg bg-black object-cover object-center"
      />
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
  );
};

UserCard.displayName = 'UserCard';

export default UserCard;
