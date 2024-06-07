import React, {FC, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {ChatConnectSocket} from '@/common/sockets/chat-connect.socket';

import {Button, Icon, Input} from '@/core-ui';

import NotFoundModule from '@/modules/not-found/not-found';

import useChatState from '@/common/hooks/use-chat-state';

import Ellipse from '@/common/components/ellipse';

import {ENUM_SOCKET_EMIT} from '@/common/constants/socket.enum';

import {IComponentBaseProps, IConversation} from '@/common/interfaces';

import Message from './message';

export type TMessageSectionProps = IComponentBaseProps & {
  userId?: string;
  conversation: IConversation;
};

const MessageSection: FC<TMessageSectionProps> = ({userId, conversation}) => {
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatState = useChatState();

  const [message, setMessage] = useState('');

  useEffect(() => {
    chatState.setMessages(conversation.messages);
    ChatConnectSocket.emit(ENUM_SOCKET_EMIT.JOIN_CONVERSATION, {
      conversationId: conversation._id
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  function handleSendMessage() {
    chatState.sendMessage(session.data!.user.id!, conversation._id, message, ChatConnectSocket);
    setMessage('');
    inputRef.current?.focus();
  }

  if (!session.data?.user) return <NotFoundModule />;

  return (
    <>
      <div className="flex items-center gap-x-2 border-b border-slate-300 p-3">
        <div className="relative h-[44px] w-[44px]">
          <Image
            src={conversation?.imageUrl || '/images/avatar.png'}
            fill
            alt="avatar"
            className="absolute rounded-lg object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="flex items-center justify-between text-sm font-bold">{conversation?.name}</p>
          <div className="flex items-center justify-between text-xs text-[#8B8D97]">
            <div className="flex items-center gap-x-1">
              <p className="flex items-center gap-x-1">
                {conversation?.isOnline ? (
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
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="scrollbar flex h-[75vh] max-h-[75vh] flex-col overflow-auto px-6">
        <div className="scrollbar flex grow flex-col gap-1 overflow-auto">
          {(chatState.messages || []).map((message, index) => (
            <Message key={index} userId={userId || ''} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mb-1 mt-3 flex items-center gap-x-1">
          <Input
            ref={inputRef}
            className="w-full rounded-lg bg-gray-100 px-2 py-3 text-gray-500"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            className="h-full gap-x-2 bg-orange-500 text-[#FCFCFC] hover:bg-orange-700"
            onClick={handleSendMessage}
          >
            <Icon name="ico-send-right" />
            <p>Gửi</p>
          </Button>
        </div>
      </div>
    </>
  );
};

MessageSection.displayName = 'MessageSection';

export default MessageSection;
