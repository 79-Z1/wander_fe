import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Button, Icon, Input} from '@/core-ui';

import useChatState from '@/common/hooks/use-chat-state';

import Ellipse from '@/common/components/ellipse';

import {IComponentBaseProps, IConversation} from '@/common/interfaces';

import Message from './message';

export type TMessageSectionProps = IComponentBaseProps & {
  userId?: string;
  conversation: IConversation;
};

const MessageSection: FC<TMessageSectionProps> = ({userId, conversation}) => {
  const [message, setMessage] = useState('');

  const {messages, setMessages, sendMessage} = useChatState();

  useEffect(() => {
    setMessages(conversation.messages);
  }, []);

  function handleSendMessage() {
    sendMessage('661271c6600d68ed02a385be', message, GlobalConnectSocket);
  }

  return (
    <>
      <div className="flex h-full items-center gap-x-2 border-b border-slate-300 p-3">
        <div className="relative h-[44px] w-[44px]">
          <Image src={''} fill alt="avatar" className="absolute rounded-lg object-cover object-center" />
        </div>
        <div className="flex h-full flex-col gap-y-3">
          <p className="flex items-center justify-between text-sm font-bold">My name</p>
          <div className="flex items-center justify-between text-xs text-[#8B8D97]">
            <div className="flex items-center gap-x-1">
              <p className="flex items-center gap-x-1">
                <Ellipse className="bg-red-500" />
                <span>Online</span>
              </p>{' '}
              <span className="text-[#8B8D97]">10 phút trước</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-6 flex flex-col px-6">
        <div className="scrollbar flex flex-col overflow-y-auto">
          {messages.map((message, index) => (
            <Message key={index} userId={userId || ''} message={message} />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-x-1">
          <Input
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
