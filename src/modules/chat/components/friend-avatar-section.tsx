import React, {FC} from 'react';
import Image from 'next/image';
import {IPrivateConversation} from '@/common/entities';

import {cn} from '@/components/utils';

import Ellipse from '@/common/components/ellipse';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendAvatarSectionProps = IComponentBaseProps & {
  contact?: IPrivateConversation;
  onClick?: (conversationId?: string) => void;
};

const FriendAvatarSection: FC<TFriendAvatarSectionProps> = ({className, contact, onClick}) => {
  function handleClick(id?: string) {
    onClick?.(id);
  }
  return (
    <div
      className={cn('FriendAvatarSection', 'flex cursor-pointer items-center gap-x-2 p-3', className)}
      data-testid="FriendAvatarSection"
      onClick={() => handleClick(contact?._id || '')}
    >
      <div className="relative h-[44px] w-[44px]">
        <Image
          src={contact?.imageUrl || ''}
          fill
          alt="avatar"
          className="absolute rounded-lg object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col gap-y-2">
        <p className="flex items-center justify-between text-sm font-bold">
          <span>{contact?.name}</span>
          <span className="ml-2 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">2</span>
        </p>
        <div className="flex items-center justify-between text-xs text-[#8B8D97]">
          <div className="flex items-center gap-x-1">
            <Ellipse className="bg-red-500" /> <span>10 phút trước</span>
          </div>
          <p>12:55 am</p>
        </div>
      </div>
    </div>
  );
};

FriendAvatarSection.displayName = 'FriendAvatarSection';

export default FriendAvatarSection;
