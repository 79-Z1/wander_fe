'use client';
import React, {FC} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';

import {IComponentBaseProps} from '@/common/interfaces';

import bellNotificationSVG from '@/assets/icons/bell-notification.svg';

import Search from './search';

export type TTopbarProps = IComponentBaseProps;

const Topbar: FC<TTopbarProps> = ({className}) => {
  const session = useSession();
  const [text, settext] = React.useState('');
  const friendState = useFriendState();

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      friendState.sendFriendRequest(session.data?.user.id || '', text, GlobalConnectSocket);
    }
  }

  return (
    <div
      className={cn('topbar flex w-full items-center justify-end gap-4 bg-zinc-50 p-6', className)}
      data-testid="Topbar"
    >
      <Search value={text} onChange={e => settext(e.target.value)} onKeyUp={e => handleEnter(e)} />
      <Image src={bellNotificationSVG} alt="avatar" width={28} height={28} />
      <p className="text-sm font-bold">My name</p>
      <div className="relative h-[40px] w-[40px]">
        <Image
          src={session.data?.user?.image || ''}
          fill
          alt="avatar"
          className="absolute rounded-lg object-cover object-center"
        />
      </div>
    </div>
  );
};

Topbar.displayName = 'Topbar';

export default Topbar;
