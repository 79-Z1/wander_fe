'use client';
import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {debounce} from 'lodash-es';
import ChatApi from '@/common/api/chat.api';
import {IClassifiedUserConversation} from '@/common/entities';
import {ChatConnectSocket} from '@/common/sockets/chat-connect.socket';

import {useToast} from '@/components/ui/use-toast';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';
import useUserState from '@/common/hooks/use-user-state';

import SearchBarSuggestion from '@/common/components/search-bar-suggestion';

import {ENUM_SOCKET_EMIT} from '@/common/constants/socket.enum';

import {IComponentBaseProps, IConversation} from '@/common/interfaces';

import AIMessageSection from '../AI/ai-chat-section';
import NotFoundModule from '../not-found/not-found';

import ChatCollapsible from './components/chat-collasible';
import MessageSection from './components/message-section';

export type TChatModuleProps = IComponentBaseProps & {
  conversation?: IConversation;
};

const ChatModule: FC<TChatModuleProps> = ({className, conversation}) => {
  const session = useSession();
  const router = useRouter();
  const {toast} = useToast();
  const {users, isFetching, searchByName, setUsers} = useUserState();
  const friendState = useFriendState();

  const [contactList, setContactList] = useState<IClassifiedUserConversation>({
    privateConversations: [],
    groupConversations: [],
    aiConversations: []
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
    ChatConnectSocket.emit(ENUM_SOCKET_EMIT.JOIN_CONVERSATION, {
      conversationId: conversationId ?? ''
    });
  }

  async function handleUpdateContactName(name: string) {
    if (!name.trim()) return;
    try {
      const res = await ChatApi.updateConversationName(conversation?._id || '', name);
      if (res.metadata) {
        setContactList(() => {
          const newGroupConversations = contactList.groupConversations.map(groupConversation => {
            if (groupConversation._id === conversation?._id) {
              return {...groupConversation, name: name};
            }
            return groupConversation;
          });
          return {...contactList, groupConversations: newGroupConversations};
        });
        toast({title: 'Cập nhật tên thành công!', variant: 'success'});
      }
    } catch (error) {
      error;
    }
  }

  async function deleteConversationOnUserSide(
    isYes: boolean,
    conversationId: string,
    type: 'group' | 'private' | 'ai'
  ) {
    if (!isYes) return;
    const res = await ChatApi.deleteConversationOnUserSide(conversationId);
    if (res.metadata) {
      switch (type) {
        case 'group':
          setContactList(() => {
            const newGroupConversations = contactList.groupConversations.filter(
              groupConversation => groupConversation._id !== conversationId
            );
            return {...contactList, groupConversations: newGroupConversations};
          });
          break;
        case 'private':
          setContactList(() => {
            const newPrivateConversations = contactList.privateConversations.filter(
              privateConversation => privateConversation._id !== conversationId
            );
            return {...contactList, privateConversations: newPrivateConversations};
          });
          break;
        case 'ai':
          break;
      }
    }
  }

  function handleSearchChange(text: string) {
    if (text)
      debounce(() => {
        searchByName(text);
      }, 500)();
    else setUsers([]);
  }

  function handleSelectSearchResult(friendId: string) {
    friendState.sendFriendRequest(session.data?.user.id || '', friendId, ChatConnectSocket);
  }

  if (!session.data?.user && session.status === 'unauthenticated') return <NotFoundModule />;

  return (
    <div className={cn('ChatModule', 'flex h-full flex-col', className)} data-testid="ChatModule">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-bold">Cuộc trò chuyện với bạn bè</p>
      </div>

      <div className="mt-6 flex h-full gap-x-4">
        <div className="hidden gap-y-6 rounded-lg bg-zinc-50 p-6 lg:flex lg:grow lg:basis-1/3 lg:flex-col">
          <div className="flex items-center justify-between">
            <p>Liên hệ</p>
            <p>{contactList?.privateConversations.length + contactList?.groupConversations.length}</p>
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
          <ChatCollapsible
            type="ai"
            coversations={contactList?.aiConversations}
            triggerText="Wander AI"
            onClick={handleClickFriendAvatar}
            onDelete={deleteConversationOnUserSide}
          />
          <ChatCollapsible
            type="private"
            coversations={contactList?.privateConversations}
            triggerText="Tin nhắn riêng tư"
            onClick={handleClickFriendAvatar}
            onDelete={deleteConversationOnUserSide}
          />
          <ChatCollapsible
            type="group"
            coversations={contactList?.groupConversations}
            triggerText="Tin nhắn nhóm"
            onClick={handleClickFriendAvatar}
            onEditName={handleUpdateContactName}
            onDelete={deleteConversationOnUserSide}
          />
        </div>

        <div className="flex grow basis-2/3 flex-col gap-y-6 rounded-lg bg-zinc-50 py-6">
          {conversation && conversation.type !== 'ai' ? (
            <MessageSection userId={session.data?.user?.id} conversation={conversation} />
          ) : (
            <></>
          )}
          {conversation && conversation.type === 'ai' ? (
            <AIMessageSection userId={session.data?.user?.id} conversation={conversation} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

ChatModule.displayName = 'ChatModule';

export default ChatModule;
