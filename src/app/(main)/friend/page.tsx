import React from 'react';
import type {Metadata} from 'next';

import FriendModule from '@/modules/friend/friend.module';

export default async function Voucher() {
  return <FriendModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Friend', description: 'Friend Description'};
}
