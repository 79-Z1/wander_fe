'use client';
import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {debounce} from 'lodash-es';
import ChatApi from '@/common/api/chat.api';
import {IClassifiedUserConversation} from '@/common/entities';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Icon} from '@/core-ui';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';
import useUserState from '@/common/hooks/use-user-state';

import SearchBarSuggestion from '@/common/components/search-bar-suggestion';

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
  const {users, isFetching, searchByName, setUsers} = useUserState();
  const friendState = useFriendState();

  const [contactList, setContactList] = useState<IClassifiedUserConversation>({
    privateConversations: [],
    groupConversations: []
  });

  useEffect(() => {
    const fetchUserConservations = async () => {
      try {
        const response = await ChatApi.getUserConservations();
        setContactList(response.metadata || {});
      } catch (error) {
        error;
      }
    };
    fetchUserConservations();
  }, []);

  function handleClickFriendAvatar(conversationId?: string) {
    router.push(`/chat/${conversationId}`);
    GlobalConnectSocket.emit(ENUM_SOCKET_EMIT.JOIN_CONVERSATION, {
      conversationId: conversationId ?? ''
    });
  }

  function handleSearchChange(text: string) {
    if (text)
      debounce(() => {
        searchByName(text);
      }, 500)();
    else setUsers([]);
  }

  function handleSelectSearchResult(friendId: string) {
    friendState.sendFriendRequest(session.data?.user.id || '', friendId, GlobalConnectSocket);
  }

  if (!session.data?.user && session.status === 'unauthenticated') return <NotFoundModule />;

  return (
    <div className={cn('ChatModule', 'flex h-full max-h-full flex-col', className)} data-testid="ChatModule">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold">Cuộc trò chuyện với bạn bè</p>
        <Button className="gap-x-2 text-xl font-bold">
          <Icon name="ico-plus" />
          Thêm bạn bè
        </Button>
      </div>

      <div className="mt-6 flex h-full gap-x-4">
        <div className="flex h-full basis-1/2 flex-col gap-y-6 rounded-lg bg-zinc-50 p-6">
          <div className="flex items-center justify-between">
            <p>Liên hệ</p>
            <p>34</p>
          </div>
          <div className="mb-6 mt-3">
            <SearchBarSuggestion
              isLoading={isFetching}
              emptyMessage="Không có kết quả"
              users={users}
              onValueChange={handleSearchChange}
              onSelectOption={handleSelectSearchResult}
            />
          </div>
          <div>
            <div>
              {contactList?.privateConversations.length > 0 ? (
                contactList?.privateConversations.map((contact, index) => (
                  <FriendAvatarSection key={index} contact={contact} onClick={handleClickFriendAvatar} />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full max-h-full basis-1/2 flex-col gap-y-6 rounded-lg bg-zinc-50 py-6">
          {conversation ? <MessageSection userId={session.data?.user?.id} conversation={conversation} /> : <></>}
        </div>
      </div>
    </div>
  );
};

ChatModule.displayName = 'ChatModule';

export default ChatModule;
