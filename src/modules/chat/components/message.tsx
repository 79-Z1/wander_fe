import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {forMatMessageTime} from '@/common/utils';

import {IComponentBaseProps, IMessage} from '@/common/interfaces';

export type TMessageProps = IComponentBaseProps & {
  message?: IMessage;
  userId?: string;
};

const Message: FC<TMessageProps> = ({className, userId, message}) => {
  return (
    <div className={cn('Message flex h-full flex-col gap-y-3', className)} data-testid="Message">
      {userId === message?.sender ? (
        <div className="flex justify-start">
          <div className="flex w-fit max-w-1/2 flex-col gap-y-2">
            <p className="whitespace-pre-line break-words rounded-[8px_8px_8px_0] bg-blue-50 p-3 text-gray-950">
              {message?.text} {message?.user?.name}
            </p>
            <span>{forMatMessageTime(`${message?.messageAt}`)}</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="flex w-fit max-w-1/2 flex-col gap-y-2">
            <p className="whitespace-pre-line break-words rounded-[8px_8px_0_8px] bg-orange-200 p-3 text-gray-950">
              {message?.text}
            </p>
            <span>{forMatMessageTime(`${message?.messageAt}`)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

Message.displayName = 'Message';

export default Message;
