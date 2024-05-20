import React, {FC} from 'react';
import Image from 'next/image';
import {IConversationDisplay} from '@/common/entities';

import {cn} from '@/components/utils';

import Ellipse from '@/common/components/ellipse';

import {IComponentBaseProps} from '@/common/interfaces';

import AIImage from '@/assets/images/ai-avatar.png';

export type TFriendAvatarSectionProps = IComponentBaseProps & {
  isAI?: boolean;
  contact?: IConversationDisplay;
  onClick?: (conversationId?: string) => void;
};

const FriendAvatarSection: FC<TFriendAvatarSectionProps> = ({className, contact, isAI, onClick}) => {
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
        {isAI ? (
          <Image src={AIImage} alt="avatar" width={44} height={44} />
        ) : (
          <Image
            src={contact?.imageUrl || '/images/avatar.png'}
            fill
            alt="avatar"
            className="absolute rounded-lg object-cover object-center"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-y-2">
        <p className="flex items-center justify-between text-sm font-bold">
          {isAI ? (
            'Gemini'
          ) : (
            <>
              <span>{contact?.name}</span>
              <span className="ml-2 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">2</span>
            </>
          )}
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
