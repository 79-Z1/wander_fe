import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {forMatMessageTime} from '@/common/utils';

import {IComponentBaseProps, IMessage} from '@/common/interfaces';

import AIImage from '@/assets/images/ai-avatar.png';

export type TMessageProps = IComponentBaseProps & {
  isAI?: boolean;
  message?: IMessage;
  userId?: string;
};

const Message: FC<TMessageProps> = ({className, userId, message, isAI}) => {
  return (
    <div className={cn('Message', className)} data-testid="Message">
      {userId !== message?.sender?._id ? (
        <div className="flex flex-col items-start gap-1">
          <div className="flex w-fit max-w-1/2 gap-1">
            {isAI ? (
              <Image
                src={AIImage}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover object-center"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src={message?.sender?.avatar || ''}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover object-center"
                width={40}
                height={40}
              />
            )}
            <p className="whitespace-pre-line break-words rounded-[8px_8px_8px_0] bg-blue-50 p-3 text-gray-950">
              {message?.text}
            </p>
          </div>
          <span>{forMatMessageTime(`${message?.messageAt}`)}</span>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-1">
          <div className="flex w-fit max-w-1/2 gap-1">
            <p className="whitespace-pre-line break-words rounded-[8px_8px_0_8px] bg-orange-200 p-3 text-gray-950">
              {message?.text}
            </p>
          </div>
          <span>{forMatMessageTime(`${message?.messageAt?.toString()}`)}</span>
        </div>
      )}
    </div>
  );
};

Message.displayName = 'Message';

export default Message;
