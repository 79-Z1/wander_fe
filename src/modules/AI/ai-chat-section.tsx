import React, {FC, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import ChatApi from '@/common/api/chat.api';

import {Button, Icon, Input} from '@/core-ui';

import NotFoundModule from '@/modules/not-found/not-found';

import AILoading from '@/common/components/ai-loading';
import Ellipse from '@/common/components/ellipse';

import {IComponentBaseProps, IConversation} from '@/common/interfaces';

import AIImage from '@/assets/images/ai-avatar.png';

import Message from '../chat/components/message';

export type TAIMessageSectionProps = IComponentBaseProps & {
  userId?: string;
  conversation: IConversation;
};

const AIMessageSection: FC<TAIMessageSectionProps> = ({userId, conversation}) => {
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversation.messages);
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!message) return;
    setLoading(true);
    const data = await ChatApi.askAI(conversation._id.toString(), message);
    setLoading(false);
    setMessages(data.metadata);
    scrollToBottom();
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSendMessage() {
    setMessage('');
    inputRef.current?.focus();
    setMessages([...messages, {sender: {_id: session?.data?.user?.id}, text: message, messageAt: new Date()}]);
    askAI();
  }

  if (!session.data?.user) return <NotFoundModule />;

  return (
    <>
      <div className="flex items-center gap-x-2 border-b border-slate-300 p-3">
        <div className="relative h-[44px] w-[44px]">
          <Image src={AIImage} fill alt="avatar" className="absolute rounded-lg object-cover object-center" />
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="flex items-center justify-between text-sm font-bold">{'Trợ lý ảo Wander'}</p>
          <div className="flex items-center justify-between text-xs text-[#8B8D97]">
            <div className="flex items-center gap-x-1">
              <p className="flex items-center gap-x-1">
                <Ellipse className="bg-green-500" />
                <span>Trực tuyến</span>
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="scrollbar flex h-[75vh] max-h-[75vh] flex-col overflow-auto px-6">
        <div className="scrollbar flex grow flex-col gap-1 overflow-auto">
          {(messages || []).map((message, index) => (
            <Message isAI={true} key={index} userId={userId || ''} message={message} />
          ))}
          {loading && <AILoading />}
          <div ref={messagesEndRef} />
        </div>
        <div className="mb-1 mt-3 flex items-center gap-x-1">
          <Input
            ref={inputRef}
            className="w-full rounded-lg bg-gray-100 px-2 py-3 text-gray-500"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
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

AIMessageSection.displayName = 'AIMessageSection';

export default AIMessageSection;
