import React from 'react';
import type {Metadata} from 'next';

import ChatModule from '@/modules/chat/chat-module';

export default async function Voucher() {
  return <ChatModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Chat', description: 'Chat Description'};
}
