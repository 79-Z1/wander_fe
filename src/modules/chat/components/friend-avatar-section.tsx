import React, {FC} from 'react';
import Image from 'next/image';
import {IConversationDisplay} from '@/common/entities';

import {cn} from '@/components/utils';

import Ellipse from '@/common/components/ellipse';

import {IComponentBaseProps} from '@/common/interfaces';

import AIImage from '@/assets/images/ai-avatar.png';

import ChatActionDopdown from './chat-action-dropdown';

export type TFriendAvatarSectionProps = IComponentBaseProps & {
  isAI?: boolean;
  contact?: IConversationDisplay;
  onClick?: (conversationId?: string) => void;
  onEditName?: (name: string) => void;
  onDelete?: (isYes: boolean, conversationId: string) => void;
};

const FriendAvatarSection: FC<TFriendAvatarSectionProps> = ({
  className,
  contact,
  isAI,
  onClick,
  onEditName,
  onDelete
}) => {
  function handleClick(id?: string) {
    onClick?.(id);
  }
  function handleEditName(name: string) {
    onEditName?.(name);
  }
  function handleDelete(isYes: boolean) {
    onDelete?.(isYes, contact?._id || '');
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
            className="absolute rounded-lg bg-black object-cover object-center"
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
            </>
          )}
        </p>
        <div className="flex items-center justify-between text-xs text-[#8B8D97]">
          <div className="flex items-center gap-x-1">
            {contact?.isOnline ? (
              <>
                <Ellipse className="bg-green-500" />
                <span>Trực tuyến</span>
              </>
            ) : (
              <>
                <Ellipse className="bg-red-500" />
                <span>Ngoại tuyến</span>
              </>
            )}
          </div>
          <ChatActionDopdown contact={contact} onEdit={handleEditName} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

FriendAvatarSection.displayName = 'FriendAvatarSection';

export default FriendAvatarSection;
