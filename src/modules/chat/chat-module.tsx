'use client';
import React, {FC} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Icon} from '@/core-ui';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import Search from '@/common/components/search';

import {ENUM_SOCKET_EMIT} from '@/common/constants/socket.enum';

import {IComponentBaseProps, IConversation} from '@/common/interfaces';

import NotFoundModule from '../not-found/not-found';

import FriendAvatarSection from './components/friend-avatar-section';
import MessageSection from './components/message-section';

export type TChatModuleProps = IComponentBaseProps & {
  conversation?: IConversation;
};

const ChatModule: FC<TChatModuleProps> = ({className, conversation}) => {
  const session = useSession();
  const router = useRouter();

  function handleClickFriendAvatar() {
    router.push('/chat/661271c6600d68ed02a385be');
    GlobalConnectSocket.emit(ENUM_SOCKET_EMIT.JOIN_CONVERSATION, {
      conversationId: '661271c6600d68ed02a385be'
    });
  }

  if (!session.data?.user && session.status === 'unauthenticated') return <NotFoundModule />;

  return (
    <div className={cn('ChatModule', 'flex h-full flex-col', className)} data-testid="ChatModule">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold">Cuộc trò chuyện với bạn bè</p>
        <Button className="gap-x-2 text-xl font-bold">
          <Icon name="ico-plus" />
          Thêm bạn bè
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4">
        <div className="flex h-full flex-col gap-y-6 rounded-lg bg-zinc-50 p-6">
          <div className="flex items-center justify-between">
            <p>Liên hệ</p>
            <p>34</p>
          </div>
          <div className="mb-6 mt-3">
            <Search />
          </div>
          <div>
            <div>
              <FriendAvatarSection onClick={handleClickFriendAvatar} />
              <FriendAvatarSection onClick={handleClickFriendAvatar} />
              <FriendAvatarSection onClick={handleClickFriendAvatar} />
              <FriendAvatarSection onClick={handleClickFriendAvatar} />
            </div>
          </div>
        </div>

        <div className="grid max-h-[calc(100vh-120px)] grid-rows-7 flex-col gap-y-6 rounded-lg bg-zinc-50 py-6 ">
          {conversation ? <MessageSection userId={session.data?.user?.id} conversation={conversation} /> : <></>}
        </div>
      </div>
    </div>
  );
};

ChatModule.displayName = 'ChatModule';

export default ChatModule;
