import React, {FC} from 'react';

import ChatModule from '@/modules/chat/chat-module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TPageChatProps = IComponentBaseProps;

const PageChat: FC<TPageChatProps> = ({className}) => {
  return (
    <div className={cn('PageChat h-full', className)} data-testid="PageChat">
      <ChatModule />
    </div>
  );
};

PageChat.displayName = 'PageChat';

export default PageChat;
